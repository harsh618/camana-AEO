const functions = require('firebase-functions');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// API Keys from environment config
// API Keys from environment config
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Cloud Function 1: Enrich Website Data using Firecrawl
 * Extracts brand name, tagline, logo, and content from any URL
 */
exports.enrichWebsite = functions.https.onCall(async (data, context) => {
    const { url } = data;

    if (!url) {
        return { success: false, error: 'URL is required' };
    }

    try {
        console.log('Fetching website data for:', url);

        const response = await axios.post(
            'https://api.firecrawl.dev/v0/scrape',
            {
                url: url,
                formats: ['markdown', 'html']
            },
            {
                headers: {
                    'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        const { metadata, markdown } = response.data.data;

        return {
            success: true,
            brandName: metadata.title || metadata.ogSiteName || '',
            tagline: metadata.description || metadata.ogDescription || '',
            logo: metadata.ogImage || metadata.favicon || '',
            content: markdown || '',
            rawMetadata: metadata
        };
    } catch (error) {
        console.error('Firecrawl error:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.error || error.message
        };
    }
});

/**
 * Cloud Function 2: Detect Industry using Gemini AI
 * Analyzes website content to determine primary industry/category
 */
exports.detectIndustry = functions.https.onCall(async (data, context) => {
    const { websiteContent, brandName } = data;

    if (!websiteContent) {
        return { success: false, error: 'Website content is required' };
    }

    try {
        console.log('Detecting industry for:', brandName);

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `Based on this website content, identify the primary industry/business category in 2-3 words.

Brand: ${brandName}
Content: ${websiteContent.substring(0, 1000)}

Return ONLY the industry name (e.g., "Real Estate", "SaaS Software", "E-commerce Fashion", "Digital Marketing").
Be concise and specific.`;

        const result = await model.generateContent(prompt);
        const industry = result.response.text().trim().replace(/['"]/g, '');

        return {
            success: true,
            industry: industry
        };
    } catch (error) {
        console.error('Industry detection error:', error);
        return {
            success: false,
            error: error.message
        };
    }
});

/**
 * Cloud Function 3: Find Competitors using Gemini AI
 * Discovers intelligent competitors based on industry and region
 */
exports.findCompetitors = functions.https.onCall(async (data, context) => {
    const { industry, region, brandName, websiteContent } = data;

    if (!industry || !region) {
        return { success: false, error: 'Industry and region are required' };
    }

    try {
        console.log('Finding competitors for:', brandName, industry, region);

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `You are a market research expert. Based on the following information, identify 5 direct competitors.

Brand Name: ${brandName}
Industry: ${industry}
Target Region: ${region}
Website Content Summary: ${websiteContent ? websiteContent.substring(0, 800) : 'Not available'}

Return ONLY a valid JSON array with this EXACT format (no markdown, no extra text):
[
  {
    "domain": "competitor1.com",
    "name": "Competitor Name",
    "reason": "Brief reason why they are a competitor (max 15 words)"
  }
]

Requirements:
- Focus on competitors in the same industry
- Prioritize competitors serving the same geographic region
- Use real, existing companies
- Provide actual website domains (not examples)
- Keep reasons concise and specific`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();

        // Clean up the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Extract JSON array
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error('Failed to extract JSON from response');
        }

        const competitors = JSON.parse(jsonMatch[0]);

        return {
            success: true,
            competitors: competitors.slice(0, 5)
        };
    } catch (error) {
        console.error('Competitor finding error:', error);
        return {
            success: false,
            error: error.message,
            fallbackCompetitors: [] // Allow frontend to handle gracefully
        };
    }
});

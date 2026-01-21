import axios from 'axios';

// API Keys (Note: These are exposed in the browser - use Cloud Functions for production)
const FIRECRAWL_API_KEY = import.meta.env.VITE_FIRECRAWL_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Scrape website using Firecrawl and auto-fill ALL possible brand data
 * This function runs industry detection and competitor search in parallel for speed.
 * @param {string} url - Website URL to scrape
 * @returns {Promise<Object>} Full brand data including name, tagline, logo, content, industry, competitors
 */
export const enrichWebsiteData = async (url) => {
    try {
        // Step 1: Scrape website
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
        const brandName = metadata.title || metadata.ogSiteName || '';
        const tagline = metadata.description || metadata.ogDescription || '';
        const content = markdown || '';

        // Step 2: Run industry detection in parallel with basic return
        const industryPromise = detectIndustry(content, brandName);

        // Wait for industry first as competitors depend on it
        const industryResult = await industryPromise;
        const industry = industryResult.success ? industryResult.industry : '';

        // Step 3: If we have industry, fetch competitors in parallel
        let competitors = [];
        if (industry) {
            const compResult = await findCompetitors(industry, 'Global', brandName, content);
            if (compResult.success) {
                competitors = compResult.competitors.slice(0, 2); // Take top 2
            }
        }

        return {
            success: true,
            brandName: brandName,
            tagline: tagline,
            description: tagline, // Mirror for form compatibility
            logo: metadata.ogImage || metadata.favicon || '',
            content: content,
            industry: industry,
            competitors: competitors
        };
    } catch (error) {
        console.error('Website enrichment error:', error);
        return {
            success: false,
            error: error.response?.data?.error || error.message
        };
    }
};

/**
 * Detect industry/category from website content using Gemini AI
 * @param {string} websiteContent - Markdown content from website
 * @param {string} brandName - Brand name for context
 * @returns {Promise<Object>} Detected industry
 */
export const detectIndustry = async (websiteContent, brandName) => {
    try {
        const prompt = `Based on this website content, identify the primary industry/business category in 2-3 words.

Brand: ${brandName}
Content: ${websiteContent.substring(0, 1000)}

Return ONLY the industry name (e.g., "Real Estate", "SaaS Software", "E-commerce Fashion", "Digital Marketing").
Be concise and specific.`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 20000
            }
        );

        const industry = response.data.candidates[0].content.parts[0].text.trim().replace(/['"]/g, '');

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
};

/**
 * Find intelligent competitors using Gemini AI
 * @param {string} industry - Primary industry/category
 * @param {string} region - Target geographic region
 * @param {string} brandName - Brand name for context
 * @param {string} websiteContent - Website content for context
 * @returns {Promise<Object>} Array of competitor suggestions
 */
export const findCompetitors = async (industry, region, brandName, websiteContent) => {
    try {
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

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 30000
            }
        );

        let text = response.data.candidates[0].content.parts[0].text.trim();

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
            competitors: []
        };
    }
};

/**
 * Generate related topic clusters based on industry focus
 * @param {string} industry - Main industry focus
 * @returns {Promise<Object>} Array of topic strings
 */
export const generateTopics = async (industry) => {
    try {
        const prompt = `Based on the industry focus "${industry}", generate 6-8 related high-value SEO topics or keyword clusters. 
        Return ONLY a comma-separated list of topics. No numbering, no extra text.
        Example: "Luxury Hotels, Property Investment, Real Estate Trends, Urban Development"`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 20000
            }
        );

        const topics = response.data.candidates[0].content.parts[0].text.trim().split(',').map(t => t.trim());

        return {
            success: true,
            topics: topics
        };
    } catch (error) {
        console.error('Topic generation error:', error);
        return {
            success: false,
            error: error.message,
            topics: []
        };
    }
};

/**
 * Suggest target audience persona and pain points based on brand profile
 * @param {string} industry - Main industry
 * @param {string} content - Website content
 * @returns {Promise<Object>} Persona and pain point
 */
export const suggestAudience = async (industry, content) => {
    try {
        const prompt = `Based on the industry "${industry}" and this website content: "${content?.substring(0, 1000)}", 
        identify the single most likely "Target Persona" (e.g., "First-time Homebuyers") and their "Core Pain Point" (e.g., "Complexity of mortgage process").
        
        Return ONLY a JSON object: {"persona": "...", "painPoint": "..."}`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            }
        );

        let text = response.data.candidates[0].content.parts[0].text.trim();
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return { success: true, ...JSON.parse(text) };
    } catch (error) {
        console.error('Audience suggestion error:', error);
        return { success: false, persona: '', painPoint: '' };
    }
};

/**
 * Suggest a competitive moat / USP based on brand profile
 * @param {string} brandName - Brand name
 * @param {string} description - Brand description
 * @param {string} industry - Industry
 * @returns {Promise<Object>} USP suggestion
 */
export const suggestMoat = async (brandName, description, industry) => {
    try {
        const prompt = `Based on the brand "${brandName}" (${description}) in the "${industry}" industry, 
        suggest a concise 1-sentence "Unique Selling Proposition" or "Competitive Moat".
        
        Return ONLY the sentence.`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            }
        );

        return { success: true, moat: response.data.candidates[0].content.parts[0].text.trim() };
    } catch (error) {
        console.error('Moat suggestion error:', error);
        return { success: false, moat: '' };
    }
};

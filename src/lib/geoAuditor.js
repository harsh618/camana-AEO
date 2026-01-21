import axios from 'axios';

// API Keys (Hardcoded for now as per previous pattern, should use env vars in prod)
const FIRECRAWL_API_KEY = import.meta.env.VITE_FIRECRAWL_API_KEY;
const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;

/**
 * Scrape website content using Firecrawl
 * @param {string} url 
 * @returns {Promise<Object>} Markdown content and metadata
 */
export const scrapeWithFirecrawl = async (url) => {
    try {
        console.log(`🔥 Scraping ${url} with Firecrawl...`);
        const response = await axios.post(
            'https://api.firecrawl.dev/v1/scrape',
            {
                url: url,
                formats: ['markdown'],
                onlyMainContent: true
            },
            {
                headers: {
                    'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && response.data.success) {
            return {
                success: true,
                markdown: response.data.data.markdown,
                metadata: response.data.data.metadata
            };
        } else {
            return { success: false, error: "No data returned from Firecrawl" };
        }
    } catch (error) {
        console.error("Firecrawl Scrape Error:", error);
        return { success: false, error: error.message || "Scraping failed" };
    }
};

/**
 * Analyze content for GEO Impact using Perplexity Sonar Pro
 * @param {string} markdownContent 
 * @param {string} url 
 * @returns {Promise<Object>} Analysis results
 */
export const analyzeGeoImpact = async (markdownContent, url) => {
    try {
        console.log(`🧠 Analyzing content with Perplexity...`);

        const systemPrompt = "You are a GEO Expert. Analyze website content for AI Visibility. Output strictly valid JSON.";

        // Truncate content specifically for context window if needed, though Sonar Pro has large context
        const truncatedContent = markdownContent ? markdownContent.substring(0, 15000) : "";

        const userMessage = `AUDIT THIS CONTENT FOR URL: ${url}\n\nCONTENT:\n${truncatedContent}`;

        const schema = {
            type: "object",
            properties: {
                geo_score: { type: "integer" },
                summary: { type: "string" },
                markdown_structure: {
                    type: "object",
                    properties: {
                        score: { type: "integer" },
                        observation: { type: "string" }
                    },
                    required: ["score", "observation"]
                },
                fact_density: {
                    type: "object",
                    properties: {
                        score: { type: "integer" },
                        observation: { type: "string" }
                    },
                    required: ["score", "observation"]
                },
                direct_answer_capability: {
                    type: "object",
                    properties: {
                        score: { type: "integer" },
                        observation: { type: "string" }
                    },
                    required: ["score", "observation"]
                },
                critical_fix: { type: "string" }
            },
            required: ["geo_score", "summary", "markdown_structure", "fact_density", "direct_answer_capability", "critical_fix"]
        };

        const response = await axios.post(
            'https://api.perplexity.ai/chat/completions',
            {
                model: "sonar-pro",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage }
                ],
                // Note: Perplexity API might not support 'response_format' schema validation fully like OpenAI yet in all SDKs, 
                // but we will instruct it to return JSON and parse carefully.
                // If the API supports structured outputs directly, we use that.
                // For safety against non-JSON text, we'll try to enforce it via prompt and parsing.
            },
            {
                headers: {
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        let content = response.data.choices[0].message.content;

        // Clean markdown code blocks if present
        if (content.includes("```json")) {
            content = content.split("```json")[1].split("```")[0].trim();
        } else if (content.includes("```")) {
            content = content.split("```")[1].split("```")[0].trim();
        }

        const jsonResult = JSON.parse(content);
        return { success: true, data: jsonResult };

    } catch (error) {
        console.error("Perplexity Analysis Error:", error);
        return { success: false, error: error.message || "Analysis failed" };
    }
};

/**
 * Orchestrator: Run full audit
 */
export const runGeoAudit = async (url) => {
    // 1. Scrape
    const scrapeResult = await scrapeWithFirecrawl(url);
    if (!scrapeResult.success) {
        return { success: false, error: scrapeResult.error };
    }

    // 2. Analyze
    const analysisResult = await analyzeGeoImpact(scrapeResult.markdown, url);
    if (!analysisResult.success) {
        return { success: false, error: analysisResult.error };
    }

    return {
        success: true,
        scrapedData: scrapeResult,
        analysis: analysisResult.data
    };
};

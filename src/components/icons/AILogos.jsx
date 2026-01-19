import React from 'react';

// Using uploaded images as requested
export const ChatGPTLogo = ({ className }) => (
  <img src="/logos/chatgpt.jpg" alt="ChatGPT" className={`${className} object-contain rounded-full`} />
);

export const GeminiLogo = ({ className }) => (
  <img src="/logos/gemini.jpg" alt="Gemini" className={`${className} object-contain rounded-full`} />
);

export const PerplexityLogo = ({ className }) => (
  <img src="/logos/perplexity.jpg" alt="Perplexity" className={`${className} object-contain rounded-full`} />
);

export const ClaudeLogo = ({ className }) => (
  <img src="/logos/claude.jpg" alt="Claude" className={`${className} object-contain rounded-full`} />
);

export const CopilotLogo = ({ className }) => (
  <img src="/logos/copilot.jpg" alt="Copilot" className={`${className} object-contain rounded-full`} />
);

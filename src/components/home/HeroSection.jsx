import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const brands = [
  { name: "ChatGPT", logo: "/logos/chatgpt-icon.png" },
  { name: "Claude", logo: "/logos/claude-icon.png" },
  { name: "Perplexity", logo: "/logos/perplexity-text.png" },
  { name: "Gemini", logo: "/logos/gemini-icon.png" },
];

const BRAND_INTERVAL = 1500; // 3 seconds per direction

export default function HeroSection() {
  const [currentBrand, setCurrentBrand] = useState(0);
  const [direction, setDirection] = useState("right"); // 'right' or 'left'
  const [isAnimating, setIsAnimating] = useState(true);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset animation
    setIsAnimating(false);
    const resetTimeout = setTimeout(() => setIsAnimating(true), 50);

    const brandInterval = setInterval(() => {
      // Change logo and flip direction when animation ends
      setCurrentBrand((prev) => (prev + 1) % brands.length);
      setDirection((prev) => (prev === "right" ? "left" : "right"));
    }, BRAND_INTERVAL);

    return () => {
      clearInterval(brandInterval);
      clearTimeout(resetTimeout);
    };
  }, [currentBrand]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup", { state: { websiteUrl, email } });
  };

  // Calculate positions based on direction
  const getProgressWidth = () => {
    if (!isAnimating) return direction === "right" ? "0%" : "100%";
    return direction === "right" ? "100%" : "0%";
  };

  const getDotPosition = () => {
    if (!isAnimating)
      return direction === "right" ? "-7px" : "calc(100% - 7px)";
    return direction === "right" ? "calc(100% - 7px)" : "-7px";
  };

  return (
    <section className="relative min-h-fit bg-black overflow-hidden pt-[76px]">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#ef2b15]/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-[#ef2b15]/5 rounded-full blur-[100px] lg:blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12">
        <div className="flex flex-col items-center text-center">
          {/* Badge - Updated with glowing red dot */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#ef2b15] bg-[#fd2d15]/10 mb-4 sm:mb-5 lg:mb-6"
          >
            <span
              className="w-[7px] h-[7px] sm:w-[9px] sm:h-[9px] rounded-full bg-[#FD2D15]"
              style={{
                boxShadow:
                  "0 0 8px 2px rgba(253, 45, 21, 0.6), 0 0 4px 1px rgba(253, 45, 21, 0.8)",
                filter: "blur(0.5px)",
              }}
            />
            <span className="text-[13px] sm:text-[15px] lg:text-[18px] font-semibold text-[#ef2b15]/80">
              AI search optimisation platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[32px] sm:text-[42px] md:text-[52px] lg:text-[64px] font-bold text-[#ededed] leading-tight tracking-[0.5px] sm:tracking-[1px] lg:tracking-[1.92px] mb-3 sm:mb-4 px-2"
          >
            Get your brand <br className="hidden sm:block" />
            recommended by
          </motion.h1>

          {/* Brand Logo Carousel - Made bigger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-[60px] sm:h-[80px] lg:h-[100px] mb-4 sm:mb-5 lg:mb-6 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentBrand}
                src={brands[currentBrand].logo}
                alt={brands[currentBrand].name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-[50px] sm:h-[70px] lg:h-[100px] object-contain"
              />
            </AnimatePresence>
          </motion.div>

          {/* Animated Progress Bar - Static glowing line with moving pointer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative w-[200px] sm:w-[260px] lg:w-[320px] h-[4px] sm:h-[5px] lg:h-[6px] rounded-full mb-6 sm:mb-7 lg:mb-8"
          >
            {/* Static glowing line - always visible */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(253, 45, 21, 0.8) 0%, rgba(253, 45, 21, 0.5) 50%, rgba(253, 45, 21, 0.8) 100%)",
                boxShadow:
                  "0 0 10px 2px rgba(253, 45, 21, 0.4), 0 0 20px 4px rgba(253, 45, 21, 0.2)",
              }}
            />
            {/* Moving glowing dot/pointer */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px] rounded-full z-10"
              style={{
                left: getDotPosition(),
                background:
                  "radial-gradient(circle, #FF5544 0%, #FD2D15 50%, #D92010 100%)",
                boxShadow:
                  "0 0 12px 4px rgba(253, 45, 21, 0.8), 0 0 24px 8px rgba(253, 45, 21, 0.4)",
                transition: isAnimating
                  ? `left ${BRAND_INTERVAL}ms linear`
                  : "none",
              }}
            />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[#ededed]/90 max-w-[400px] sm:max-w-[500px] lg:max-w-[581px] mb-6 sm:mb-8 lg:mb-10 px-2"
          >
            The all-in-one platform to track, optimize, and control your brand's
            presence in the age of AI search.
          </motion.p>

          {/* Form Card - Wrapped in bordered container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full max-w-[800px] p-4 sm:p-6 lg:p-8 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] border border-[#ededed]/15 bg-[#0a0a0a]/80 backdrop-blur-md"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[14px] sm:gap-[18px] lg:gap-[20px]"
            >
              {/* Input Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Website URL Input */}
                <div className="flex-1 flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full border border-[#ededed]/15 bg-[#1a1a1a]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 22 22"
                    fill="none"
                    className="flex-shrink-0 sm:w-5 sm:h-5"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="9.5"
                      stroke="#8a8a8aff"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11 1.5C11 1.5 15 6 15 11C15 16 11 20.5 11 20.5"
                      stroke="#8a8a8aff"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11 1.5C11 1.5 7 6 7 11C7 16 11 20.5 11 20.5"
                      stroke="#8a8a8aff"
                      strokeWidth="1.5"
                    />
                    <path d="M2 11H20" stroke="#8a8a8aff" strokeWidth="1.5" />
                  </svg>
                  <input
                    type="url"
                    placeholder="Enter Your Website URL"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="flex-1 bg-transparent text-[13px] sm:text-[14px] lg:text-[15px] font-medium text-[#ededed] placeholder:text-[#ededed]/50 outline-none min-w-0"
                  />
                </div>

                {/* Email Input */}
                <div className="flex-1 flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full border border-[#ededed]/15 bg-[#1a1a1a]">
                  <svg
                    width="16"
                    height="13"
                    viewBox="0 0 20 16"
                    fill="none"
                    className="flex-shrink-0 sm:w-[18px] sm:h-[14px]"
                  >
                    <rect
                      x="0.75"
                      y="0.75"
                      width="18.5"
                      height="14.5"
                      rx="2.25"
                      stroke="#8a8a8aff"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M1.5 2L10 9L18.5 2"
                      stroke="#8a8a8aff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="Your Work Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent text-[13px] sm:text-[14px] lg:text-[15px] font-medium text-[#ededed] placeholder:text-[#ededed]/50 outline-none min-w-0"
                  />
                </div>
              </div>

              {/* CTA Button - Default: matches reference style | Hover: grey */}
              <button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full px-6 sm:px-8 py-3.5 sm:py-4 rounded-[30px] flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 cursor-pointer"
                style={{
                  background: isHovered
                    ? "rgba(80, 80, 80, 0.75)"
                    : "rgba(253, 45, 21, 0.05)",
                  border: isHovered
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(253, 45, 21, 0.15)",
                  boxShadow: isHovered
                    ? "none"
                    : "inset 0px 4px 8px rgba(237, 237, 237, 0.32)",
                }}
              >
                <span
                  className="text-[15px] sm:text-[18px] lg:text-[22px] font-bold transition-colors duration-300"
                  style={{
                    color: isHovered ? "#b0b0b0" : "rgba(253, 45, 21, 0.7)",
                  }}
                >
                  Get Your Free AI Visibility Score
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-all duration-300 sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px]"
                  style={{
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke={isHovered ? "#b0b0b0" : "rgba(253, 45, 21, 0.7)"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            {/* Trust Indicators - No border, more spacing */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-10 mt-5 sm:mt-6 lg:mt-8">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="sm:w-[18px] sm:h-[18px]"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="8.5"
                    stroke="#FD2D15"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10 5V10L13 13"
                    stroke="#FD2D15"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-normal text-[#ededed]/70">
                  Setup in 5 minutes
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="sm:w-[18px] sm:h-[18px]"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="8.5"
                    stroke="#FD2D15"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 10L9 13L14 7"
                    stroke="#FD2D15"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-normal text-[#ededed]/70">
                  No technical skills needed
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="sm:w-[18px] sm:h-[18px]"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="8.5"
                    stroke="#FD2D15"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 7L13 13M13 7L7 13"
                    stroke="#FD2D15"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-normal text-[#ededed]/70">
                  Cancel anytime
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

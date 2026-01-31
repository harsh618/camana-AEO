import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const logo = [{ name: "pricing", logo: "../public/logos/pricing.png" }];

const plans = [
  {
    name: "Starter",
    subtitle: "Serious Startups & Niche Brands",
    price: 99,
    features: [
      "150 Custom Prompts",
      "3 Brands + 5 Competitors",
      "Weekly Visibility Reports",
      "Basic GEO Intelligence: Track ranking in 1 Country",
      "Sentiment Analysis (Positive/Neutral/Negative)",
      "4 Platforms: ChatGPT, Gemini, Perplexity, Claude",
      "AI Content Generation",
      "Email Support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    subtitle: "High-Growth Teams & Scale-ups",
    price: 199,
    features: [
      "600 Custom Prompts",
      "10 Brands + 15 Competitors",
      "Weekly Visibility Updates",
      "Advanced GEO Intelligence: Track ranking in 5 Regions",
      "Technical AEO: Schema & llms.txt generation",
      "Citation Gap Analysis: Direct competitor comparison",
      "Basic AEO Audits: Automated content recommendations",
      "AI Content Generation",
      "Priority Support (Email)",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    subtitle: "Agencies & Dominant Brands",
    price: 299,
    features: [
      "1,500 Custom Prompts",
      "Unlimited Brands + 50 Competitors",
      "Real-Time Monitoring Capability",
      "Global GEO Intelligence: Unlimited regional tracking",
      "Technical AEO: Schema & llms.txt generation",
      "White-Label Reporting: PDF exports for clients",
      "AI Content Generation",
      "Dedicated Account Manager",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (basePrice) => {
    if (isAnnual) {
      return Math.round(basePrice * 0.7);
    }
    return basePrice;
  };

  // Reusable card so mobile carousel & desktop grid share the exact same markup
  const PricingCard = ({ plan, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4 + index * 0.1 }}
      className="rounded-[20px] sm:rounded-[30px] p-5 sm:p-6 md:p-8 relative bg-[#0d0d0d] h-full"
      style={{
        boxShadow: plan.highlighted
          ? "inset 0px 4px 7px rgba(237, 237, 237, 0.15), 0 0 40px rgba(253, 45, 21, 0.2), 0 0 80px rgba(253, 45, 21, 0.1)"
          : "inset 0px 4px 7px rgba(237, 237, 237, 0.15)",
        border: plan.highlighted
          ? "1px solid rgba(253, 45, 21, 0.35)"
          : "1px solid transparent",
      }}
    >
      {/* Plan Header */}
      <div className="text-center mb-6">
        <h3 className="text-[18px] sm:text-[20px] font-bold text-[#ededed] mb-1">
          {plan.name}
        </h3>
        <p className="text-[11px] sm:text-[12px] font-medium text-[#ededed] mb-4">
          {plan.subtitle}
        </p>
        <div className="flex items-baseline justify-center">
          <span className="text-[20px] font-bold text-[#ededed]">
            ${getPrice(plan.price)}
          </span>
          <span className="text-[12px] font-medium text-[#ededed]">
            /month
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="mt-0.5 flex-shrink-0"
            >
              <path
                d="M2 6L5 9L10 3"
                stroke={plan.highlighted ? "#EF2B15" : "#888888"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[12px] font-medium text-[#ededed]">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => navigate("/signup")}
        className={`w-full py-3 px-4 rounded-[30px] border text-[15px] sm:text-[16px] font-medium transition-all ${
          plan.highlighted
            ? "border-[#ededed] text-[#ededed] hover:bg-[#ededed]/10"
            : "border-[#ededed] text-[#ededed] hover:bg-[#ededed]/10"
        }`}
      >
        Start 7 Days Free Trial
      </button>
    </motion.div>
  );

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-16 bg-black relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[120px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[30px] border border-[#ef2b15] bg-[#fd2d15]/10">
            <motion.img
              src={logo[0].logo}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-[10px] sm:h-[15px] lg:h-[20px] object-contain"
            />
            <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-[#ef2b15]/80">
              Pricing
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-center mb-4"
        >
          <h2 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-bold leading-tight">
            <span className="text-white">Plans That Scale With</span>
            <br className="hidden sm:block" />
            <span className="text-[#ef2b15]"> Your Ambition</span>
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[#ededed]/90 text-center max-w-[621px] mx-auto mb-6 sm:mb-8 px-2 sm:px-0 leading-[1.5]"
        >
          Choose the perfect plan to dominate AI search results and grow your
          brand visibility
        </motion.p>

        {/* Monthly/Annual Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <span
            className={`text-[16px] sm:text-[18px] lg:text-[20px] font-bold ${!isAnnual ? "text-white" : "text-[#a6a6a6]"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-[44px] h-[19px] rounded-full bg-[#ededed]/20 transition-colors"
          >
            <div
              className={`absolute top-[2px] left-[2px] w-[15px] h-[15px] bg-[#ededed] rounded-full shadow-md transition-transform ${isAnnual ? "translate-x-[25px]" : "translate-x-0"}`}
            />
          </button>
          <span
            className={`text-[16px] sm:text-[18px] lg:text-[20px] font-semibold ${isAnnual ? "text-white" : "text-[#a6a6a6]"}`}
          >
            Annual
          </span>
        </motion.div>

        {/* ============================================================
            MOBILE ONLY (below sm): Horizontal swipe carousel.
            - User swipes/scrolls left↔right manually, no auto-scroll.
            - snap-x + snap-start gives smooth card-by-card snapping.
            - scroll-pl-4 scroll-pr-4 adds scroll-padding so snap
              points are inset 16px from both edges — this CENTERS
              the active card with equal space on left and right.
            - Card width = calc(100% - 32px) so 16px peeks on each
              side when centered (matching the scroll-padding).
            - -mx-4 + px-4 lets cards bleed edge-to-edge while
              keeping text aligned with the rest of the page.
            - scrollbarWidth: none hides the scrollbar visually.
            ============================================================ */}
        <div className="sm:hidden mb-8 -mx-4">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 scroll-pl-4 scroll-pr-4"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {plans.map((plan, index) => (
              <div
                key={index}
                className="snap-start snap-always flex-shrink-0"
                style={{ width: "calc(100% - 32px)" }}
              >
                <PricingCard plan={plan} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            COMMENTED OUT — Previous mobile vertical stacking layout.
            Cards used to stack in a single column on mobile via the
            base grid (no cols class at < sm). This has been replaced
            by the horizontal swipe carousel above for mobile.

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`rounded-[20px] sm:rounded-[30px] p-5 sm:p-6 md:p-8 relative ${
                    plan.highlighted ? "bg-[#0d0d0d]" : "bg-[#0d0d0d]"
                  }`}
                  style={{
                    boxShadow: plan.highlighted
                      ? "inset 0px 4px 7px rgba(237, 237, 237, 0.15), 0 0 40px rgba(253, 45, 21, 0.2), 0 0 80px rgba(253, 45, 21, 0.1)"
                      : "inset 0px 4px 7px rgba(237, 237, 237, 0.15)",
                    border: plan.highlighted
                      ? "1px solid rgba(253, 45, 21, 0.35)"
                      : "1px solid transparent",
                  }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[#ededed] mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] font-medium text-[#ededed] mb-4">
                      {plan.subtitle}
                    </p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-[20px] font-bold text-[#ededed]">
                        ${getPrice(plan.price)}
                      </span>
                      <span className="text-[12px] font-medium text-[#ededed]">
                        /month
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 flex-shrink-0">
                          <path d="M2 6L5 9L10 3" stroke={plan.highlighted ? "#EF2B15" : "#888888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[12px] font-medium text-[#ededed]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate("/signup")}
                    className={`w-full py-3 px-4 rounded-[30px] border text-[15px] sm:text-[16px] font-medium transition-all border-[#ededed] text-[#ededed] hover:bg-[#ededed]/10`}
                  >
                    Start 7 Days Free Trial
                  </button>
                </motion.div>
              ))}
            </div>
            ============================================================ */}

        {/* TABLET + DESKTOP (sm and above): Normal grid — unchanged */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>

        {/* Enterprise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="rounded-[20px] sm:rounded-[30px] border border-[#ededed]/15 bg-[#b0b0b0]/5 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-[#ededed] mb-2">
              Enterprise & Custom Solutions
            </h3>
            <p className="text-[13px] sm:text-[14px] font-normal text-[#ededed] max-w-[667px] mx-auto sm:mx-0">
              Need unlimited prompts, API access, custom integrations, or
              dedicated support? Let's build a plan tailored to your
              organization's needs.
            </p>
          </div>
          <button
            onClick={() =>
              (window.location.href =
                "mailto:sales@searchlyst.com?subject=Enterprise Inquiry")
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[30px] border border-[#939393] text-[15px] sm:text-[16px] font-medium text-[#ededed] hover:bg-[#ededed]/5 transition-all whitespace-nowrap"
          >
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
              <rect
                x="0.5"
                y="0.5"
                width="14"
                height="11"
                rx="1.5"
                stroke="#ededed"
              />
              <path
                d="M1 1L7.5 7L14 1"
                stroke="#ededed"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Divider line */}
      <div className="mt-16 flex justify-center">
        <div className="w-[90%] sm:w-[681px] max-w-[681px] h-[2px] bg-[#2b2b2b] blur-[4px]" />
      </div>
    </section>
  );
}
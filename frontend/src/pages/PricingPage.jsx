import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Check, X, Zap, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pricingService } from "../services/pricingService";

// Fallback plans if database is empty
const fallbackPlans = [
  {
    name: "Free",
    price: "0",
    period: "",
    currency: "",
    badge: null,
    desc: "Perfect for getting started",
    features: [
      "ATS Resume Score",
      "Basic AI Feedback",
      "1 Session Booking",
      "Community Access",
    ],
    locked: [
      "AI Career Roadmap",
      "Skill Gap Analysis",
      "Mock Interviews",
      "Priority Support",
    ],
    cta: "Get Started",
    popular: false,
    color: "var(--muted)",
  },
  {
    name: "Pro",
    price: "999",
    period: "/mo",
    currency: "₹",
    badge: "MOST POPULAR",
    desc: "For serious job seekers",
    features: [
      "Everything in Free",
      "AI Career Roadmap",
      "Skill Gap Analysis",
      "5 Session Bookings",
      "Mock Interview Practice",
      "Priority Email Support",
    ],
    locked: [],
    cta: "Start Pro",
    popular: true,
    color: "var(--blue-light)",
  },
  {
    name: "Premium",
    price: "2499",
    period: "/mo",
    currency: "₹",
    badge: null,
    desc: "Complete career transformation",
    features: [
      "Everything in Pro",
      "Unlimited Sessions",
      "1-on-1 Mentorship",
      "Resume Rewrite",
      "LinkedIn Optimization",
      "Guaranteed Interviews",
    ],
    locked: [],
    cta: "Go Premium",
    popular: false,
    color: "var(--cyan)",
  },
];

const PricingPage = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await pricingService.getPlans();
        if (data.success && data.plans.length > 0) {
          // Map database plans to UI colors
          const uiColors = [
            "var(--muted)",
            "var(--blue-light)",
            "var(--cyan)",
            "var(--success)",
          ];

          const formattedPlans = data.plans.map((p, i) => ({
            name: p.name,
            price: p.price,
            period: p.duration ? `/${p.duration}` : "",
            currency:
              p.currency === "INR" ? "₹" : p.currency === "BDT" ? "৳" : "$",
            badge: p.isPopular ? "MOST POPULAR" : null,
            desc: "Unlock premium career guidance", // Fallback description
            features: p.features || [],
            locked: [], // DB doesn't store locked features currently
            cta: p.isPopular ? "Start Pro" : "Get Started",
            popular: p.isPopular,
            color: uiColors[i % uiColors.length],
          }));
          setPlans(formattedPlans);
        } else {
          setPlans(fallbackPlans);
        }
      } catch (error) {
        console.error("Failed to fetch pricing plans:", error);
        setPlans(fallbackPlans); // Use static plans on API failure
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div
      style={{
        background: "var(--navy)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
      className="py-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-4 inline-flex">
            <Zap className="w-3 h-3" /> Simple Pricing
          </span>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4"
          >
            Invest in your <span className="grad-text">career growth</span>
          </h1>
          <p
            style={{ color: "var(--muted)" }}
            className="text-lg max-w-xl mx-auto"
          >
            Transparent pricing. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[var(--blue-light)] animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative glass rounded-2xl overflow-hidden flex flex-col ${plan.popular ? "ring-2 ring-[var(--blue)]" : ""}`}
                style={
                  plan.popular
                    ? { boxShadow: "0 0 40px rgba(43,94,232,0.2)" }
                    : {}
                }
              >
                {plan.badge && (
                  <div
                    className="py-1.5 text-center text-xs font-bold tracking-wider"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--blue), var(--blue-light))",
                      color: "white",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="p-7 flex-1 flex flex-col">
                  <div className="mb-6">
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{
                        color: plan.color,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {plan.name}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span
                        style={{ fontFamily: "var(--font-display)" }}
                        className="text-4xl font-bold text-white"
                      >
                        {plan.currency}
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span
                          style={{ color: "var(--muted)" }}
                          className="text-sm"
                        >
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p
                      style={{ color: "var(--muted)" }}
                      className="text-sm mt-1"
                    >
                      {plan.desc}
                    </p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm"
                        style={{ color: "rgba(248,250,255,0.85)" }}
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${plan.color}20`,
                            border: `1px solid ${plan.color}50`,
                          }}
                        >
                          <Check
                            className="w-2.5 h-2.5"
                            style={{ color: plan.color }}
                          />
                        </div>
                        {f}
                      </li>
                    ))}
                    {plan.locked &&
                      plan.locked.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2.5 text-sm opacity-30"
                        >
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            <X
                              className="w-2.5 h-2.5"
                              style={{ color: "var(--muted)" }}
                            />
                          </div>
                          {f}
                        </li>
                      ))}
                  </ul>

                  <button
                    onClick={() => navigate("/signup")}
                    className={
                      plan.popular
                        ? "btn-primary w-full justify-center py-3"
                        : "btn-ghost w-full justify-center py-3"
                    }
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-sm"
          style={{ color: "var(--muted)" }}
        >
          Need a custom plan for your institution?{" "}
          <a
            href="#contact"
            style={{ color: "var(--blue-light)" }}
            className="font-semibold hover:text-[var(--cyan)] transition-colors"
          >
            Contact us
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default PricingPage;

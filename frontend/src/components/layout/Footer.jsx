import React, { useState } from "react";
import { Facebook, Instagram, Mail, Sparkles, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  const links = {
    Platform: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Cover Letter", href: "/cover-letter" },
      { label: "Pricing", href: "/pricing" },
    ],
    Company: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Success Stories", href: "#success" },
      { label: "Contact", href: "#contact" },
    ],
  };

  // ✅ FIX: Defined social icons as objects with component references
  // instead of using destructuring rename (icon: Icon) which ESLint flags
  const socialLinks = [
    {
      href: "https://www.facebook.com/share/1GoGPjVLSx/",
      Icon: Facebook,
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/xplosure2025",
      Icon: Instagram,
      label: "Instagram",
    },
    { href: "mailto:xplosure.carrier@gmail.com", Icon: Mail, label: "Email" },
  ];

  return (
    <footer
      style={{
        background: "var(--navy-2)",
        borderTop: "1px solid var(--border)",
      }}
      className="pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--blue)] to-[var(--cyan)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span
                style={{ fontFamily: "var(--font-display)" }}
                className="text-lg font-bold text-white"
              >
                Xplosure
              </span>
            </div>
            <p
              style={{ color: "var(--muted)" }}
              className="text-sm leading-relaxed mb-5"
            >
              Empowering students and professionals to make confident career
              decisions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass glass-hover rounded-lg flex items-center justify-center transition-all"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--white)",
                }}
                className="text-sm font-semibold mb-4"
              >
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      style={{ color: "var(--muted)" }}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--white)",
              }}
              className="text-sm font-semibold mb-4"
            >
              Stay Updated
            </h4>
            <p style={{ color: "var(--muted)" }} className="text-sm mb-4">
              Career tips and platform updates.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-dark text-sm flex-1 min-w-0"
                required
              />
              <button
                type="submit"
                className="btn-primary py-2.5 px-3 flex-shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div
          style={{ borderTop: "1px solid var(--border)" }}
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
        >
          <p style={{ color: "var(--muted)" }} className="text-xs">
            © {new Date().getFullYear()} Xplosure. All rights reserved.
          </p>
          <p style={{ color: "var(--muted)" }} className="text-xs">
            Mon – Sun · 10:00 AM – 9:00 PM IST · +91 7980247918
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

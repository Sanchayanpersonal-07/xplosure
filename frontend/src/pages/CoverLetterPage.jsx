import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FileText, Copy, Download, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/common/LoadingSpinner";

const CoverLetterPage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ jobTitle: "", companyName: "" });
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/cover-letter/generate", form);
      setLetter(res.data.coverLetter);
      toast.success("Cover letter generated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      toast.success("Copied!");
    } catch {
      toast.error("Copy failed — please select manually");
    }
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(new Blob([letter], { type: "text/plain" }));
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `CoverLetter_${form.companyName.replace(/\s+/g, "_")}.txt`,
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!user?.resumePath) {
    return (
      <div
        style={{
          background: "var(--navy)",
          minHeight: "100vh",
          paddingTop: "80px",
        }}
        className="flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-12 text-center max-w-md w-full"
        >
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
            style={{
              background: "rgba(43,94,232,0.15)",
              border: "1px solid rgba(43,94,232,0.3)",
            }}
          >
            <FileText
              className="w-8 h-8"
              style={{ color: "var(--blue-light)" }}
            />
          </div>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-xl font-bold text-white mb-2"
          >
            Resume Required
          </h2>
          <p style={{ color: "var(--muted)" }} className="text-sm mb-6">
            Upload your resume first to generate a personalized cover letter.
          </p>
          <Link to="/dashboard" className="btn-primary inline-flex">
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--navy)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
      className="py-12"
    >
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="section-label mb-3 inline-flex">
            <Sparkles className="w-3 h-3" /> AI Generator
          </span>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-bold text-white mt-3"
          >
            Cover Letter Generator
          </h1>
          <p style={{ color: "var(--muted)" }} className="mt-1 text-sm">
            Personalized using your resume skills and career profile
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-7 mb-6"
        >
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  key: "jobTitle",
                  label: "Job Title",
                  placeholder: "e.g., Frontend Developer",
                },
                {
                  key: "companyName",
                  label: "Company Name",
                  placeholder: "e.g., Google",
                },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label
                    style={{
                      color: "rgba(248,250,255,0.7)",
                      fontFamily: "var(--font-display)",
                    }}
                    className="block text-sm font-medium mb-1.5"
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    value={form[key]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="input-dark"
                    required
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="text-white" />{" "}
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Cover Letter
                </>
              )}
            </button>
          </form>
        </motion.div>

        {letter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-7"
          >
            <div className="flex justify-between items-center mb-5">
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-base font-semibold text-white"
              >
                Your Cover Letter
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="btn-ghost py-2 px-3 text-xs"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="btn-primary py-2 px-3 text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
            <div
              className="rounded-xl p-6 whitespace-pre-wrap text-sm leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
                color: "rgba(248,250,255,0.85)",
                fontFamily: "Georgia, serif",
              }}
            >
              {letter}
            </div>
            <p
              className="text-xs mt-3 text-center"
              style={{ color: "var(--muted)" }}
            >
              Review and personalize before sending
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterPage;

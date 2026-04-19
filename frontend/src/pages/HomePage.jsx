import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  BarChart3,
  FileText,
  Calendar,
  CheckCircle2,
  Code2,
  GraduationCap,
  Cpu,
  Mic,
  Music,
  Building2,
  MessageSquare,
  Star,
  PhoneCall,
  Mail,
  HomeIcon,
  Users,
  Trophy,
  TrendingUp,
} from "lucide-react";

import sukhenImage from "../assets/sukhen.jpg";
import rijuImage from "../assets/riju.jpg";
import sanchayanImage from "../assets/sanchayan.jpg";
import rumanImage from "../assets/ruman.jpg";
import babanImage from "../assets/baban.jpg";
import asitImage from "../assets/Asit.jpg";
import sayanImage from "../assets/Sayan.jpeg";
import joydeepImage from "../assets/Joydeep.jpeg";
import adarshaImage from "../assets/Adarsha.jpeg";
import souravImage from "../assets/Sourav.jpeg";
import soumyajitImage from "../assets/Soumyajit.jpeg";

/* ─── Data ───────────────────────────────────── */
const STATS = [
  { value: "500+", label: "Students Guided", Icon: Users },
  { value: "95%", label: "Success Rate", Icon: Trophy },
  { value: "50+", label: "Partner Companies", Icon: Building2 },
  { value: "4.9★", label: "Avg. Rating", Icon: Star },
];

const SERVICES = [
  {
    Icon: MessageSquare,
    title: "Career Counselling",
    desc: "One-on-one sessions to explore career paths and make confident decisions.",
  },
  {
    Icon: BarChart3,
    title: "Skill Development",
    desc: "Personalized coaching to acquire technical expertise and essential soft skills.",
  },
  {
    Icon: FileText,
    title: "Resume & Interview Prep",
    desc: "Expert help to craft a compelling resume and ace interviews with mock sessions.",
  },
  {
    Icon: Code2,
    title: "Programming Skills",
    desc: "Targeted training to enhance your coding abilities in various languages.",
  },
  {
    Icon: GraduationCap,
    title: "Final Year Projects",
    desc: "Expert mentorship from concept to completion of your academic projects.",
  },
  {
    Icon: Cpu,
    title: "Simulation Models",
    desc: "Access pre-built project simulation models to accelerate your research.",
  },
  {
    Icon: Mic,
    title: "Expert Talk Sessions",
    desc: "Engage with industry leaders and gain invaluable insights.",
  },
  {
    Icon: Music,
    title: "Cultural Tuition",
    desc: "Explore your creative side with classes in music, dance, and arts.",
  },
  {
    Icon: Building2,
    title: "Placement Drives",
    desc: "We organize special placement drives to connect you with top companies.",
  },
];

const FOUNDERS = [
  {
    name: "Sayantan Das",
    image: rijuImage,
    role: "Founder",
    bio: "Visionary behind Xplosure with B.Tech, M.Tech, and pursuing PhD from recognized government institutes. With experience at a Communication Company, CTS, and as an Assistant Professor, he now channels his expertise to guide students toward their ideal career paths.",
  },
  {
    name: "Sukhen Mondal",
    image: sukhenImage,
    role: "Co-Founder",
    bio: "Electronics and Communication Engineering graduate pursuing integrated M.Tech + PhD in VLSI Design at IIIT Allahabad. GATE 2024 qualifier with active research in semiconductor device modeling, RTL to GDSII flows, and SoC verification.",
  },
  {
    name: "Sanchayan Saha",
    image: sanchayanImage,
    role: "Co-Founder & Tech Lead",
    bio: "Full Stack Developer with deep expertise in the MERN stack, Next.js, and modern frameworks. Passionate about building scalable solutions that empower users on their career journeys through innovative, user-friendly experiences.",
  },
];

const COLLABORATORS = [
  {
    name: "Ruman Kundu",
    image: rumanImage,
    title: "Co-founder, OUY Consultancy",
    bio: "ECE Diploma holder with industry experience at Sasmos Heat Technology Pvt. Ltd. Expert in consumer electronics sales and customer relationship management.",
  },
  {
    name: "Baban Maji",
    image: babanImage,
    title: "Co-founder, OUY Consultancy",
    bio: "ECE graduate from Cooch Behar Government Engineering College with MSME training at NIT Sikkim. Professional experience at Centum Electronics, Bangalore.",
  },
];

const SUCCESS = [
  {
    name: "Joydip Sarkar",
    role: "Technology Analyst, INFOSYS",
    image: joydeepImage,
  },
  {
    name: "Sayan Mondal",
    role: "Technology Analyst, INFOSYS",
    image: sayanImage,
  },
  { name: "Adarsha Mondal", role: "M.Tech, IIT PATNA", image: adarshaImage },
  {
    name: "Sourav Addhya",
    role: "PhD Scholar, IIIT Guwahati",
    image: souravImage,
  },
  {
    name: "Baban Maji",
    role: "Teacher, Mount Litera School",
    image: babanImage,
  },
  { name: "Asit", role: "JRF, IIT PATNA", image: asitImage },
  {
    name: "Soumyajit Mandal",
    role: "MTech VLSI, DIAT DRDO Pune",
    image: soumyajitImage,
  },
];

const MISSION = [
  "Empower students after Class 10 with personalized, unbiased career guidance.",
  "Offer innovative assessments and mentorship to reveal every student's strengths.",
  "Support learners with transparent information and expert counseling.",
  "Guide individuals toward clarity in academic and professional choices.",
  "Provide online & offline tuition for competitive exams like GATE.",
  "Provide lifelong growth opportunities beyond initial career decisions.",
];

const VISION = [
  "Become India's most trusted career guidance platform for youth.",
  "Ensure every student can discover and pursue their best-fit career.",
  "Redefine career counseling using advanced technology and real-world expertise.",
  "Build a generation of skilled, passionate, purpose-driven professionals.",
  "Keep youth free from depression and frustration through job satisfaction.",
  "Make expert guidance accessible to every student, everywhere.",
];

// ✅ FIX: Contact items defined with capitalized Icon key
// so ESLint recognizes component usage correctly
const CONTACT_ITEMS = [
  { Icon: PhoneCall, text: "+91 7980247918", href: "tel:+917980247918" },
  {
    Icon: Mail,
    text: "xplosure.carrier@gmail.com",
    href: "mailto:xplosure.carrier@gmail.com",
  },
  {
    Icon: HomeIcon,
    text: "NH17, Bijoynagar – Jalukbari Rd, Bongora, Guwahati, Assam 781015",
    href: null,
  },
  {
    Icon: Calendar,
    text: "Monday – Sunday: 10:00 AM – 9:00 PM IST",
    href: null,
  },
];

/* ─── Animation Variants ──────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ─── Component ───────────────────────────────── */
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "var(--navy)" }} className="overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 pb-16 mesh-bg"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--white) 1px, transparent 1px), linear-gradient(90deg, var(--white) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(43,94,232,0.2), transparent)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(0,198,255,0.15), transparent)",
            filter: "blur(30px)",
            animationDelay: "2s",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div
                variants={fadeUp}
                className="flex justify-center mb-6"
              >
                <span className="section-label">
                  <Sparkles className="w-3 h-3" /> AI-Powered Career Platform
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6"
              >
                Shape Your <span className="grad-text">Future Career</span> With
                Confidence
              </motion.h1>

              <motion.p
                variants={fadeUp}
                style={{ color: "var(--muted)" }}
                className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Professional guidance, AI resume analysis, personalized
                roadmaps, and expert mentorship — all in one place.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={() => navigate("/signup")}
                  className="btn-primary text-base px-8 py-4"
                >
                  Start For Free <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate("/pricing")}
                  className="btn-ghost text-base px-8 py-4"
                >
                  View Pricing
                </button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              {/* ✅ FIX: Using item.Icon directly — no destructuring rename */}
              {STATS.map((item) => (
                <div
                  key={item.label}
                  className="glass glass-hover rounded-xl p-5 text-center"
                >
                  <item.Icon
                    className="w-5 h-5 mx-auto mb-2"
                    style={{ color: "var(--cyan)" }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--white)",
                    }}
                    className="text-2xl font-bold"
                  >
                    {item.value}
                  </div>
                  <div
                    style={{ color: "var(--muted)" }}
                    className="text-xs mt-0.5"
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section
        id="services"
        className="py-24 relative"
        style={{ background: "var(--navy-2)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <span className="section-label">
                <TrendingUp className="w-3 h-3" /> What We Offer
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Our Services
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ color: "var(--muted)" }}
              className="mt-4 text-lg max-w-xl mx-auto"
            >
              Everything you need to land your dream career
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {/* ✅ FIX: Using item.Icon directly */}
            {SERVICES.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="glass glass-hover group rounded-xl p-6 cursor-default transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-11 h-11 rounded-lg mb-4 flex items-center justify-center"
                  style={{
                    background: "rgba(43,94,232,0.15)",
                    border: "1px solid rgba(43,94,232,0.25)",
                  }}
                >
                  <item.Icon
                    className="w-5 h-5"
                    style={{ color: "var(--blue-light)" }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--white)",
                  }}
                  className="text-base font-semibold mb-2"
                >
                  {item.title}
                </h3>
                <p
                  style={{ color: "var(--muted)" }}
                  className="text-sm leading-relaxed"
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FOUNDERS ═══ */}
      <section
        id="about"
        className="py-24"
        style={{ background: "var(--navy)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <span className="section-label">
                <Users className="w-3 h-3" /> The Team
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Meet Our Founders
            </motion.h2>
          </motion.div>

          <div className="space-y-20">
            {FOUNDERS.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "md:[direction:rtl]" : ""}`}
              >
                <div className={i % 2 !== 0 ? "[direction:ltr]" : ""}>
                  <div className="relative inline-block w-full max-w-sm mx-auto">
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--blue), var(--cyan))",
                        opacity: 0.2,
                        transform: "rotate(3deg)",
                        borderRadius: "18px",
                      }}
                    />
                    <img
                      src={f.image}
                      alt={f.name}
                      className="relative rounded-2xl w-full object-cover shadow-2xl"
                      style={{
                        maxHeight: "400px",
                        objectPosition: "top",
                        border: "1px solid var(--border)",
                      }}
                    />
                  </div>
                </div>
                <div className={i % 2 !== 0 ? "[direction:ltr]" : ""}>
                  <span className="section-label mb-4 inline-flex">
                    {f.role}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--white)",
                    }}
                    className="text-3xl font-bold mt-3 mb-4"
                  >
                    {f.name}
                  </h3>
                  <p
                    style={{ color: "var(--muted)" }}
                    className="text-base leading-relaxed"
                  >
                    {f.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MISSION & VISION ═══ */}
      <section
        id="mission-vision"
        className="py-24"
        style={{ background: "var(--navy-2)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl font-bold text-white"
            >
              Our Mission & Vision
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Mission", points: MISSION, color: "var(--blue)" },
              { title: "Vision", points: VISION, color: "var(--cyan)" },
            ].map(({ title, points, color }) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${color}20`,
                      border: `1px solid ${color}40`,
                    }}
                  >
                    <Sparkles className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--white)",
                    }}
                    className="text-xl font-bold"
                  >
                    Our {title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color }}
                      />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUCCESS STORIES ═══ */}
      <section
        id="success"
        className="py-24"
        style={{ background: "var(--navy)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <span className="section-label">
                <Trophy className="w-3 h-3" /> Alumni
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl font-bold text-white"
            >
              Success Stories
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {SUCCESS.map((s) => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                className="glass glass-hover rounded-xl p-5 text-center"
                whileHover={{ y: -4 }}
              >
                <div className="relative mb-4 inline-block">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                    style={{ border: "2px solid var(--border)" }}
                  />
                  <div
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--navy)",
                      border: "2px solid var(--success)",
                    }}
                  >
                    <CheckCircle2
                      className="w-3 h-3"
                      style={{ color: "var(--success)" }}
                    />
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--white)",
                    fontSize: "14px",
                  }}
                  className="font-semibold mb-1"
                >
                  {s.name}
                </h3>
                <p
                  style={{ color: "var(--muted)", fontSize: "11px" }}
                  className="leading-snug"
                >
                  {s.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COLLABORATORS ═══ */}
      <section
        id="collaborators"
        className="py-24"
        style={{ background: "var(--navy-2)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl font-bold text-white"
            >
              Our Collaborators
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ color: "var(--muted)" }}
              className="mt-4 max-w-2xl mx-auto leading-relaxed"
            >
              Proud to partner with OUY Consultancy — strengthening
              industry-academia relations and creating off-campus placement
              opportunities.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {COLLABORATORS.map((c) => (
              <motion.div
                key={c.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass glass-hover rounded-xl p-8 text-center"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  style={{ border: "2px solid var(--border)" }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--white)",
                  }}
                  className="text-lg font-bold mb-1"
                >
                  {c.name}
                </h3>
                <p className="text-xs mb-4" style={{ color: "var(--cyan)" }}>
                  {c.title}
                </p>
                <p
                  style={{ color: "var(--muted)" }}
                  className="text-sm leading-relaxed text-left"
                >
                  {c.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section
        id="booking"
        className="py-24 relative overflow-hidden"
        style={{ background: "var(--navy)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(43,94,232,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <span className="section-label">
                <Sparkles className="w-3 h-3" /> Get Started
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl md:text-5xl font-bold text-white mb-5"
            >
              Ready to take the
              <br />
              <span className="grad-text">next step?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ color: "var(--muted)" }}
              className="text-lg mb-8"
            >
              Join hundreds of students who have transformed their careers with
              Xplosure.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate("/signup")}
                className="btn-primary text-base px-8 py-4"
              >
                Start For Free <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://forms.gle/akJDYmA2P1KKhvWw8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base px-8 py-4"
              >
                Schedule Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section
        id="contact"
        className="py-24"
        style={{ background: "var(--navy-2)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl font-bold text-white"
            >
              Contact Us
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-4"
            >
              {/* ✅ FIX: Using item.Icon directly — no destructuring rename */}
              {CONTACT_ITEMS.map((item) => (
                <div
                  key={item.text}
                  className="glass glass-hover rounded-xl p-4 flex items-start gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: "rgba(43,94,232,0.15)",
                      border: "1px solid rgba(43,94,232,0.25)",
                    }}
                  >
                    <item.Icon
                      className="w-5 h-5"
                      style={{ color: "var(--blue-light)" }}
                    />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{ color: "var(--muted)" }}
                      className="text-sm leading-relaxed hover:text-white transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p
                      style={{ color: "var(--muted)" }}
                      className="text-sm leading-relaxed"
                    >
                      {item.text}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.716954271815!2d91.59768077524959!3d26.14081397711583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a44332348b6ad%3A0x63369325492a259c!2sNH17%2C%20Bongora%2C%20Assam%20781015!5e0!3m2!1sen!2sin!4v1716982888258!5m2!1sen!2sin"
                width="100%"
                height="380"
                style={{
                  border: 0,
                  borderRadius: "14px",
                  filter: "invert(90%) hue-rotate(200deg) saturate(0.5)",
                }}
                allowFullScreen
                loading="lazy"
                title="Xplosure Location"
                className="shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

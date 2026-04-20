const pdfParse = require("pdf-parse");
const fs = require("fs").promises;
const path = require("path");

// Pre-defined job roles with required skills and roadmap steps
const JOB_ROLES = {
  "Frontend Developer": {
    keywords: [
      "react",
      "angular",
      "vue",
      "javascript",
      "html",
      "css",
      "typescript",
    ],
    roadmap: [
      "Learn HTML & CSS fundamentals",
      "Master JavaScript (ES6+)",
      "Pick a framework: React, Vue, or Angular",
      "Build 3 portfolio projects",
      "Learn Git and GitHub",
      "Understand responsive design and accessibility",
    ],
  },
  "Backend Developer": {
    keywords: [
      "node",
      "express",
      "django",
      "python",
      "java",
      "spring",
      "sql",
      "mongodb",
      "postgresql",
    ],
    roadmap: [
      "Learn a server-side language (Node.js/Python/Java)",
      "Understand REST APIs",
      "Master a database (SQL or MongoDB)",
      "Learn authentication & authorization",
      "Build a CRUD application",
      "Deploy on cloud (AWS/Heroku)",
    ],
  },
  "Data Analyst": {
    keywords: [
      "excel",
      "sql",
      "python",
      "tableau",
      "power bi",
      "pandas",
      "numpy",
      "data visualization",
    ],
    roadmap: [
      "Master Excel and SQL",
      "Learn Python for data analysis (Pandas, NumPy)",
      "Get proficient in data visualization (Tableau/Power BI)",
      "Work on real-world datasets (Kaggle)",
      "Build a portfolio of dashboards",
    ],
  },
  "Full Stack Developer": {
    keywords: [
      "react",
      "node",
      "mongodb",
      "express",
      "javascript",
      "typescript",
      "full stack",
    ],
    roadmap: [
      "Learn frontend (HTML, CSS, JavaScript, React)",
      "Learn backend (Node.js, Express)",
      "Understand databases (MongoDB, PostgreSQL)",
      "Build a full-stack project",
      "Learn deployment (Vercel, Heroku, AWS)",
    ],
  },
  "DevOps Engineer": {
    keywords: [
      "docker",
      "kubernetes",
      "jenkins",
      "aws",
      "azure",
      "ci/cd",
      "linux",
      "terraform",
    ],
    roadmap: [
      "Master Linux and shell scripting",
      "Learn containerization (Docker)",
      "Understand orchestration (Kubernetes)",
      "CI/CD pipelines (Jenkins/GitHub Actions)",
      "Cloud platforms (AWS/Azure/GCP)",
      "Infrastructure as Code (Terraform)",
    ],
  },
};

// Course links for common skills
const COURSE_LINKS = {
  react: [
    {
      title: "React - The Complete Guide (Udemy)",
      url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    },
    { title: "React Official Tutorial", url: "https://react.dev/learn" },
  ],
  node: [
    {
      title: "Node.js, Express, MongoDB Bootcamp (Udemy)",
      url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
    },
    { title: "Node.js Official Docs", url: "https://nodejs.org/en/docs/" },
  ],
  python: [
    {
      title: "100 Days of Code: Python (Udemy)",
      url: "https://www.udemy.com/course/100-days-of-code/",
    },
    {
      title: "Python for Everybody (Coursera)",
      url: "https://www.coursera.org/specializations/python",
    },
  ],
  sql: [
    {
      title: "SQL for Data Analysis (Udemy)",
      url: "https://www.udemy.com/course/sql-for-data-analysis/",
    },
    { title: "SQLBolt Interactive Tutorial", url: "https://sqlbolt.com/" },
  ],
  javascript: [
    {
      title: "The Complete JavaScript Course (Udemy)",
      url: "https://www.udemy.com/course/the-complete-javascript-course/",
    },
    { title: "JavaScript.info", url: "https://javascript.info/" },
  ],
  mongodb: [{ title: "MongoDB University", url: "https://learn.mongodb.com/" }],
  docker: [
    {
      title: "Docker & Kubernetes: The Practical Guide (Udemy)",
      url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
    },
  ],
  typescript: [
    {
      title: "Understanding TypeScript (Udemy)",
      url: "https://www.udemy.com/course/understanding-typescript/",
    },
    {
      title: "TypeScript Official Docs",
      url: "https://www.typescriptlang.org/docs/",
    },
  ],
};

const DEFAULT_COURSES = [
  { title: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
  { title: "Coursera", url: "https://www.coursera.org/" },
];

const analyzeResumeText = (text) => {
  const lowerText = text.toLowerCase();
  // ✅ FIX: Start score at 0 — blank resume should not get 40 points
  let score = 0;
  const recommendations = [];
  const feedback = [];
  const foundSkills = new Set();

  // Collect all skills found in resume
  const allKeywords = Object.values(JOB_ROLES).flatMap((role) => role.keywords);
  allKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword)) {
      foundSkills.add(keyword);
    }
  });

  // --- ATS Scoring ---

  // Section headers (10 pts)
  const sectionKeywords = [
    "education",
    "experience",
    "skills",
    "projects",
    "certifications",
  ];
  const sectionsFound = sectionKeywords.filter((s) =>
    lowerText.includes(s),
  ).length;
  score += Math.min(sectionsFound * 2, 10);
  if (sectionsFound < 3) {
    feedback.push(
      "Missing Sections: Add Education, Experience, Skills, and Projects sections.",
    );
  }

  // Technical skills (25 pts)
  const skillScore = Math.min(foundSkills.size * 3, 25);
  score += skillScore;
  if (foundSkills.size === 0) {
    feedback.push(
      "Missing Core Skills: Add specific programming languages or frameworks.",
    );
    recommendations.push("Programming Skills Coaching");
  }

  // Experience / projects (25 pts)
  const expKeywords = [
    "project",
    "experience",
    "internship",
    "developed",
    "built",
    "created",
    "implemented",
    "designed",
  ];
  const expMatches = expKeywords.filter((k) => lowerText.includes(k)).length;
  const expScore = Math.min(expMatches * 4, 25);
  score += expScore;
  if (expMatches < 2) {
    feedback.push(
      "Lack of Experience: Include Projects or Internships with action verbs.",
    );
    recommendations.push("Final Year Project Guidance");
  }

  // Soft skills (10 pts)
  const softKeywords = [
    "communication",
    "team",
    "leadership",
    "collaboration",
    "problem-solving",
    "analytical",
  ];
  const softFound = softKeywords.filter((k) => lowerText.includes(k)).length;
  score += Math.min(softFound * 2, 10);
  if (softFound === 0) {
    feedback.push(
      "Missing Soft Skills: Highlight teamwork, communication, leadership.",
    );
    recommendations.push("Skill Development Coaching");
  }

  // Resume length (15 pts)
  if (lowerText.length >= 1500) {
    score += 15;
  } else if (lowerText.length >= 800) {
    score += 8;
    feedback.push(
      "Could be more detailed: Elaborate on your achievements and responsibilities.",
    );
  } else {
    feedback.push(
      "Too Brief: Your resume is too short. Elaborate on achievements.",
    );
    recommendations.push("Resume & Interview Prep");
  }

  // Contact info (15 pts)
  const hasEmail = /\S+@\S+\.\S+/.test(lowerText);
  const hasPhone = /[\d\-\+\(\)\s]{7,}/.test(text);
  if (hasEmail) score += 8;
  if (hasPhone) score += 7;
  if (!hasEmail || !hasPhone) {
    feedback.push(
      "Contact Info: Make sure your email and phone number are clearly listed.",
    );
  }

  if (recommendations.length === 0) {
    recommendations.push("Career Counselling", "Placement Drive Arrangements");
    feedback.push("Great resume! Focus on interview prep and networking now.");
  }

  const atsScore = Math.min(Math.round(score), 100);

  // --- Job Role Matching ---
  const roleScores = {};
  Object.entries(JOB_ROLES).forEach(([role, data]) => {
    const matchCount = data.keywords.filter((k) =>
      lowerText.includes(k),
    ).length;
    roleScores[role] = (matchCount / data.keywords.length) * 100;
  });

  const topRoles = Object.entries(roleScores)
    .filter(([, pct]) => pct > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([role, match]) => ({
      role,
      matchPercentage: Math.round(match),
      roadmap: JOB_ROLES[role].roadmap,
    }));

  if (topRoles.length === 0) {
    topRoles.push({
      role: "Full Stack Developer",
      matchPercentage: 0,
      roadmap: JOB_ROLES["Full Stack Developer"].roadmap,
    });
  }

  // --- Skill Gap Analysis ---
  const primaryRole = topRoles[0].role;
  const requiredSkills = JOB_ROLES[primaryRole].keywords;
  const missingSkills = requiredSkills.filter(
    (skill) => !lowerText.includes(skill),
  );

  const skillGapCourses = missingSkills.slice(0, 5).map((skill) => ({
    skill,
    courses: (COURSE_LINKS[skill] || DEFAULT_COURSES).slice(0, 2),
  }));

  return {
    atsScore,
    recommendations: [...new Set(recommendations)],
    feedback,
    matchedRoles: topRoles,
    foundSkills: [...foundSkills],
    skillGap: {
      role: primaryRole,
      missingSkills,
      courses: skillGapCourses,
    },
  };
};

const parseResumePDF = async (filePath) => {
  // ✅ FIX: Path traversal check
  const resolvedPath = path.resolve(filePath);
  const uploadsDir = path.resolve(__dirname, '../uploads');
  if (!resolvedPath.startsWith(uploadsDir)) {
    throw new Error("Invalid file path");
  }

  try {
    // ✅ FIX: Use async readFile instead of blocking readFileSync
    const dataBuffer = await fs.readFile(resolvedPath);
    const options = { max: 10 };
    const pdfData = await pdfParse(dataBuffer, options);

    if (!pdfData.text || pdfData.text.trim().length < 50) {
      throw new Error("PDF appears to be empty or image-based");
    }

    return analyzeResumeText(pdfData.text);
  } catch (error) {
    throw new Error(`PDF parsing failed: ${error.message}`);
  }
};

module.exports = { analyzeResumeText, parseResumePDF };

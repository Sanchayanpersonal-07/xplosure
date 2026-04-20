/**
 * Cover Letter Generator
 * Currently template-based — designed to be swapped with AI API (Claude/GPT) later.
 */

const generateCoverLetter = (userName, jobTitle, companyName, skills) => {
  const skillList =
    skills.length > 0
      ? skills.slice(0, 5).join(", ")
      : "communication, problem-solving, teamwork";

  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With my background in ${skillList}, I am confident in my ability to make a meaningful contribution to your team.

Throughout my experience, I have developed solid proficiency in ${skills[0] || "relevant technologies"} and have successfully delivered projects that improved efficiency and drove results. I am particularly drawn to ${companyName}'s commitment to excellence and innovation.

I am eager to bring my expertise in ${skillList} to your organization and would welcome the opportunity to discuss how I can contribute to your team's goals.

Thank you for considering my application. I look forward to the possibility of connecting with you.

Sincerely,
${userName}`;
};

// ✅ FIX: Extract actual skills found in the resume (from resumeAnalyzer's foundSkills),
// NOT roadmap steps like "Learn HTML & CSS fundamentals" which are learning goals, not skills.
// Falls back to matched role keywords if foundSkills not available (older user records).
const extractSkillsFromUser = (user) => {
  // Primary: use foundSkills saved during resume analysis (added in resumeAnalyzer.js)
  if (user.foundSkills && user.foundSkills.length > 0) {
    return user.foundSkills.slice(0, 5);
  }

  // Fallback: derive existing skills from skillGap (required - missing = existing)
  if (user.skillGap?.role && user.matchedRoles?.length > 0) {
    const topRole = user.matchedRoles[0];
    const missingSet = new Set(user.skillGap?.missingSkills || []);
    // Infer existing skills = role keywords that are NOT in missingSkills
    const roleKeywords = getRoleKeywords(topRole.role);
    const existingSkills = roleKeywords.filter((k) => !missingSet.has(k));
    if (existingSkills.length > 0) return existingSkills.slice(0, 5);
  }

  // Last resort default
  return ["communication", "problem-solving", "teamwork"];
};

// Role keyword map (kept in sync with resumeAnalyzer JOB_ROLES)
const getRoleKeywords = (roleName) => {
  const ROLE_KEYWORDS = {
    "Frontend Developer": [
      "react",
      "javascript",
      "html",
      "css",
      "typescript",
      "angular",
      "vue",
    ],
    "Backend Developer": [
      "node",
      "express",
      "python",
      "sql",
      "mongodb",
      "postgresql",
      "java",
    ],
    "Data Analyst": [
      "python",
      "sql",
      "excel",
      "tableau",
      "power bi",
      "pandas",
      "numpy",
    ],
    "Full Stack Developer": [
      "react",
      "node",
      "mongodb",
      "express",
      "javascript",
      "typescript",
    ],
    "DevOps Engineer": [
      "docker",
      "linux",
      "aws",
      "azure",
      "kubernetes",
      "jenkins",
      "terraform",
    ],
  };
  return ROLE_KEYWORDS[roleName] || [];
};

exports.generateForUser = async (user, jobTitle, companyName) => {
  const skills = extractSkillsFromUser(user);
  return generateCoverLetter(user.name, jobTitle, companyName, skills);
};

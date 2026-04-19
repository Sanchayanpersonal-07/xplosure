/**
 * Cover Letter Generator
 * Currently template-based — designed to be swapped with AI API (Claude/GPT) later.
 */

const generateCoverLetter = (userName, jobTitle, companyName, skills, experience) => {
  const skillList = skills.slice(0, 5).join(', ') || 'communication, problem-solving';

  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With my background in ${skillList}, I am confident in my ability to make a meaningful contribution to your team.

Throughout my experience, I have developed a solid foundation in ${skills[0] || 'relevant technologies'} and have successfully ${experience || 'delivered projects that improved efficiency and drove results'}. I am particularly drawn to ${companyName}'s commitment to excellence and innovation.

I am eager to bring my expertise in ${skillList} to your organization and would welcome the opportunity to discuss how I can contribute to your team's goals.

Thank you for considering my application. I look forward to the possibility of connecting with you.

Sincerely,
${userName}`;
};

const extractSkillsFromAnalysis = (user) => {
  const skills = [];
  if (user.matchedRoles && user.matchedRoles.length > 0) {
    const topRole = user.matchedRoles[0];
    skills.push(...(topRole.roadmap.slice(0, 3) || []));
  }
  return skills;
};

exports.generateForUser = async (user, jobTitle, companyName) => {
  const skills = extractSkillsFromAnalysis(user);
  const experience = user.resumeFeedback?.find((f) => f.toLowerCase().includes('experience')) || '';

  return generateCoverLetter(
    user.name,
    jobTitle,
    companyName,
    skills.length ? skills : ['communication', 'problem-solving', 'teamwork'],
    experience
  );
};

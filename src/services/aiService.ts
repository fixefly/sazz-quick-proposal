
import { ProposalFormData } from "@/components/ProposalForm";

export const generateProposal = async (formData: ProposalFormData): Promise<string> => {
  // In a real application, this would call an AI service API
  // For now, we'll simulate the AI response with a delay and template
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const proposal = createProposalTemplate(formData);
      resolve(proposal);
    }, 1500);
  });
};

const createProposalTemplate = (data: ProposalFormData): string => {
  // This function simulates what an AI would generate
  // In a real app, this would be replaced with an actual API call
  
  const tonePhrases = {
    professional: {
      intro: "I'm writing to express my interest in your project.",
      understanding: "After carefully reviewing your requirements,",
      experience: "I have extensive experience in",
      closing: "I'm confident I can deliver excellent results that meet all your project goals."
    },
    friendly: {
      intro: "I noticed your project and I'm excited about the opportunity!",
      understanding: "Looking at your description,",
      experience: "I've worked on similar projects involving",
      closing: "I'd love to chat more about how I can help bring your vision to life!"
    },
    confident: {
      intro: "I'm the ideal freelancer for your project.",
      understanding: "Based on the details you've provided,",
      experience: "My background includes successful delivery of",
      closing: "I guarantee high-quality work delivered on time with no compromises."
    },
    formal: {
      intro: "I would like to submit my application for your consideration.",
      understanding: "Upon thorough analysis of your project details,",
      experience: "My professional background encompasses",
      closing: "I would welcome the opportunity to discuss how my qualifications align with your requirements."
    }
  };

  const experienceDetails = {
    "ui-ux": "UI/UX design for websites, web applications, and mobile apps. My design approach focuses on creating intuitive, user-friendly interfaces that enhance user experience while maintaining aesthetic appeal.",
    "graphic-design": "graphic design projects across various industries. I create visually compelling designs that effectively communicate brand messages and engage target audiences.",
    "logo-branding": "logo design and branding projects. I develop distinctive visual identities that reflect brand values and create lasting impressions with target audiences.",
    "cms": "content management systems including WordPress, Wix, Webflow, and Framer. I build customized, responsive websites with user-friendly admin interfaces.",
    "development": "web development using various programming languages and frameworks. I create clean, maintainable code that results in high-performing applications."
  };

  const tone = tonePhrases[data.tone as keyof typeof tonePhrases];
  const experienceType = data.experienceType as keyof typeof experienceDetails;
  const experienceDescription = experienceDetails[experienceType] || "various design and development projects";
  
  // Extract key information from job description if available
  let jobInsights = "";
  if (data.jobDescription && data.jobDescription.trim().length > 0) {
    // Simple keyword extraction to demonstrate understanding the job
    const keywords = extractKeywords(data.jobDescription);
    if (keywords.length > 0) {
      jobInsights = `I understand you need ${keywords.join(", ")} for your project. `;
    }
  }

  const proposal = `Hello,

${tone.intro} ${tone.understanding} ${jobInsights}I'm ready to help you achieve your goals.

${tone.experience} ${experienceDescription} With 7+ years of experience and over 200 successfully completed client projects, I have the expertise needed to deliver exceptional results for your project. ${data.yourExperience ? `Additionally, ${data.yourExperience}` : ""}

I approach each project with meticulous attention to detail and maintain clear communication throughout the process. My goal is to exceed expectations and establish a long-term professional relationship.

${tone.closing}

I look forward to discussing your project further.

Best regards,
Sazz`;

  // Adjust length by trimming or expanding as needed
  return adjustLength(proposal, data.length);
};

// Simple function to extract keywords from job description
const extractKeywords = (jobDescription: string): string[] => {
  const skills = ["design", "development", "UI", "UX", "branding", "logo", "website", "app", 
                 "mobile", "responsive", "WordPress", "Webflow", "Wix", "Framer"];
  
  const foundSkills = skills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );
  
  return foundSkills.length > 0 ? 
    foundSkills.slice(0, 3) : // Limit to top 3 for brevity
    [];
};

const adjustLength = (text: string, targetWords: number): string => {
  const words = text.split(/\s+/);
  const currentLength = words.length;
  
  if (currentLength <= targetWords) {
    return text; // Already shorter than target
  }
  
  // Simple trimming approach - in a real AI system this would be more sophisticated
  const ratio = targetWords / currentLength;
  const paragraphs = text.split('\n\n');
  
  // Keep intro and closing paragraphs, adjust middle paragraphs
  if (paragraphs.length >= 3) {
    const intro = paragraphs[0];
    const closing = paragraphs[paragraphs.length - 1];
    const signature = paragraphs[paragraphs.length - 2];
    
    // Compress middle paragraphs
    const middleParagraphs = paragraphs.slice(1, -2);
    let middleText = middleParagraphs.join(' ');
    const middleWords = middleText.split(/\s+/);
    
    // Calculate how many words to keep from middle
    const wordsToKeep = Math.max(1, Math.floor((targetWords - intro.split(/\s+/).length - 
                                              closing.split(/\s+/).length - 
                                              signature.split(/\s+/).length)));
    
    middleText = middleWords.slice(0, wordsToKeep).join(' ');
    
    return [intro, middleText, signature, closing].join('\n\n');
  }
  
  // Fallback: just truncate
  return words.slice(0, targetWords).join(' ');
};

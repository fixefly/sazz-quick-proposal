
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
  // Extract keywords from job description
  const jobKeywords = data.jobDescription ? extractKeywords(data.jobDescription) : [];
  const keywordsList = jobKeywords.length > 0 ? jobKeywords.join(", ") : `${data.experienceType} development`;
  
  // Generate project benefits based on job description
  const projectBenefits = data.jobDescription ? 
    generateProjectBenefits(data.jobDescription, data.experienceType) : 
    "delivering high-quality work within the expected timeframe";

  // Get the relevant experience description
  const experienceDetails = {
    "ui-ux": "UI/UX design",
    "graphic-design": "graphic design",
    "logo-branding": "logo design and branding",
    "cms": "content management systems",
    "development": "web and app development"
  };

  const experienceType = data.experienceType as keyof typeof experienceDetails;
  const experienceDescription = experienceDetails[experienceType] || "design and development";
  
  // Format the proposal as a single paragraph without section headings
  const proposal = `Hi there! Thank you so much for providing detailed information about your ${data.jobTitle} job. It instantly grabbed my attention and aligns perfectly with my experience as a ${experienceDescription} specialist with 7+ years of experience working with over 150+ clients. As you can view on my Upwork profile, I've completed numerous ${experienceDescription} projects with 5-star reviews and positive client feedback. Two specific examples that showcase the quality of my work and relate directly to your job post are attached to this proposal for you. I pride myself on my expertise in ${keywordsList}, my ability to deliver projects on time, and my commitment to client satisfaction. I can bring tremendous value to your project by ${projectBenefits}. Let's schedule a quick 10-minute introduction call so that we can discuss your project in more detail and ensure that I will be the perfect fit. I have today open from 10 AM to 2 PM (EST). If those times don't work for you, just let me know what works best and I will do my best to alter my schedule around your availability. During our call, I'd like to understand your timeline for this project, any specific design preferences you have, and what would make this project a success in your view. I am looking forward to hearing more about your exciting project and how I can help you! Best Regards, Sazz`;

  // Adjust length if needed
  return adjustLength(proposal, data.length);
};

// Extract keywords from job description
const extractKeywords = (jobDescription: string): string[] => {
  const skills = ["design", "development", "UI", "UX", "branding", "logo", "website", "app", 
                 "mobile", "responsive", "WordPress", "Webflow", "Wix", "Framer", 
                 "graphics", "illustration", "animation", "wireframing", "prototyping"];
  
  const foundSkills = skills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );
  
  return foundSkills.length > 0 ? 
    foundSkills.slice(0, 4) : // Limit to top 4 for brevity
    [];
};

// Generate project benefits text based on job description
const generateProjectBenefits = (jobDescription: string, experienceType: string): string => {
  const description = jobDescription.toLowerCase();
  let benefits = [];
  
  // Add general benefits based on experience type
  if (experienceType === "ui-ux") {
    benefits.push("creating intuitive and user-friendly interfaces that enhance user experience");
    benefits.push("delivering modern design aesthetics that align with current industry trends");
  } else if (experienceType === "graphic-design") {
    benefits.push("creating visually compelling designs that effectively communicate your brand message");
    benefits.push("applying careful attention to detail and color theory to create impactful visuals");
  } else if (experienceType === "logo-branding") {
    benefits.push("developing a distinctive visual identity that reflects your brand values");
    benefits.push("ensuring comprehensive brand guidelines to maintain consistency");
  } else if (experienceType === "cms") {
    benefits.push("building custom, responsive websites with your preferred CMS");
    benefits.push("implementing user-friendly admin interfaces for easy content management");
  } else if (experienceType === "development") {
    benefits.push("writing clean, efficient code that follows best practices");
    benefits.push("ensuring seamless functionality across all devices and browsers");
  }
  
  // Add additional benefits based on job description keywords
  if (description.includes("responsive") || description.includes("mobile")) {
    benefits.push("ensuring fully responsive design that works flawlessly on all devices");
  }
  
  if (description.includes("deadline") || description.includes("urgent")) {
    benefits.push("meeting your tight deadlines while maintaining high quality standards");
  }
  
  if (description.includes("revisions") || description.includes("feedback")) {
    benefits.push("maintaining a collaborative approach with regular updates and revisions");
  }
  
  if (description.includes("seo") || description.includes("search engine")) {
    benefits.push("implementing SEO-friendly design and development practices");
  }
  
  // Combine the benefits into a single text string
  return benefits.slice(0, 3).join(", and "); // Limit to top 3 for conciseness
};

const adjustLength = (text: string, targetWords: number): string => {
  const words = text.split(/\s+/);
  const currentLength = words.length;
  
  if (currentLength <= targetWords) {
    return text; // Already shorter than target
  }
  
  // For single paragraph format, we'll intelligently trim the middle sections
  // while preserving the greeting and closing
  
  // Preserve the first quarter and last quarter of the text
  const preserveStart = Math.floor(targetWords * 0.3);
  const preserveEnd = Math.floor(targetWords * 0.3);
  const middleWords = targetWords - preserveStart - preserveEnd;
  
  if (middleWords <= 0) {
    // If target is very small, just return the start and end
    return words.slice(0, preserveStart).join(' ') + ' ... ' + 
           words.slice(words.length - preserveEnd).join(' ');
  }
  
  // Take words from the middle section to fill the remaining target
  const start = words.slice(0, preserveStart).join(' ');
  const middle = words.slice(preserveStart, preserveStart + middleWords).join(' ');
  const end = words.slice(words.length - preserveEnd).join(' ');
  
  return start + ' ' + middle + ' ' + end;
};

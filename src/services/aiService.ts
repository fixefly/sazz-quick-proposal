
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
  
  const experienceDetails = {
    "ui-ux": "UI/UX design for websites, web applications, and mobile apps",
    "graphic-design": "graphic design across various industries",
    "logo-branding": "logo design and branding",
    "cms": "content management systems including WordPress, Wix, Webflow, and Framer",
    "development": "web and app development"
  };

  const experienceType = data.experienceType as keyof typeof experienceDetails;
  const experienceDescription = experienceDetails[experienceType] || "various design and development projects";
  
  // Extract key information from job description if available
  let jobKeywords = "";
  let projectBenefits = "";
  if (data.jobDescription && data.jobDescription.trim().length > 0) {
    // Simple keyword extraction to demonstrate understanding the job
    const keywords = extractKeywords(data.jobDescription);
    if (keywords.length > 0) {
      jobKeywords = keywords.join(", ");
      
      // Generate project benefits based on job description and experience
      projectBenefits = generateProjectBenefits(data.jobDescription, experienceType);
    }
  }

  // Format the proposal using the template structure
  const proposal = `**— Cover Letter Introduction —** 
Hi!

Thank you so much for providing detailed information about your ${data.jobTitle} job. It instantly grabbed my attention and aligns perfectly with my experience as a ${experienceDescription} specialist.

**— Provide an example of your work —** 

As you can view on my Upwork profile, I've completed numerous ${experienceDescription} jobs with 5-star reviews, including overly positive client feedback. Two specific examples that showcase the quality of my work and relate directly to your job post are attached to this proposal for you.

**— Prove your credibility —**
Here's what you should know about me:
- 7+ years of experience in ${experienceDescription}
- Successfully completed 200+ client projects with excellent feedback
- Expert in ${jobKeywords || experienceDescription}
${data.yourExperience ? `- ${data.yourExperience}` : ""}

**— List what I can bring to the project —**
Here's what I can bring to your project:
${projectBenefits}

**— Include a call to action —**

Let's schedule a quick 10-minute introduction call so that we can discuss your project in more detail and ensure that I will be the perfect fit. I have today open from 10 AM to 2 PM (EST).

If those times don't work for you, just let me know what works best and I will do my best to alter my schedule around your availability.

Questions for the call:
- What is your timeline for this project?
- Do you have any specific design preferences or examples you like?
- What would make this project a success in your view?

I am looking forward to hearing more about your exciting project and how I can help you! : )

**— Closing —**

Best Regards,

Sazz`;

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

// Generate project benefits based on job description
const generateProjectBenefits = (jobDescription: string, experienceType: string): string => {
  const description = jobDescription.toLowerCase();
  let benefits = [];
  
  // Add general benefits based on experience type
  if (experienceType === "ui-ux") {
    benefits.push("Intuitive and user-friendly interfaces that enhance user experience");
    benefits.push("Modern design aesthetic that aligns with current industry trends");
  } else if (experienceType === "graphic-design") {
    benefits.push("Visually compelling designs that effectively communicate your brand message");
    benefits.push("Attention to detail and color theory to create impactful visuals");
  } else if (experienceType === "logo-branding") {
    benefits.push("Distinctive visual identity that reflects your brand values");
    benefits.push("Comprehensive brand guidelines to ensure consistency");
  } else if (experienceType === "cms") {
    benefits.push("Custom, responsive website built with your preferred CMS");
    benefits.push("User-friendly admin interface for easy content management");
  } else if (experienceType === "development") {
    benefits.push("Clean, efficient code that follows best practices");
    benefits.push("Seamless functionality across all devices and browsers");
  }
  
  // Add additional benefits based on job description keywords
  if (description.includes("responsive") || description.includes("mobile")) {
    benefits.push("Fully responsive design that works flawlessly on all devices");
  }
  
  if (description.includes("deadline") || description.includes("urgent")) {
    benefits.push("Quick turnaround time while maintaining high quality standards");
  }
  
  if (description.includes("revisions") || description.includes("feedback")) {
    benefits.push("Collaborative approach with regular updates and revisions");
  }
  
  if (description.includes("seo") || description.includes("search engine")) {
    benefits.push("SEO-friendly design and implementation");
  }
  
  // Format the benefits as bullet points
  return benefits.map(benefit => `- ${benefit}`).join("\n");
};

const adjustLength = (text: string, targetWords: number): string => {
  const words = text.split(/\s+/);
  const currentLength = words.length;
  
  if (currentLength <= targetWords) {
    return text; // Already shorter than target
  }
  
  // We'll aim to preserve the template structure while reducing content
  const sections = text.split("**—");
  
  if (sections.length < 3) {
    // If splitting didn't work as expected, just truncate
    return words.slice(0, targetWords).join(' ');
  }
  
  // Preserve introduction and closing
  const intro = "**—" + sections[1];
  const closing = "**—" + sections[sections.length - 1];
  
  // Determine how many words we have for the middle sections
  const introWords = intro.split(/\s+/).length;
  const closingWords = closing.split(/\s+/).length;
  const remainingWords = targetWords - introWords - closingWords;
  
  // If we can't fit everything, prioritize
  if (remainingWords <= 0) {
    return intro + "\n\n" + closing;
  }
  
  // Shorten the middle sections
  const middleSections = sections.slice(2, -1);
  let shortenedMiddle = "";
  let wordsUsed = 0;
  
  for (let i = 0; i < middleSections.length; i++) {
    const section = "**—" + middleSections[i];
    const sectionWords = section.split(/\s+/).length;
    
    if (wordsUsed + sectionWords <= remainingWords) {
      // We can include this section in full
      shortenedMiddle += section;
      wordsUsed += sectionWords;
    } else {
      // We need to truncate this section
      const availableWords = remainingWords - wordsUsed;
      if (availableWords > 20) { // Only include if we can keep a meaningful amount
        const truncatedSection = section.split(/\s+/).slice(0, availableWords).join(' ');
        shortenedMiddle += truncatedSection;
      }
      break;
    }
  }
  
  return intro + shortenedMiddle + closing;
};


import { ProposalFormData } from "@/components/ProposalForm";

export const generateProposal = async (formData: ProposalFormData): Promise<string> => {
  try {
    const systemPrompt = "You are an expert freelancer who writes highly effective job proposals. Create a professional proposal based on the job details provided.";
    
    const userPrompt = `
      Write a proposal for a job titled "${formData.jobTitle}" with the following details:
      
      Job Description: ${formData.jobDescription || "Not provided"}
      My Expertise: ${getExperienceDescription(formData.experienceType)}
      Additional Details: ${formData.yourExperience || "Not provided"}
      Preferred Communication: ${formData.communicationMethod === 'call' ? 'Phone call' : 'Chat'}
      
      Make the proposal approximately ${formData.length} words long.
      Use a ${formData.tone} tone.
      
      Format the proposal with clear paragraphs, including:
      - A personalized greeting
      - Understanding of the client's needs
      - My relevant experience and skills
      - How I can help with their specific project
      - A call to action to discuss further
      - A professional closing
    `;

    // Call ChatGPT API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('openai_api_key') || ''}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.error?.message || "Failed to generate proposal");
    }
    
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating proposal:", error);
    // Fallback to the template-based approach if the API call fails
    return createProposalTemplate(formData);
  }
};

const getExperienceDescription = (experienceType: string): string => {
  const experienceDetails: Record<string, string> = {
    "ui-ux": "UI/UX design",
    "graphic-design": "graphic design",
    "logo-branding": "logo design and branding",
    "cms": "content management systems",
    "development": "web and app development",
    "website": "website design and development",
    "webapp-mobile": "webapp and mobile app development"
  };

  return experienceDetails[experienceType] || "design and development";
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
    "development": "web and app development",
    "website": "website design and development",
    "webapp-mobile": "webapp and mobile app development"
  };

  const experienceType = data.experienceType as keyof typeof experienceDetails;
  const experienceDescription = experienceDetails[experienceType] || "design and development";
  
  // Customize communication method based on preference
  const communicationMethod = data.communicationMethod || "call";
  
  let communicationText;
  if (communicationMethod === "call") {
    communicationText = `Let's schedule a quick 10-minute introduction call so that we can discuss your project in more detail and ensure that I will be the perfect fit. I have availability throughout the week.\n\nIf you'd like to propose a specific time that works for you, I'll do my best to accommodate your schedule.`;
  } else {
    communicationText = `I'm available to chat about your project in more detail right away. Feel free to message me anytime. I'd love to learn more about your requirements and discuss how I can help you achieve your project goals.`;
  }
  
  // First analyze client's needs
  const clientNeedsAnalysis = data.jobDescription ? 
    analyzeClientNeeds(data.jobDescription) : 
    `Based on your project details, I understand you're looking for quality ${experienceDescription} work that meets your specific requirements.`;
  
  // Format the proposal with proper paragraphs
  const introduction = `Hi there!\n\nThank you so much for providing detailed information about your ${data.jobTitle} job. It instantly grabbed my attention and aligns perfectly with my experience as a ${experienceDescription} specialist.`;
  
  const clientUnderstanding = `${clientNeedsAnalysis}`;
  
  const workExamples = `As you can view on my profile, I've completed numerous ${experienceDescription} projects with 5-star reviews and positive client feedback.`;
  
  const credibility = `Here's what you should know about me: I have 7+ years of experience working with over 150+ clients. I pride myself on my expertise in ${keywordsList}, my ability to deliver projects on time, and my commitment to client satisfaction.`;
  
  const projectValue = `Here's what I can bring to your project: I can provide tremendous value by ${projectBenefits}.`;
  
  const callToAction = communicationText;
  
  let questions = "";
  if (communicationMethod === "call") {
    questions = `I'd like to understand:\n- Your timeline for this project\n- Any specific design preferences you have\n- What would make this project a success in your view`;
  } else {
    questions = `I'd like to understand:\n- Your timeline for this project\n- Any specific design preferences you have\n- What would make this project a success in your view`;
  }
  
  const closing = `I am looking forward to hearing more about your exciting project and how I can help you!\n\nBest Regards,\nSazz`;
  
  // Combine all sections with proper spacing
  const proposal = `${introduction}\n\n${clientUnderstanding}\n\n${workExamples}\n\n${credibility}\n\n${projectValue}\n\n${callToAction}\n\n${questions}\n\n${closing}`;

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

// Analyze client needs based on job description
const analyzeClientNeeds = (jobDescription: string): string => {
  const description = jobDescription.toLowerCase();
  let analysis = "After reviewing your project details, I understand that you're looking for ";
  
  // Identify key client needs based on the job description
  if (description.includes("responsive") || description.includes("mobile")) {
    analysis += "a responsive design that works seamlessly across all devices. ";
  } else if (description.includes("logo") || description.includes("brand")) {
    analysis += "a cohesive brand identity with impactful visuals. ";
  } else if (description.includes("website") || description.includes("web")) {
    analysis += "a professional website that represents your brand effectively. ";
  } else if (description.includes("app") || description.includes("mobile app")) {
    analysis += "a user-friendly mobile application with intuitive navigation. ";
  } else {
    analysis += "quality design work that meets your specific requirements. ";
  }
  
  // Add understanding of timeline if mentioned
  if (description.includes("urgent") || description.includes("asap") || description.includes("quickly")) {
    analysis += "I understand that timing is critical for this project and can prioritize accordingly. ";
  }
  
  // Add understanding of quality expectations
  if (description.includes("high quality") || description.includes("professional") || description.includes("premium")) {
    analysis += "I can see that high-quality, professional results are important to you. ";
  }
  
  return analysis;
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
  
  // Instead of trimming by preserving sections, we'll try to preserve the paragraph structure
  // while reducing the content proportionally across all sections
  
  // Split the text into paragraphs
  const paragraphs = text.split('\n\n');
  
  // Calculate the total reduction needed
  const reductionFactor = targetWords / currentLength;
  
  // Reduce each paragraph proportionally
  const reducedParagraphs = paragraphs.map(paragraph => {
    const paragraphWords = paragraph.split(/\s+/);
    
    // For very small paragraphs (like greetings), keep them intact
    if (paragraphWords.length <= 5) return paragraph;
    
    // Otherwise, reduce proportionally
    const targetParagraphWords = Math.max(
      5, // minimum 5 words per paragraph
      Math.floor(paragraphWords.length * reductionFactor)
    );
    
    // Preserve the beginning and end of each paragraph
    if (targetParagraphWords >= paragraphWords.length) return paragraph;
    
    const preserveStart = Math.min(3, Math.floor(targetParagraphWords * 0.3));
    const preserveEnd = Math.min(3, Math.floor(targetParagraphWords * 0.3));
    const middleWords = targetParagraphWords - preserveStart - preserveEnd;
    
    if (middleWords <= 0) {
      return paragraphWords.slice(0, preserveStart).join(' ') + '... ' + 
             paragraphWords.slice(paragraphWords.length - preserveEnd).join(' ');
    }
    
    return paragraphWords.slice(0, preserveStart).join(' ') + ' ' +
           paragraphWords.slice(preserveStart, preserveStart + middleWords).join(' ') + ' ' +
           paragraphWords.slice(paragraphWords.length - preserveEnd).join(' ');
  });
  
  return reducedParagraphs.join('\n\n');
};

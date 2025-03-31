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
      intro: "I'm writing to express my interest in",
      experience: "I have extensive experience in",
      closing: "I'm confident I can deliver excellent results for your project."
    },
    friendly: {
      intro: "I noticed your posting for",
      experience: "I've worked on similar projects involving",
      closing: "I'd love to chat more about how I can help with your project!"
    },
    confident: {
      intro: "I'm the freelancer you're looking for to handle",
      experience: "My background includes successful delivery of",
      closing: "I guarantee high-quality work delivered on time."
    },
    formal: {
      intro: "I would like to submit my application for",
      experience: "My professional background encompasses",
      closing: "I would welcome the opportunity to discuss how my qualifications align with your requirements."
    }
  };

  const tone = tonePhrases[data.tone as keyof typeof tonePhrases];
  
  const proposal = `Hello,

${tone.intro} the ${data.jobTitle} position. After carefully reviewing your requirements, I understand you need someone with expertise in ${data.clientRequirements || "the skills mentioned in your job posting"}.

${tone.experience} ${data.yourExperience}. This directly relates to your project requirements and positions me to deliver excellent results for you.

I approach each project with attention to detail and clear communication throughout the process. My goal is to exceed expectations and build a long-term professional relationship.

${tone.closing}

I look forward to discussing your project further.

Best regards,
Sazz`;

  // Adjust length by trimming or expanding as needed
  return adjustLength(proposal, data.length);
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

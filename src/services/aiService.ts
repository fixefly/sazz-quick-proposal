
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

    // Check if API key exists
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      throw new Error("No API key found. Please add your OpenAI API key in settings.");
    }

    // Call ChatGPT API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
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
    throw error;
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

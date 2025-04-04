
import React, { useState, useEffect } from 'react';
import ProposalForm, { ProposalFormData } from '@/components/ProposalForm';
import ProposalOutput from '@/components/ProposalOutput';
import ApiKeyInput from '@/components/ApiKeyInput';
import { generateProposal } from '@/services/aiService';
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const [proposal, setProposal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<ProposalFormData | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    // Check if API key is stored
    const storedKey = localStorage.getItem('openai_api_key');
    setHasApiKey(!!storedKey);

    // Set up storage event listener to update state when API key changes
    const handleStorageChange = () => {
      setHasApiKey(!!localStorage.getItem('openai_api_key'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const initialFormData: ProposalFormData = {
    jobTitle: '',
    jobDescription: '',
    clientRequirements: '',
    yourExperience: '',
    tone: 'professional',
    length: 150,
    experienceType: 'ui-ux',
    communicationMethod: 'chat',
  };

  const handleGenerate = async (formData: ProposalFormData) => {
    try {
      // Check if API key is available
      if (!localStorage.getItem('openai_api_key')) {
        toast.error("Please set your OpenAI API key first");
        return;
      }

      setIsLoading(true);
      setCurrentFormData(formData); // Save the current form data
      const generatedProposal = await generateProposal(formData);
      setProposal(generatedProposal);
    } catch (error) {
      console.error('Error generating proposal:', error);
      toast.error("Failed to generate proposal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (currentFormData) {
      try {
        // Check if API key is available
        if (!localStorage.getItem('openai_api_key')) {
          toast.error("Please set your OpenAI API key first");
          return;
        }

        setIsLoading(true);
        const regeneratedProposal = await generateProposal(currentFormData);
        setProposal(regeneratedProposal);
        toast.success("Proposal regenerated successfully");
      } catch (error) {
        console.error('Error regenerating proposal:', error);
        toast.error("Failed to regenerate proposal. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("No form data available for regeneration");
    }
  };

  const handleNewProposal = () => {
    setProposal(null);
    setCurrentFormData(null);
    toast.info("Start a new proposal");
  };

  const handleSave = (proposal: string) => {
    const savedProposals = JSON.parse(localStorage.getItem('savedProposals') || '[]');
    const newProposal = {
      id: Date.now().toString(),
      content: proposal,
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem('savedProposals', JSON.stringify([newProposal, ...savedProposals]));
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Proxob</h1>
        <p className="text-lg text-muted-foreground">Create customized job proposals in seconds</p>
        <div className="mt-2">
          <ApiKeyInput />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {!proposal && (
          <ProposalForm onGenerate={handleGenerate} isLoading={isLoading} />
        )}
        
        {proposal ? (
          <div className={!proposal ? "lg:col-span-2" : ""}>
            <ProposalOutput 
              proposal={proposal} 
              onSave={handleSave} 
              onRegenerate={handleRegenerate} 
              onNewProposal={handleNewProposal}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 border rounded-lg bg-muted/20">
              <h3 className="text-lg font-medium mb-2">Your proposal will appear here</h3>
              <p className="text-muted-foreground">
                {!hasApiKey 
                  ? "Set your OpenAI API key first, then fill out the form"
                  : "Fill out the form and click \"Generate Proposal\""}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

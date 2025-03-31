
import React, { useState } from 'react';
import ProposalForm, { ProposalFormData } from '@/components/ProposalForm';
import ProposalOutput from '@/components/ProposalOutput';
import { generateProposal } from '@/services/aiService';
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const [proposal, setProposal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<ProposalFormData | null>(null);

  const handleGenerate = async (formData: ProposalFormData) => {
    try {
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
        <h1 className="text-3xl font-bold text-primary mb-2">Proposal Generator</h1>
        <p className="text-lg text-muted-foreground">Create customized job proposals in seconds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProposalForm onGenerate={handleGenerate} isLoading={isLoading} />
        
        {proposal ? (
          <ProposalOutput 
            proposal={proposal} 
            onSave={handleSave} 
            onRegenerate={handleRegenerate} 
            isLoading={isLoading}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 border rounded-lg bg-muted/20">
              <h3 className="text-lg font-medium mb-2">Your proposal will appear here</h3>
              <p className="text-muted-foreground">
                Fill out the form on the left and click "Generate Proposal"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

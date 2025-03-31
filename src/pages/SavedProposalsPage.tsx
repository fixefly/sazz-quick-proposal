
import React, { useState, useEffect } from 'react';
import SavedProposals from '@/components/SavedProposals';
import { toast } from "sonner";

interface SavedProposal {
  id: string;
  content: string;
  date: string;
}

const SavedProposalsPage: React.FC = () => {
  const [proposals, setProposals] = useState<SavedProposal[]>([]);

  useEffect(() => {
    const savedProposals = JSON.parse(localStorage.getItem('savedProposals') || '[]');
    setProposals(savedProposals);
  }, []);

  const handleDelete = (id: string) => {
    const updatedProposals = proposals.filter(proposal => proposal.id !== id);
    setProposals(updatedProposals);
    localStorage.setItem('savedProposals', JSON.stringify(updatedProposals));
    toast.success("Proposal deleted successfully");
  };

  const handleLoad = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Proposal copied to clipboard!");
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Saved Proposals</h1>
        <p className="text-lg text-muted-foreground">Access your previously saved proposals</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <SavedProposals 
          proposals={proposals} 
          onDelete={handleDelete} 
          onLoad={handleLoad} 
        />
      </div>
    </div>
  );
};

export default SavedProposalsPage;

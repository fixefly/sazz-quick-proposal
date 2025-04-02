
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface ProposalOutputProps {
  proposal: string;
  onSave: (proposal: string) => void;
  onRegenerate: () => void;
  onNewProposal: () => void;
  isLoading?: boolean;
}

const ProposalOutput: React.FC<ProposalOutputProps> = ({ 
  proposal, 
  onSave, 
  onRegenerate,
  onNewProposal,
  isLoading = false 
}) => {
  const [editedProposal, setEditedProposal] = useState(proposal);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedProposal);
    toast.success("Proposal copied to clipboard!");
  };

  const handleSave = () => {
    onSave(editedProposal);
    toast.success("Proposal saved to favorites!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Custom Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          className="min-h-[300px] font-medium text-base whitespace-pre-wrap"
          value={editedProposal}
          onChange={(e) => setEditedProposal(e.target.value)}
          disabled={isLoading}
          style={{ lineHeight: "1.6" }}
        />
      </CardContent>
      <CardFooter className="flex justify-between gap-2 flex-wrap">
        <Button 
          variant="outline" 
          onClick={onRegenerate} 
          className="flex-1" 
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Regenerate"}
        </Button>
        <Button 
          variant="outline"
          onClick={onNewProposal}
          className="flex-1"
          disabled={isLoading}
        >
          New Proposal
        </Button>
        <Button 
          onClick={handleCopy} 
          variant="secondary" 
          className="flex-1"
          disabled={isLoading}
        >
          Copy
        </Button>
        <Button 
          onClick={handleSave} 
          className="flex-1"
          disabled={isLoading}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProposalOutput;

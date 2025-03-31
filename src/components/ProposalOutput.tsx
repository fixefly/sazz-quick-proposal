
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface ProposalOutputProps {
  proposal: string;
  onSave: (proposal: string) => void;
  onRegenerate: () => void;
}

const ProposalOutput: React.FC<ProposalOutputProps> = ({ proposal, onSave, onRegenerate }) => {
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
        <CardTitle className="text-xl font-semibold">Your Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          className="min-h-[300px] font-medium text-base"
          value={editedProposal}
          onChange={(e) => setEditedProposal(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button variant="outline" onClick={onRegenerate} className="flex-1">
          Regenerate
        </Button>
        <Button onClick={handleCopy} variant="secondary" className="flex-1">
          Copy
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProposalOutput;

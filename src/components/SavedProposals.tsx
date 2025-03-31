
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SavedProposalsProps {
  proposals: { id: string; content: string; date: string }[];
  onDelete: (id: string) => void;
  onLoad: (content: string) => void;
}

const SavedProposals: React.FC<SavedProposalsProps> = ({ proposals, onDelete, onLoad }) => {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Proposal copied to clipboard!");
  };

  if (proposals.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Saved Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            You don't have any saved proposals yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Saved Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="p-4">
                <div className="mb-2 text-sm text-muted-foreground">
                  {proposal.date}
                </div>
                <p className="mb-4 text-sm line-clamp-3">{proposal.content}</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onLoad(proposal.content)}
                  >
                    Load
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleCopy(proposal.content)}
                  >
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onDelete(proposal.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SavedProposals;

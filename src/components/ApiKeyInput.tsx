
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if API key is already stored
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      // Show dialog if no API key is found
      setIsOpen(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    // Validate that it looks like an OpenAI key (starts with "sk-")
    if (!apiKey.trim().startsWith('sk-')) {
      toast.error("Invalid API key format. OpenAI keys start with 'sk-'");
      return;
    }
    
    localStorage.setItem('openai_api_key', apiKey.trim());
    toast.success("API key saved successfully");
    setIsOpen(false);
    
    // Trigger storage event for cross-component communication
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    toast.info("API key removed");
    
    // Trigger storage event for cross-component communication
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {apiKey ? "Change API Key" : "Configure API Key"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to use ChatGPT for generating proposals. 
            Your key is stored securely in your browser and is not sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleRemoveKey} disabled={!apiKey}>
              Remove Key
            </Button>
            <Button onClick={handleSaveKey}>Save Key</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;

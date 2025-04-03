
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProposalFormProps {
  onGenerate: (formData: ProposalFormData) => void;
  isLoading: boolean;
}

export interface ProposalFormData {
  jobTitle: string;
  jobDescription: string;
  clientRequirements: string;
  yourExperience: string;
  tone: string;
  length: number;
  experienceType: string;
  communicationMethod: string;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<ProposalFormData>({
    jobTitle: '',
    jobDescription: '',
    clientRequirements: '',
    yourExperience: '',
    tone: 'professional',
    length: 150,
    experienceType: 'ui-ux',
    communicationMethod: 'call',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, length: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Job Details</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              placeholder="e.g. WordPress Developer Needed"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              name="jobDescription"
              placeholder="Paste the job description here..."
              rows={4}
              value={formData.jobDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceType">Relevant Experience</Label>
            <Select 
              value={formData.experienceType} 
              onValueChange={(value) => handleSelectChange('experienceType', value)}
            >
              <SelectTrigger id="experienceType">
                <SelectValue placeholder="Select your area of expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website Design and Development</SelectItem>
                <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                <SelectItem value="graphic-design">Graphic Design</SelectItem>
                <SelectItem value="logo-branding">Logo and Branding</SelectItem>
                <SelectItem value="cms">CMS Development (WordPress, Webflow, Framer, Wix)</SelectItem>
                <SelectItem value="webapp-mobile">Webapp and Mobile App Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yourExperience">Additional Details</Label>
            <Textarea
              id="yourExperience"
              name="yourExperience"
              placeholder="Any additional details about your experience"
              rows={3}
              value={formData.yourExperience}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={formData.tone} onValueChange={(value) => handleSelectChange('tone', value)}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="confident">Confident</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Preferred Communication Method</Label>
            <RadioGroup 
              value={formData.communicationMethod} 
              onValueChange={(value) => handleSelectChange('communicationMethod', value)}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="call" id="comm-call" />
                <Label htmlFor="comm-call" className="cursor-pointer">Call</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chat" id="comm-chat" />
                <Label htmlFor="comm-chat" className="cursor-pointer">Chat</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="length">Length (words): {formData.length}</Label>
            </div>
            <Slider
              id="length"
              min={100}
              max={300}
              step={25}
              value={[formData.length]}
              onValueChange={handleSliderChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Concise</span>
              <span>Detailed</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Proposal"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProposalForm;

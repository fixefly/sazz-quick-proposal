
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Settings {
  userName: string;
  userBio: string;
  conciseProposals: boolean;
  avoidBulletPoints: boolean;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    userName: 'Sazz',
    userBio: 'Experienced freelance developer specializing in web development and design.',
    conciseProposals: true,
    avoidBulletPoints: true,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    toast.success("Settings saved successfully");
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Settings</h1>
        <p className="text-lg text-muted-foreground">Customize your proposal generation preferences</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              This information will be used in your generated proposals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Your Name</Label>
              <Textarea
                id="userName"
                name="userName"
                value={settings.userName}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="userBio">Your Professional Bio</Label>
              <Textarea
                id="userBio"
                name="userBio"
                value={settings.userBio}
                onChange={handleChange}
                rows={4}
              />
              <p className="text-sm text-muted-foreground">
                This will be used as default experience if you don't specify project-specific experience
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Proposal Preferences</CardTitle>
            <CardDescription>
              Control how your proposals are generated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="conciseProposals">Concise Proposals</Label>
                <p className="text-sm text-muted-foreground">
                  Generate shorter, more focused proposals
                </p>
              </div>
              <Switch
                id="conciseProposals"
                checked={settings.conciseProposals}
                onCheckedChange={(checked) => handleSwitchChange('conciseProposals', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="avoidBulletPoints">Avoid Bullet Points</Label>
                <p className="text-sm text-muted-foreground">
                  Use paragraphs instead of bullet points in proposals
                </p>
              </div>
              <Switch
                id="avoidBulletPoints"
                checked={settings.avoidBulletPoints}
                onCheckedChange={(checked) => handleSwitchChange('avoidBulletPoints', checked)}
              />
            </div>

            <Button onClick={handleSave} className="w-full mt-4">
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;

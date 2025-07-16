import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, Settings, Bell, Volume2, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AccountPreferences = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    username: "JapanLearner",
    email: "user@example.com",
    difficulty: "intermediate",
    dailyGoal: 5,
    notifications: true,
    soundEffects: true,
    language: "english",
    autoCorrect: true
  });

  const handleSave = () => {
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Account Settings</h2>
        <p className="text-muted-foreground">Customize your Japanese learning experience</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Profile
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={settings.username}
                onChange={(e) => handleSettingChange("username", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange("email", e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Learning Preferences */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Learning Preferences
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                value={settings.difficulty}
                onValueChange={(value) => handleSettingChange("difficulty", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (初心者)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (中級者)</SelectItem>
                  <SelectItem value="advanced">Advanced (上級者)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailyGoal">Daily Challenge Goal</Label>
              <Select
                value={settings.dailyGoal.toString()}
                onValueChange={(value) => handleSettingChange("dailyGoal", parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 challenges</SelectItem>
                  <SelectItem value="5">5 challenges</SelectItem>
                  <SelectItem value="10">10 challenges</SelectItem>
                  <SelectItem value="15">15 challenges</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Interface Language</Label>
            <Select
              value={settings.language}
              onValueChange={(value) => handleSettingChange("language", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="japanese">日本語</SelectItem>
                <SelectItem value="spanish">Español</SelectItem>
                <SelectItem value="french">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* App Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          App Settings
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Daily Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get reminded to practice Japanese daily
              </p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Sound Effects
              </Label>
              <p className="text-sm text-muted-foreground">
                Play sounds for correct/incorrect answers
              </p>
            </div>
            <Switch
              checked={settings.soundEffects}
              onCheckedChange={(checked) => handleSettingChange("soundEffects", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-correct Suggestions</Label>
              <p className="text-sm text-muted-foreground">
                Show hints when your translation needs improvement
              </p>
            </div>
            <Switch
              checked={settings.autoCorrect}
              onCheckedChange={(checked) => handleSettingChange("autoCorrect", checked)}
            />
          </div>
        </div>
      </Card>

      {/* Study Goals */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Study Goals
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goals">Personal Learning Goals</Label>
            <Textarea
              id="goals"
              placeholder="What are your Japanese learning goals? (e.g., Pass JLPT N3, Read manga without translation, Travel to Japan...)"
              className="min-h-[100px]"
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="text-center">
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-warm transition-all px-8"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

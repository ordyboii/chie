import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/ChatInterface";
import { Leaderboard } from "@/components/Leaderboard";
import { AccountPreferences } from "@/components/AccountPreferences";
import { MessageCircle, Trophy, Settings } from "lucide-react";
import chieMascot from "@/assets/chie-mascot.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={chieMascot}
                alt="Chie the kitsune"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">Chie</h1>
                <p className="text-xs text-muted-foreground">Japanese Learning Companion</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-foreground">Today's Progress</div>
              <div className="text-xs text-muted-foreground">3/5 challenges completed</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 h-[calc(100vh-120px)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-card shadow-soft">
            <TabsTrigger
              value="chat"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with Chie
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="h-[calc(100%-60px)]">
            <TabsContent value="chat" className="h-full mt-0">
              <div className="bg-card rounded-lg shadow-soft h-full overflow-hidden">
                <ChatInterface />
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="h-full mt-0">
              <div className="bg-card rounded-lg shadow-soft h-full overflow-y-auto">
                <Leaderboard />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="h-full mt-0">
              <div className="bg-card rounded-lg shadow-soft h-full overflow-y-auto">
                <AccountPreferences />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;


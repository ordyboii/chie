import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Star } from "lucide-react";
import chieMascot from "@/assets/chie-mascot.jpg";

interface Message {
  id: string;
  type: "user" | "chie";
  content: string;
  similarity?: number;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "chie",
      content: "こんにちは！I'm Chie, your Japanese learning companion! 🦊 Ready for today's translation challenge? Here's a headline from NHK Easy News:\n\n「大学生が新しいロボットを作りました」\n\nCan you translate this into English?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    // Simulate Chie's response with similarity scoring
    const chieResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "chie",
      content: "Great effort! 🌟\n\nYour translation: \"" + inputValue + "\"\nCorrect translation: \"University students created a new robot\"\n\nSimilarity score: 85%\n\nYou're doing wonderfully! The key phrase '大学生' means 'university students' and '作りました' is the past tense of 'to make/create'. Keep practicing! 頑張って！",
      similarity: 85,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, chieResponse]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"} gap-3`}>
              {message.type === "chie" && (
                <div className="flex-shrink-0">
                  <img
                    src={chieMascot}
                    alt="Chie the kitsune"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                  />
                </div>
              )}

              <Card className={`p-4 ${message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card shadow-soft"
                }`}>
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>

                  {message.similarity && (
                    <div className="flex items-center gap-2 pt-2 border-t border-border/20">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-muted-foreground">
                        Similarity: {message.similarity}%
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t bg-card p-4">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your translation here..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-warm transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

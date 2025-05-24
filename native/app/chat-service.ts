import { MessageType } from "@/components/ChatMessage";

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Sample NHK news content for our demo
const sampleNhkNews = [
  {
    id: "1",
    text: "東京で桜が満開になりました。多くの人が花見を楽しんでいます。",
    translation:
      "The cherry blossoms are in full bloom in Tokyo. Many people are enjoying hanami (cherry blossom viewing).",
  },
  {
    id: "2",
    text: "日本の新しい宇宙飛行士が国際宇宙ステーションに行きます。",
    translation:
      "A new Japanese astronaut will go to the International Space Station.",
  },
  {
    id: "3",
    text: "京都で伝統的な祭りが行われました。多くの観光客が訪れました。",
    translation:
      "A traditional festival was held in Kyoto. Many tourists visited.",
  },
];

// Initial greeting messages
const initialMessages: MessageType[] = [
  {
    id: generateId(),
    content: "こんにちは！私は狐の千恵です。日本語を教えるお手伝いをします！",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: generateId(),
    content: "Hello! I'm Chie the Fox. I'll help you learn Japanese!",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 1),
  },
];

let currentNews = sampleNhkNews[0];
let waitingForTranslation = false;
let messages = [...initialMessages];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const chatService = {
  // Get all messages
  getMessages: () => [...messages],

  // Send a message from the user
  sendMessage: async (text: string): Promise<MessageType> => {
    const userMessage: MessageType = {
      id: generateId(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    };

    messages.push(userMessage);

    // If we're waiting for a translation from the user
    if (waitingForTranslation) {
      waitingForTranslation = false;

      // Add slight delay to simulate processing
      await delay(1000);

      // Simulate checking the translation
      const responseMessage: MessageType = {
        id: generateId(),
        content: "Good attempt! Let me show you the correct translation:",
        sender: "bot",
        timestamp: new Date(),
        isTranslationResponse: true,
        originalText: currentNews.text,
        translatedText: currentNews.translation,
      };

      messages.push(responseMessage);

      // Add follow-up message
      await delay(1500);
      const followUpMessage: MessageType = {
        id: generateId(),
        content: "Would you like to practice with another news article?",
        sender: "bot",
        timestamp: new Date(),
      };

      messages.push(followUpMessage);

      return followUpMessage;
    }

    // Process normal message
    await delay(800);

    // Check for specific keywords
    if (
      text.toLowerCase().includes("news") ||
      text.toLowerCase().includes("practice") ||
      text.toLowerCase().includes("translate") ||
      text.toLowerCase().includes("yes")
    ) {
      // Pick a random news item
      currentNews =
        sampleNhkNews[Math.floor(Math.random() * sampleNhkNews.length)];
      waitingForTranslation = true;

      const responseMessage: MessageType = {
        id: generateId(),
        content:
          "Here's today's news from NHK Easy. Try to translate it to English:",
        sender: "bot",
        timestamp: new Date(),
        isTranslationRequest: true,
        originalText: currentNews.text,
      };

      messages.push(responseMessage);
      return responseMessage;
    }

    // Default response
    const responseMessage: MessageType = {
      id: generateId(),
      content:
        "I'm here to help you learn Japanese! Would you like to practice translation with today's news?",
      sender: "bot",
      timestamp: new Date(),
    };

    messages.push(responseMessage);
    return responseMessage;
  },

  // Reset the conversation
  resetConversation: () => {
    messages = [...initialMessages];
    waitingForTranslation = false;
    return messages;
  },
};

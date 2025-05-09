import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import constants from "expo-constants";

export default function HomeScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      // 1. Add the user's message to the chat
      const newUserMessage = { text: inputText, sender: "user" };
      setMessages((previousMessages) => [...previousMessages, newUserMessage]);
      setInputText("");

      // 2. Simulate the chatbot sending a phrase to translate (replace with actual API call)
      setTimeout(() => {
        const botPhrase = generateRandomPhrase(); // Replace with your logic
        const newBotMessage = {
          text: `Translate this: "${botPhrase}"`,
          sender: "bot",
        };
        setMessages((previousMessages) => [...previousMessages, newBotMessage]);
      }, 1000); // Simulate a slight delay
    }
  };

  const generateRandomPhrase = () => {
    // Replace this with your actual logic to fetch phrases
    const phrases = ["Hello world", "How are you?", "Thank you very much"];
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Translation Bot</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Send chat"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.expoConfig!.extra?.colours.primary,
  },
  topBar: {
    backgroundColor: constants.expoConfig!.extra?.colours.primary, // Slack-like purple
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2e0a2e",
  },
  topBarTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  messageArea: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: "#dcf8c6", // Light green for user messages
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007bff", // Blue send button
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

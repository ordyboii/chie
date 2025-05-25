import Icon from "@expo/vector-icons/Feather";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialMessages = [
	{
		_id: 1,
		text: "Welcome to the chat!",
		createdAt: new Date(),
		system: true,
	},
	{
		_id: 2,
		text: "Hello everyone!",
		createdAt: new Date(),
		user: {
			_id: "user1",
			name: "Sensei Chie",
		},
	},
	{
		_id: 3,
		text: "Hi Sensei!",
		createdAt: new Date(),
		user: {
			_id: "user2",
			name: "Student1",
		},
	},
];

const ChatMessage = ({
	message,
}: {
	message: {
		_id: number;
		system: boolean;
		text: string;
		createdAt: Date;
		user: { _id: string; name: string };
	};
}) => {
	if (message.system) {
		return (
			<View style={styles.systemMessageContainer}>
				<Text style={styles.systemMessageText}>{message.text}</Text>
			</View>
		);
	}

	const isCurrentUser = message.user._id === "user1"; // Replace with actual user ID check

	return (
		<View
			style={[
				styles.messageContainer,
				isCurrentUser ? styles.sentMessage : styles.receivedMessage,
			]}
		>
			{!isCurrentUser && (
				<Text style={styles.senderName}>{message.user.name}</Text>
			)}
			<View
				style={[
					styles.messageBubble,
					isCurrentUser ? styles.sentBubble : styles.receivedBubble,
				]}
			>
				<Text
					style={[
						styles.messageText,
						isCurrentUser ? styles.sentText : styles.receivedText,
					]}
				>
					{message.text}
				</Text>
			</View>
			<Text style={styles.messageTime}>
				{new Date(message.createdAt).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</Text>
		</View>
	);
};

function ChatInput({
	onSendMessage,
}: {
	onSendMessage: (text: string) => void;
}) {
	const [text, setText] = useState("");
	const inputRef = useRef<TextInput>(null);

	const handleSend = () => {
		if (text.trim()) {
			onSendMessage(text);
			setText("");
			if (inputRef.current) {
				inputRef.current.focus();
			}
		}
	};

	return (
		<View style={styles.inputContainer}>
			<TextInput
				ref={inputRef}
				style={styles.input}
				placeholder="Type your message..."
				value={text}
				onChangeText={setText}
				onSubmitEditing={handleSend}
				returnKeyType="send"
				placeholderTextColor="#9ca3af"
				multiline
			/>
			<TouchableOpacity style={styles.sendButton} onPress={handleSend}>
				<Icon
					name="send"
					size={24}
					color="#fff"
					style={{ transform: [{ rotate: "-90deg" }] }}
				/>
			</TouchableOpacity>
		</View>
	);
}

function ChatHeader({ title, onBack }: { title: string; onBack?: () => void }) {
	return (
		<View style={styles.header}>
			{onBack && (
				<TouchableOpacity style={styles.backButton} onPress={onBack}>
					<Icon name="chevron-left" size={24} color="#fff" />
				</TouchableOpacity>
			)}
			<Text style={styles.headerTitle}>{title}</Text>
		</View>
	);
}

export default function ChatScreen() {
	const [messages, setMessages] = useState(initialMessages);
	// const [loading, setLoading] = useState(false);
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	console.log(keyboardHeight);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			(event) => setKeyboardHeight(event.endCoordinates.height),
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => setKeyboardHeight(0),
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	const handleSendMessage = useCallback((text: string) => {
		const newMessage = {
			_id: Date.now(),
			text,
			createdAt: new Date(),
			user: {
				_id: "user1", // Replace with actual user ID
				name: "You", // Or get the user's name
			},
		};
		setMessages((prevMessages) => [...prevMessages, newMessage]);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ChatHeader title="Sensei Chie's Chat" />
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: "#f5f5dc" }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust as needed
			>
				<FlatList
					data={messages}
					renderItem={({ item }) => <ChatMessage message={item} />}
					keyExtractor={(item) => item._id.toString()}
					inverted
					style={styles.messageList}
					contentContainerStyle={{
						paddingBottom: 20 + keyboardHeight, // Adjust for keyboard height
					}}
				/>
				{Platform.OS === "android" && (
					<View style={{ height: keyboardHeight }} /> // Add empty view for Android
				)}
				<ChatInput onSendMessage={handleSendMessage} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1F2937", // Dark background
		fontFamily: Platform.select({
			android: "NotoSans_400Regular",
			ios: "NotoSans-Regular",
		}),
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: "#1F2937", // Darker header
		borderBottomWidth: 1,
		borderBottomColor: "#374151", // Darker border
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		fontFamily: "Inter_600SemiBold",
	},
	backButton: {
		marginRight: 12,
	},
	messageList: {
		flex: 1,
		paddingHorizontal: 10,
	},
	messageContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginVertical: 4,
	},
	sentMessage: {
		justifyContent: "flex-end",
	},
	receivedMessage: {
		justifyContent: "flex-start",
	},
	messageBubble: {
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 10,
		maxWidth: "75%",
	},
	sentBubble: {
		backgroundColor: "#4CAF50", // Green for sent messages
		borderBottomRightRadius: 4,
	},
	receivedBubble: {
		backgroundColor: "#374151", // Dark grey for received
		borderBottomLeftRadius: 4,
	},
	messageText: {
		fontSize: 16,
		fontFamily: "Inter_400Regular",
	},
	sentText: {
		color: "#fff",
	},
	receivedText: {
		color: "#fff",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingVertical: 8,
		backgroundColor: "#1F2937",
		borderTopWidth: 1,
		borderTopColor: "#374151",
	},
	input: {
		flex: 1,
		backgroundColor: "#374151", // Dark input background
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 10,
		marginRight: 10,
		fontSize: 16,
		color: "#fff",
		fontFamily: "Inter_400Regular",
		maxHeight: 150, // Limit the height of the input
	},
	sendButton: {
		backgroundColor: "#4CAF50", // Green send button
		borderRadius: 24,
		padding: 12,
	},
	senderName: {
		fontSize: 12,
		color: "#9ca3af",
		marginBottom: 2,
		marginHorizontal: 8,
		fontFamily: "Inter_600SemiBold",
	},
	messageTime: {
		fontSize: 12,
		color: "#9ca3af",
		marginHorizontal: 8,
		fontFamily: "Inter_400Regular",
	},
	systemMessageContainer: {
		alignItems: "center",
		marginVertical: 8,
	},
	systemMessageText: {
		fontSize: 14,
		color: "#9ca3af",
		fontStyle: "italic",
		fontFamily: "Inter_400Regular",
		backgroundColor: "#374151",
		padding: 8,
		borderRadius: 16,
	},
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#111827",
	},
});

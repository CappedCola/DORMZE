import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { Profile } from '@/types/profile';
import { mockProfiles } from '@/data/mockProfiles'; // Import mock profiles

// Define a Message type
interface Message {
  id: string;
  text: string;
  senderId: string; // 'currentUser' or the profile ID of the other user
  timestamp: number;
}

// Mock messages (replace with actual data fetching later)
const getMockMessages = (profileId: string): Message[] => {
  // Simple mock data based on profile ID
  if (profileId === '1') {
    return [
      {
        id: 'm1',
        text: 'Hey Sarah! Saw we matched. Nice climbing pics!',
        senderId: 'currentUser',
        timestamp: Date.now() - 100000,
      },
      {
        id: 'm2',
        text: 'Hey! Thanks :) You too! You study CS as well, right?',
        senderId: '1',
        timestamp: Date.now() - 90000,
      },
      {
        id: 'm3',
        text: 'Yeah, junior year. How about you?',
        senderId: 'currentUser',
        timestamp: Date.now() - 80000,
      },
      {
        id: 'm4',
        text: 'Same here! Small world. Maybe we have classes together?',
        senderId: '1',
        timestamp: Date.now() - 70000,
      },
    ];
  } else if (profileId === '2') {
    return [
      {
        id: 'm5',
        text: "What's up Michael? Cool tech setup.",
        senderId: 'currentUser',
        timestamp: Date.now() - 50000,
      },
      {
        id: 'm6',
        text: 'Thanks! Always tinkering. You into gaming?',
        senderId: '2',
        timestamp: Date.now() - 40000,
      },
    ];
  }
  return []; // Return empty for other IDs
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Find the matched profile from mock data
    const profile = mockProfiles.find((p) => p.id === id);
    setMatchedProfile(profile || null);
    // Load initial mock messages
    if (id) {
      setMessages(getMockMessages(id));
    }
  }, [id]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text: inputText.trim(),
      senderId: 'currentUser', // Assume current user sends
      timestamp: Date.now(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');

    // Removed the automated reply code
  }, [inputText]);

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isCurrentUser = item.senderId === 'currentUser';
    return (
      <View
        style={[
          styles.messageBubble,
          isCurrentUser
            ? [
                styles.currentUserBubble,
                { backgroundColor: themeColors.primary },
              ]
            : [
                styles.otherUserBubble,
                { backgroundColor: themeColors.inputBackground },
              ],
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isCurrentUser
              ? styles.currentUserText
              : { color: themeColors.text },
          ]}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  if (!matchedProfile) {
    // Optional: Add a loading state or error message
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: themeColors.background },
        ]}
      >
        <Text style={{ color: themeColors.text }}>Loading chat...</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={themeColors.primary} />
        </TouchableOpacity>
        <Image
          source={{ uri: matchedProfile.photos[0].url }}
          style={styles.headerAvatar}
        />
        <Text style={[styles.headerName, { color: themeColors.text }]}>
          {matchedProfile.name}
        </Text>
      </View>

      {/* Main content area with KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Message List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          // Removed inverted prop to show messages in correct order
        />

        {/* Input Area */}
        <View
          style={[
            styles.inputContainer,
            { borderTopColor: themeColors.border },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.inputBackground,
                color: themeColors.text,
                borderColor: themeColors.border,
              },
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={themeColors.secondaryText}
            multiline
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={[
              styles.sendButton,
              { backgroundColor: themeColors.primary },
            ]}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 0, // Provide space for status bar on iOS
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageListContent: {
    paddingVertical: 16,
    flexGrow: 1,
    justifyContent: 'flex-start', // Align messages from top to bottom
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
  },
  currentUserBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  otherUserBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  currentUserText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120, // Limit multiline height
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

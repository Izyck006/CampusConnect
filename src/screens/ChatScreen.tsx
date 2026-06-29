import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';

// EXACT SAME IP AS YOUR AUTH SCREEN
const SERVER_URL = 'http://192.168.0.199:5000';

interface Message {
  _id?: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt?: string;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setupChat();
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const setupChat = async () => {
    try {
      // 1. Get the user from the saved Token
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const decoded = jwtDecode(token);
        setCurrentUser((decoded as any).user);
      }

      // 2. Fetch the message history from MongoDB
      const response = await fetch(`${SERVER_URL}/api/v3/sa/chat/history/Group%207`);
      const history = await response.json();
      setMessages(history);

      // 3. Connect the live WebSocket
      socketRef.current = io(SERVER_URL);
      
      socketRef.current.emit('join_room', 'Group 7');

      socketRef.current.on('receive_message', (newMessage: Message) => {
        setMessages((prev) => [...prev, newMessage]);
      });

    } catch (error) {
      console.error('Error setting up chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = () => {
    if (!inputText.trim() || !currentUser) return;

    const messageData = {
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: inputText.trim(),
      room: 'Group 7'
    };

    // Broadcast to everyone else
    socketRef.current?.emit('send_message', messageData);
    
    // Add to our own screen instantly
    setMessages((prev) => [...prev, messageData]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = currentUser?.id === item.senderId;
    return (
      <View style={[styles.messageBubble, isMe ? styles.myMessage : styles.theirMessage]}>
        {!isMe && <Text style={styles.senderName}>{item.senderName}</Text>}
        <Text style={[styles.messageText, isMe ? styles.myMessageText : {}]}>{item.text}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#33691E" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message Group 7..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { padding: 15 },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  myMessage: {
    backgroundColor: '#33691E',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  senderName: { fontSize: 12, color: '#757575', marginBottom: 4, fontWeight: '600' },
  messageText: { fontSize: 15, color: '#333333' },
  myMessageText: { color: '#FFFFFF' },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#33691E',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sendButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
});

export default ChatScreen;
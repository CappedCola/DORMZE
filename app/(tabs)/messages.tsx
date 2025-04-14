import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { useStore } from '@/store/useStore';

export default function MessagesScreen() {
  const { matches } = useStore();

  const renderItem = ({ item: profile }) => (
    <Pressable style={styles.matchItem}>
      <Image source={{ uri: profile.photos[0] }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.preview}>Tap to start chatting!</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    padding: 16,
    paddingTop: 60,
  },
  list: {
    padding: 16,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    marginLeft: 12,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  preview: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
});
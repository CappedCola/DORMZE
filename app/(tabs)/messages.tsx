import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { useStore } from '@/store/useStore';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/styles/theme';
import { Profile } from '@/types/profile';
import { router } from 'expo-router';

export default function MessagesScreen() {
  const { matches } = useStore();
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const navigateToChat = (profileId: string) => {
    router.push(`/chat/${profileId}`);
  };

  const renderItem = ({ item: profile }: { item: Profile }) => (
    <Pressable
      style={[styles.matchItem, { borderBottomColor: themeColors.border }]}
      onPress={() => navigateToChat(profile.id)}
    >
      <Image source={{ uri: profile.photos[0].url }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={[styles.name, { color: themeColors.text }]}>
          {profile.name}
        </Text>
        <Text style={[styles.preview, { color: themeColors.secondaryText }]}>
          Tap to start chatting!
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>Messages</Text>
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
  },
});

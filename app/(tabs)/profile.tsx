import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProfile } from '@/context/ProfileContext';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/styles/theme';

export default function ProfileScreen() {
  const { profile } = useProfile();
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === profile.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? profile.photos.length - 1 : prev - 1
    );
  };

  const handleEditPress = () => {
    router.push('/edit-profile');
  };

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <Text style={[styles.title, { color: themeColors.text }]}>
          My Profile
        </Text>
        <Pressable
          style={[
            styles.settingsButton,
            { backgroundColor: themeColors.primary },
          ]}
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.photoContainer}>
        <Image
          source={{ uri: profile.photos[currentPhotoIndex].url }}
          style={styles.profileImage}
        />
        <View style={styles.photoControls}>
          <TouchableOpacity onPress={prevPhoto} style={styles.photoButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextPhoto} style={styles.photoButton}>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.photoIndicators}>
          {profile.photos.map((photo, index) => (
            <View
              key={`profile-photo-${index}`}
              style={[
                styles.photoIndicator,
                index === currentPhotoIndex && styles.photoIndicatorActive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { color: themeColors.text }]}>
            {profile.name}{' '}
            <Text style={[styles.age, { color: themeColors.secondaryText }]}>
              {profile.age}
            </Text>
          </Text>
          <Pressable
            style={[
              styles.editButton,
              { backgroundColor: themeColors.primary },
            ]}
            onPress={handleEditPress}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
        </View>
        <Text style={[styles.occupation, { color: themeColors.secondaryText }]}>
          {profile.occupation}
        </Text>

        <View
          style={[styles.section, { borderBottomColor: themeColors.border }]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            About Me
          </Text>
          <Text style={[styles.bio, { color: themeColors.secondaryText }]}>
            {profile.bio}
          </Text>
        </View>

        <View
          style={[styles.section, { borderBottomColor: themeColors.border }]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Education
          </Text>
          <Text style={[styles.detail, { color: themeColors.secondaryText }]}>
            {profile.university}
          </Text>
          <Text style={[styles.detail, { color: themeColors.secondaryText }]}>
            {profile.major} • {profile.year}
          </Text>
        </View>

        <View
          style={[styles.section, { borderBottomColor: themeColors.border }]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Interests
          </Text>
          <View style={styles.interestsContainer}>
            {profile.interests.map((interest, index) => (
              <View
                key={`profile-interest-${interest}-${index}`}
                style={[
                  styles.interestTag,
                  { backgroundColor: themeColors.inputBackground },
                ]}
              >
                <Text
                  style={[styles.interestText, { color: themeColors.primary }]}
                >
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Lifestyle
          </Text>
          <Text style={[styles.detail, { color: themeColors.secondaryText }]}>
            {profile.lifestyle.smoking ? 'Smoker' : 'Non-smoker'}
          </Text>
          <Text style={[styles.detail, { color: themeColors.secondaryText }]}>
            {profile.lifestyle.pets ? 'Pet friendly' : 'No pets'}
          </Text>
          <Text style={[styles.detail, { color: themeColors.secondaryText }]}>
            {profile.lifestyle.sleepSchedule === 'early_bird'
              ? 'Early Bird'
              : 'Night Owl'}
          </Text>
          <Text style={[styles.detail, { color: themeColors.secondaryText }]}>
            Personality:{' '}
            {profile.lifestyle.personality === 'introvert'
              ? 'Introvert'
              : profile.lifestyle.personality === 'extrovert'
              ? 'Extrovert'
              : 'Ambivert'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
  },
  settingsButton: {
    padding: 10,
    borderRadius: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editButtonText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
  photoContainer: {
    position: 'relative',
    height: 300,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  photoControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  photoButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  photoIndicators: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  photoIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  photoIndicatorActive: {
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
  },
  age: {
    fontFamily: 'Inter_400Regular',
  },
  occupation: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginBottom: 8,
  },
  bio: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  detail: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginBottom: 4,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});

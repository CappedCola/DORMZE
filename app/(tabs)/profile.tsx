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

export default function ProfileScreen() {
  const { profile } = useProfile();
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Pressable style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>Edit</Text>
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
        <Text style={styles.photoCaption}>
          {profile.photos[currentPhotoIndex].caption}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>
          {profile.name} <Text style={styles.age}>{profile.age}</Text>
        </Text>
        <Text style={styles.occupation}>{profile.occupation}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.detail}>{profile.university}</Text>
          <Text style={styles.detail}>
            {profile.major} • {profile.year}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {profile.interests.map((interest, index) => (
              <View
                key={`profile-interest-${interest}-${index}`}
                style={styles.interestTag}
              >
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lifestyle</Text>
          <Text style={styles.detail}>
            {profile.lifestyle.smoking ? 'Smoker' : 'Non-smoker'}
          </Text>
          <Text style={styles.detail}>
            {profile.lifestyle.pets ? 'Pet friendly' : 'No pets'}
          </Text>
          <Text style={styles.detail}>
            {profile.lifestyle.sleepSchedule === 'early_bird'
              ? 'Early Bird'
              : 'Night Owl'}
          </Text>
          <Text style={styles.detail}>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
  },
  editButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
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
  photoCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    marginBottom: 4,
  },
  age: {
    color: '#6B7280',
  },
  occupation: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginBottom: 8,
  },
  bio: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  detail: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 4,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    color: '#2563EB',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
});

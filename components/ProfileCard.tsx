import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Profile } from '@/types/profile';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface ProfileCardProps {
  profile: Profile;
  isActive: boolean;
  style?: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

export function ProfileCard({ profile, isActive, style }: ProfileCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isActive ? 1 : 0.9),
      },
    ],
    opacity: withSpring(isActive ? 1 : 0.7),
  }));

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

  return (
    <Animated.View style={[styles.card, animatedStyle, style]}>
      <View style={styles.photoContainer}>
        <Image
          source={{ uri: profile.photos[currentPhotoIndex].url }}
          style={styles.image}
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
              key={`${profile.id}-photo-${index}`}
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
      <ScrollView style={styles.info}>
        <Text style={styles.name}>
          {profile.name} <Text style={styles.age}>{profile.age}</Text>
        </Text>
        <Text style={styles.university}>{profile.university}</Text>
        <Text style={styles.major}>
          {profile.major} • {profile.year}
        </Text>

        <Text style={styles.bio}>{profile.bio}</Text>

        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.detailedText}>{profile.detailedBio.aboutMe}</Text>

        <Text style={styles.sectionTitle}>Looking For</Text>
        <Text style={styles.detailedText}>
          {profile.detailedBio.lookingFor}
        </Text>

        <Text style={styles.sectionTitle}>Roommate Preferences</Text>
        <Text style={styles.detailedText}>
          {profile.detailedBio.roommatePreferences}
        </Text>

        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          {profile.interests.map((interest, index) => (
            <View
              key={`${profile.id}-interest-${interest}-${index}`}
              style={styles.interestTag}
            >
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Lifestyle</Text>
        <View style={styles.lifestyleContainer}>
          <View style={styles.lifestyleItem}>
            <Text style={styles.lifestyleLabel}>Cleanliness</Text>
            <Text style={styles.lifestyleValue}>
              {'★'.repeat(profile.lifestyle.cleanliness)}
              {'☆'.repeat(5 - profile.lifestyle.cleanliness)}
            </Text>
          </View>
          <View style={styles.lifestyleItem}>
            <Text style={styles.lifestyleLabel}>Schedule</Text>
            <Text style={styles.lifestyleValue}>
              {profile.lifestyle.sleepSchedule === 'early_bird'
                ? '🌅 Early Bird'
                : '🌙 Night Owl'}
            </Text>
          </View>
          <View style={styles.lifestyleItem}>
            <Text style={styles.lifestyleLabel}>Personality</Text>
            <Text style={styles.lifestyleValue}>
              {profile.lifestyle.personality === 'introvert'
                ? '🤔 Introvert'
                : profile.lifestyle.personality === 'extrovert'
                ? '🎉 Extrovert'
                : '🤝 Ambivert'}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Move-in Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>
            🗓 Available from:{' '}
            {new Date(profile.moveInDate).toLocaleDateString()}
          </Text>
          <Text style={styles.detailsText}>
            💰 Budget: {profile.budget.preferredRange}
          </Text>
          <Text style={styles.detailsText}>
            📍 Location: {profile.location.preferred} (within{' '}
            {profile.location.maxDistance} miles)
          </Text>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'center',
    maxHeight: SCREEN_WIDTH * 1.5,
  },
  photoContainer: {
    position: 'relative',
    height: 400,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  info: {
    padding: 16,
    maxHeight: SCREEN_WIDTH,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    marginBottom: 4,
  },
  age: {
    color: '#6B7280',
  },
  university: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 2,
  },
  major: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  detailedText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
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
  lifestyleContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  lifestyleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lifestyleLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  lifestyleValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  detailsContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  detailsText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
});

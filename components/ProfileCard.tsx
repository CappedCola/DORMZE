import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Profile } from '@/types/profile';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/styles/theme';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';

interface ProfileCardProps {
  profile: Profile;
  isActive: boolean;
  style?: any;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

export function ProfileCard({ profile, isActive, style }: ProfileCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { theme, isDark } = useTheme();
  const themeColors = colors[theme];
  const [isExpanded, setIsExpanded] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [cachedPhotos, setCachedPhotos] = useState<{ [key: string]: string }>(
    {}
  );

  // Cache images for better performance
  useEffect(() => {
    const cacheImages = async () => {
      if (!profile.photos || profile.photos.length === 0) return;

      const newCachedPhotos: { [key: string]: string } = {};

      for (const photo of profile.photos) {
        const filename = photo.url.split('/').pop();
        const path = `${FileSystem.cacheDirectory}${filename}`;

        // Check if file already exists in cache
        const fileInfo = await FileSystem.getInfoAsync(path);

        if (fileInfo.exists) {
          // Use cached file
          newCachedPhotos[photo.url] = path;
        } else {
          // Download file to cache
          try {
            const downloadResult = await FileSystem.downloadAsync(
              photo.url,
              path
            );

            if (downloadResult.status === 200) {
              newCachedPhotos[photo.url] = path;
            } else {
              // Fallback to original URL if download fails
              newCachedPhotos[photo.url] = photo.url;
            }
          } catch (e) {
            // Fallback to original URL if download fails
            newCachedPhotos[photo.url] = photo.url;
          }
        }
      }

      setCachedPhotos(newCachedPhotos);
    };

    cacheImages();
  }, [profile.photos]);

  // Define dynamic text styles based on theme
  const cardTextStyle = {
    nameAge: { color: isDark ? 'white' : themeColors.text },
    university: { color: isDark ? 'white' : themeColors.text },
    major: { color: isDark ? '#bdc3c7' : themeColors.secondaryText },
    bio: { color: isDark ? '#ecf0f1' : themeColors.text },
    expandedNameAge: { color: isDark ? 'white' : themeColors.text },
    expandedUniversity: { color: isDark ? 'white' : themeColors.text },
    expandedMajor: { color: isDark ? '#bdc3c7' : themeColors.secondaryText },
    expandedBio: { color: isDark ? '#ecf0f1' : themeColors.text },
    expandedSectionTitle: { color: isDark ? 'white' : themeColors.text },
    expandedDetailedText: { color: isDark ? '#ecf0f1' : themeColors.text },
    expandedLifestyleLabel: {
      color: isDark ? '#bdc3c7' : themeColors.secondaryText,
    },
    expandedLifestyleValue: { color: isDark ? 'white' : themeColors.text },
    expandedDetailsText: { color: isDark ? '#ecf0f1' : themeColors.text },
    expandedHeaderTitle: { color: isDark ? 'white' : themeColors.text },
    aboutMePreviewTitle: { color: isDark ? 'white' : themeColors.text },
    aboutMePreviewText: { color: isDark ? '#ecf0f1' : themeColors.text },
    readMoreButtonText: { color: '#3498db' },
  };

  const cardStyleAnimated = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isActive ? 1 : 0.9, {
          damping: 20,
          stiffness: 90,
        }),
      },
    ],
    opacity: withSpring(isActive ? 1 : 0.7, {
      damping: 20,
      stiffness: 90,
    }),
  }));

  const nextPhoto = () => {
    setImageLoading(true);
    setCurrentPhotoIndex((prev) =>
      prev === profile.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setImageLoading(true);
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? profile.photos.length - 1 : prev - 1
    );
  };

  // Limit interests to 4 for display on the card
  const displayedInterests = profile.interests.slice(0, 4);

  const handleExpandProfile = () => {
    setIsExpanded(true);
  };

  const handleCloseDetail = () => {
    setIsExpanded(false);
  };

  // Card view (collapsed state)
  const renderCardView = () => (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#0e1621' : themeColors.card,
          shadowColor: isDark ? '#000' : '#000',
        },
        cardStyleAnimated,
        style,
      ]}
    >
      <View style={styles.photoContainer}>
        {imageLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={themeColors.primary} />
          </View>
        )}
        <Image
          source={{
            uri:
              cachedPhotos[profile.photos[currentPhotoIndex]?.url] ||
              profile.photos[currentPhotoIndex]?.url,
          }}
          style={styles.image}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />

        {/* Gradient overlay for text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
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
      </View>

      {/* Wrap content below photo in ScrollView */}
      <ScrollView
        style={styles.contentScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameAge, cardTextStyle.nameAge]}>
              {profile.name}, {profile.age}
            </Text>

            {/* Add view profile button next to name */}
            <TouchableOpacity
              style={styles.inlineExpandButton}
              onPress={handleExpandProfile}
              activeOpacity={0.7}
            >
              <Ionicons
                name="information-circle-outline"
                size={26}
                color={isDark ? '#3498db' : themeColors.primary}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.university, cardTextStyle.university]}>
            {profile.university}
          </Text>
          <Text style={[styles.major, cardTextStyle.major]}>
            {profile.major} {'\u2022'} {profile.year}
          </Text>
        </View>

        {/* Short Bio */}
        <Text style={[styles.bio, cardTextStyle.bio]}>{profile.bio}</Text>
      </ScrollView>
    </Animated.View>
  );

  // Expanded view (full profile)
  const renderExpandedView = () => (
    <Modal
      visible={isExpanded}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCloseDetail}
    >
      <SafeAreaView
        style={[
          styles.expandedContainer,
          { backgroundColor: isDark ? '#0e1621' : themeColors.background },
        ]}
      >
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

        {/* Header with back button */}
        <View
          style={[
            styles.expandedHeader,
            { backgroundColor: isDark ? '#1a2735' : themeColors.card },
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseDetail}
          >
            <Ionicons
              name="close"
              size={28}
              color={isDark ? 'white' : themeColors.text}
            />
          </TouchableOpacity>
          <View style={styles.expandedHeaderTitleContainer}>
            <Text
              style={[
                styles.expandedHeaderTitle,
                cardTextStyle.expandedHeaderTitle,
              ]}
            >
              {profile.name}'s Profile
            </Text>
            <View
              style={[
                styles.fullProfileBadge,
                {
                  backgroundColor: isDark
                    ? 'rgba(52, 152, 219, 0.2)'
                    : 'rgba(52, 152, 219, 0.15)',
                  borderColor: isDark ? '#3498db' : themeColors.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.fullProfileText,
                  {
                    color: isDark ? '#3498db' : themeColors.primary,
                  },
                ]}
              >
                Full Profile
              </Text>
            </View>
          </View>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={styles.expandedScrollView}
        >
          {/* Profile Photo */}
          <View style={styles.expandedPhotoContainer}>
            {imageLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={themeColors.primary} />
              </View>
            )}
            <Image
              source={{
                uri:
                  cachedPhotos[profile.photos[currentPhotoIndex]?.url] ||
                  profile.photos[currentPhotoIndex]?.url,
              }}
              style={styles.expandedImage}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
            />

            <View style={styles.expandedPhotoControls}>
              <TouchableOpacity onPress={prevPhoto} style={styles.photoButton}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={nextPhoto} style={styles.photoButton}>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.expandedPhotoIndicators}>
              {profile.photos.map((photo, index) => (
                <View
                  key={`expanded-${profile.id}-photo-${index}`}
                  style={[
                    styles.photoIndicator,
                    index === currentPhotoIndex && styles.photoIndicatorActive,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Profile Info */}
          <View style={styles.expandedContent}>
            <View style={styles.expandedProfileHeader}>
              <Text
                style={[styles.expandedNameAge, cardTextStyle.expandedNameAge]}
              >
                {profile.name}, {profile.age}
              </Text>
              <Text
                style={[
                  styles.expandedUniversity,
                  cardTextStyle.expandedUniversity,
                ]}
              >
                {profile.university}
              </Text>
              <Text style={[styles.expandedMajor, cardTextStyle.expandedMajor]}>
                {profile.major} {'\u2022'} {profile.year}
              </Text>
            </View>

            <Text style={[styles.expandedBio, cardTextStyle.expandedBio]}>
              {profile.bio}
            </Text>

            {/* All Interests */}
            <Text
              style={[
                styles.expandedSectionTitle,
                cardTextStyle.expandedSectionTitle,
              ]}
            >
              <Ionicons
                name="heart-outline"
                size={20}
                color="#3498db"
                style={{ marginRight: 8 }}
              />
              Interests
            </Text>
            <View style={styles.expandedInterestsContainer}>
              {profile.interests.map((interest, index) => (
                <View
                  key={`expanded-${profile.id}-interest-${interest}-${index}`}
                  style={styles.expandedInterestTag}
                >
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>

            <Text
              style={[
                styles.expandedSectionTitle,
                cardTextStyle.expandedSectionTitle,
              ]}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color="#3498db"
                style={{ marginRight: 8 }}
              />
              About Me
            </Text>
            <View style={styles.aboutMeContainer}>
              <Text
                style={[
                  styles.expandedDetailedText,
                  cardTextStyle.expandedDetailedText,
                ]}
              >
                {profile.detailedBio.aboutMe}
              </Text>
            </View>

            <Text
              style={[
                styles.expandedSectionTitle,
                cardTextStyle.expandedSectionTitle,
              ]}
            >
              <Ionicons
                name="home-outline"
                size={20}
                color="#3498db"
                style={{ marginRight: 8 }}
              />
              Roommate Preferences
            </Text>
            <View style={styles.aboutMeContainer}>
              <Text
                style={[
                  styles.expandedDetailedText,
                  cardTextStyle.expandedDetailedText,
                ]}
              >
                {profile.detailedBio.roommatePreferences}
              </Text>
            </View>

            <Text
              style={[
                styles.expandedSectionTitle,
                cardTextStyle.expandedSectionTitle,
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#3498db"
                style={{ marginRight: 8 }}
              />
              Lifestyle
            </Text>
            <View style={styles.expandedLifestyleContainer}>
              <View style={styles.expandedLifestyleItem}>
                <Text
                  style={[
                    styles.expandedLifestyleLabel,
                    cardTextStyle.expandedLifestyleLabel,
                  ]}
                >
                  Cleanliness
                </Text>
                <Text
                  style={[
                    styles.expandedLifestyleValue,
                    cardTextStyle.expandedLifestyleValue,
                  ]}
                >
                  {'★'.repeat(profile.lifestyle.cleanliness)}
                  {'☆'.repeat(5 - profile.lifestyle.cleanliness)}
                </Text>
              </View>
              <View style={styles.expandedLifestyleItem}>
                <Text
                  style={[
                    styles.expandedLifestyleLabel,
                    cardTextStyle.expandedLifestyleLabel,
                  ]}
                >
                  Schedule
                </Text>
                <Text
                  style={[
                    styles.expandedLifestyleValue,
                    cardTextStyle.expandedLifestyleValue,
                  ]}
                >
                  {profile.lifestyle.sleepSchedule === 'early_bird'
                    ? '🌅 Early Bird'
                    : '🌙 Night Owl'}
                </Text>
              </View>
              <View style={styles.expandedLifestyleItem}>
                <Text
                  style={[
                    styles.expandedLifestyleLabel,
                    cardTextStyle.expandedLifestyleLabel,
                  ]}
                >
                  Personality
                </Text>
                <Text
                  style={[
                    styles.expandedLifestyleValue,
                    cardTextStyle.expandedLifestyleValue,
                  ]}
                >
                  {profile.lifestyle.personality === 'introvert'
                    ? '🤔 Introvert'
                    : profile.lifestyle.personality === 'extrovert'
                    ? '🎉 Extrovert'
                    : '🤝 Ambivert'}
                </Text>
              </View>
              <View style={styles.expandedLifestyleItem}>
                <Text
                  style={[
                    styles.expandedLifestyleLabel,
                    cardTextStyle.expandedLifestyleLabel,
                  ]}
                >
                  Smoking
                </Text>
                <Text
                  style={[
                    styles.expandedLifestyleValue,
                    cardTextStyle.expandedLifestyleValue,
                  ]}
                >
                  {profile.lifestyle.smoking ? 'Yes' : 'No'}
                </Text>
              </View>
              <View style={styles.expandedLifestyleItem}>
                <Text
                  style={[
                    styles.expandedLifestyleLabel,
                    cardTextStyle.expandedLifestyleLabel,
                  ]}
                >
                  Pets
                </Text>
                <Text
                  style={[
                    styles.expandedLifestyleValue,
                    cardTextStyle.expandedLifestyleValue,
                  ]}
                >
                  {profile.lifestyle.pets ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.expandedSectionTitle,
                cardTextStyle.expandedSectionTitle,
              ]}
            >
              Move-in Details
            </Text>
            <View style={styles.expandedDetailsContainer}>
              <Text
                style={[
                  styles.expandedDetailsText,
                  cardTextStyle.expandedDetailsText,
                ]}
              >
                🗓 Available from:{' '}
                {new Date(profile.moveInDate).toLocaleDateString()}
              </Text>
              <Text
                style={[
                  styles.expandedDetailsText,
                  cardTextStyle.expandedDetailsText,
                ]}
              >
                💰 Budget: {profile.budget.preferredRange}
              </Text>
              <Text
                style={[
                  styles.expandedDetailsText,
                  cardTextStyle.expandedDetailsText,
                ]}
              >
                📍 Location: {profile.location.preferred} (within{' '}
                {profile.location.maxDistance} miles)
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <>
      {renderCardView()}
      {renderExpandedView()}
    </>
  );
}

const styles = StyleSheet.create({
  // Card View Styles
  card: {
    width: CARD_WIDTH,
    borderRadius: 20,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'center',
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  photoContainer: {
    position: 'relative',
    height: 450,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
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
    paddingHorizontal: 16,
  },
  photoButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIndicators: {
    position: 'absolute',
    bottom: 16,
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
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  contentContainer: {
    padding: 20,
  },
  profileHeader: {
    marginBottom: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  inlineExpandButton: {
    padding: 6,
    backgroundColor: 'rgba(52, 152, 219, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(52, 152, 219, 0.3)',
  },
  nameAge: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
  },
  university: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginBottom: 2,
  },
  major: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  bio: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  interestTag: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  interestText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: 'white',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: 'rgba(52, 152, 219, 0.3)',
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expandButtonText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    color: '#3498db',
    marginRight: 8,
  },

  // Expanded View Styles
  expandedContainer: {
    flex: 1,
    backgroundColor: '#0e1621', // Dark navy background
  },
  expandedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a2735',
  },
  closeButton: {
    padding: 4,
  },
  expandedHeaderTitleContainer: {
    alignItems: 'center',
  },
  expandedHeaderTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
  },
  expandedScrollView: {
    flex: 1,
  },
  expandedPhotoContainer: {
    position: 'relative',
    height: 400,
  },
  expandedImage: {
    width: '100%',
    height: '100%',
  },
  expandedPhotoControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  expandedPhotoIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  expandedContent: {
    padding: 20,
  },
  expandedProfileHeader: {
    marginBottom: 16,
  },
  expandedNameAge: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    marginBottom: 4,
  },
  expandedUniversity: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    marginBottom: 2,
  },
  expandedMajor: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
  },
  expandedBio: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    marginBottom: 24,
    lineHeight: 24,
  },
  expandedSectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  expandedInterestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  expandedInterestTag: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  expandedDetailedText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  expandedLifestyleContainer: {
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
  },
  expandedLifestyleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  expandedLifestyleLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
  expandedLifestyleValue: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
  expandedDetailsContainer: {
    marginBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
  },
  expandedDetailsText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  aboutMeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  aboutMePreview: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#3498db',
  },
  aboutMePreviewTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 6,
  },
  aboutMePreviewText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  readMoreButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    marginRight: 4,
  },
  fullProfileBadge: {
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  fullProfileText: {
    color: '#3498db',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  contentScrollView: {
    // Remove flex: 1 to allow ScrollView to size based on content
    // flex: 1, // Allow ScrollView to take remaining space
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 1,
  },
});

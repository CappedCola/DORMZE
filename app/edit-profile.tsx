import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Platform,
  Modal,
  FlatList,
  SafeAreaView,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Profile } from '@/types/profile';
import { useProfile } from '@/context/ProfileContext';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/styles/theme';
import {
  INTERESTS,
  UNIVERSITIES,
  MAJORS,
  YEARS,
} from '@/constants/profileOptions';

export default function EditProfileScreen() {
  // Get profile from context
  const { profile: contextProfile, updateProfile } = useProfile();
  const { theme } = useTheme();
  const themeColors = colors[theme];

  // Local state for editing with initial default values
  const [profile, setProfile] = useState<Profile>({
    id: '',
    name: '',
    age: 0,
    bio: '',
    detailedBio: { aboutMe: '', lookingFor: '', roommatePreferences: '' },
    university: '',
    major: '',
    year: '',
    interests: [],
    lifestyle: {
      cleanliness: 0,
      sleepSchedule: 'early_bird',
      smoking: 'None',
      pets: false,
      personality: 'ambivert',
    },
    photos: [],
    budget: { preferredRange: '' },
    moveInDate: '',
    location: { preferred: '', maxDistance: 0 },
  });

  // Initialize local state from context when component mounts
  useEffect(() => {
    if (contextProfile) {
      setProfile(JSON.parse(JSON.stringify(contextProfile)));
    }
  }, [contextProfile]);

  const [newInterest, setNewInterest] = useState('');
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [showMajorModal, setShowMajorModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [universitySearch, setUniversitySearch] = useState('');
  const [majorSearch, setMajorSearch] = useState('');
  const [filteredUniversities, setFilteredUniversities] =
    useState(UNIVERSITIES);
  const [filteredMajors, setFilteredMajors] = useState(MAJORS);

  // Effect to filter universities based on search
  useEffect(() => {
    if (universitySearch) {
      const filtered = UNIVERSITIES.filter((uni) =>
        uni.toLowerCase().includes(universitySearch.toLowerCase())
      );
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities(UNIVERSITIES);
    }
  }, [universitySearch]);

  // Effect to filter majors based on search
  useEffect(() => {
    if (majorSearch) {
      const filtered = MAJORS.filter((major) =>
        major.toLowerCase().includes(majorSearch.toLowerCase())
      );
      setFilteredMajors(filtered);
    } else {
      setFilteredMajors(MAJORS);
    }
  }, [majorSearch]);

  // Photo management
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleSaveProfile = () => {
    // Update the context with our edited profile
    updateProfile(profile);

    // Show success message and navigate back
    Alert.alert('Success', 'Profile updated successfully');
    router.back();
  };

  const nextPhoto = () => {
    if (!profile || !profile.photos) return;

    setCurrentPhotoIndex((prev) =>
      prev === profile.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    if (!profile || !profile.photos) return;

    setCurrentPhotoIndex((prev) =>
      prev === 0 ? profile.photos.length - 1 : prev - 1
    );
  };

  const removeCurrentPhoto = () => {
    if (!profile || !profile.photos) return;

    if (profile.photos.length <= 1) {
      Alert.alert('Error', 'You must have at least one photo');
      return;
    }

    const updatedPhotos = profile.photos.filter(
      (_, index) => index !== currentPhotoIndex
    );
    setProfile({ ...profile, photos: updatedPhotos });
    setCurrentPhotoIndex(0);
  };

  const toggleInterest = (interest: string) => {
    if (!profile || !profile.interests) return;

    // If interest already exists, remove it, otherwise add it
    if (profile.interests.includes(interest)) {
      removeInterest(interest);
    } else {
      setProfile({
        ...profile,
        interests: [...profile.interests, interest],
      });
    }
  };

  const removeInterest = (interest: string) => {
    if (!profile || !profile.interests) return;

    setProfile({
      ...profile,
      interests: profile.interests.filter((item) => item !== interest),
    });
  };

  const addNewPhoto = async () => {
    if (!profile) return;

    try {
      console.log('Starting image picker with direct approach');

      // Skip separate permission requesting and go straight to image picker
      // Let the image picker handle permissions through its built-in flow
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
          // Explicitly tell the picker to ask for permission if needed
          base64: false,
        });

        console.log(
          'Image picker completed:',
          result.canceled ? 'Canceled' : 'Success'
        );

        if (!result.canceled && result.assets && result.assets.length > 0) {
          // Add the selected image to profile photos
          const selectedImage = result.assets[0];

          // Verify we have a valid URI
          if (!selectedImage.uri) {
            console.log('Selected image missing URI');
            throw new Error('Selected image has no URI');
          }

          console.log(
            'Selected image URI (shortened):',
            selectedImage.uri.substring(0, 20) + '...'
          );

          const newPhoto = {
            url: selectedImage.uri,
            id: `photo-${Date.now()}`,
          };

          const photos = profile.photos || [];
          setProfile({
            ...profile,
            photos: [...photos, newPhoto],
          });

          // Show newly added photo
          setCurrentPhotoIndex(photos.length);
          console.log('Photo added successfully');

          // Success notification
          Alert.alert('Success', 'Photo added to your profile');
        } else {
          console.log('User canceled image selection');
        }
      } catch (pickerErr: any) {
        console.log('Error during image picking:', pickerErr);
        // If direct picking fails, add placeholder
        addPlaceholderPhoto();
      }
    } catch (err: any) {
      console.log('Top-level error:', err);
      // Fallback to adding a placeholder
      addPlaceholderPhoto();
    }
  };

  // Helper function to add a placeholder photo
  const addPlaceholderPhoto = () => {
    console.log('Adding placeholder photo');
    const fallbackPhoto = {
      url: 'https://via.placeholder.com/400x400?text=Profile+Photo',
      id: `photo-${Date.now()}`,
    };

    const photos = profile.photos || [];
    setProfile({
      ...profile,
      photos: [...photos, fallbackPhoto],
    });

    // Show the newly added photo
    setCurrentPhotoIndex(photos.length);

    Alert.alert(
      'Photo Added',
      'A placeholder photo has been added to your profile.'
    );
  };

  const navigateToSettings = () => {
    router.push('/settings');
  };

  // Render Interests Modal
  const renderInterestsModal = () => (
    <Modal
      visible={showInterestsModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowInterestsModal(false)}
    >
      <SafeAreaView
        style={[
          styles.modalContainer,
          { backgroundColor: themeColors.background },
        ]}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowInterestsModal(false)}>
            <Text style={{ color: themeColors.primary, fontSize: 16 }}>
              Done
            </Text>
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>
            Select Interests
          </Text>
          <View style={{ width: 50 }} />
        </View>

        <FlatList
          data={INTERESTS}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => `interest-${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.interestItem,
                profile.interests.includes(item) && {
                  backgroundColor: 'rgba(52, 152, 219, 0.2)',
                },
              ]}
              onPress={() => toggleInterest(item)}
            >
              <Text style={{ color: themeColors.text, fontSize: 16 }}>
                {item}
              </Text>
              {profile.interests.includes(item) && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={themeColors.primary}
                />
              )}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );

  // Render University Modal
  const renderUniversityModal = () => (
    <Modal
      visible={showUniversityModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowUniversityModal(false)}
    >
      <SafeAreaView
        style={[
          styles.modalContainer,
          { backgroundColor: themeColors.background },
        ]}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowUniversityModal(false)}>
            <Text style={{ color: themeColors.primary, fontSize: 16 }}>
              Done
            </Text>
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>
            Select University
          </Text>
          <View style={{ width: 50 }} />
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              {
                color: themeColors.text,
                backgroundColor: themeColors.inputBackground,
                borderColor: themeColors.border,
              },
            ]}
            value={universitySearch}
            onChangeText={setUniversitySearch}
            placeholder="Search universities..."
            placeholderTextColor={themeColors.secondaryText}
          />
        </View>

        <FlatList
          data={filteredUniversities}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => `university-${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.interestItem,
                profile.university === item && {
                  backgroundColor: 'rgba(52, 152, 219, 0.2)',
                },
              ]}
              onPress={() => {
                setProfile({ ...profile, university: item });
                setShowUniversityModal(false);
              }}
            >
              <Text style={{ color: themeColors.text, fontSize: 16 }}>
                {item}
              </Text>
              {profile.university === item && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={themeColors.primary}
                />
              )}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );

  // Render Major Modal
  const renderMajorModal = () => (
    <Modal
      visible={showMajorModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowMajorModal(false)}
    >
      <SafeAreaView
        style={[
          styles.modalContainer,
          { backgroundColor: themeColors.background },
        ]}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowMajorModal(false)}>
            <Text style={{ color: themeColors.primary, fontSize: 16 }}>
              Done
            </Text>
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>
            Select Major
          </Text>
          <View style={{ width: 50 }} />
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              {
                color: themeColors.text,
                backgroundColor: themeColors.inputBackground,
                borderColor: themeColors.border,
              },
            ]}
            value={majorSearch}
            onChangeText={setMajorSearch}
            placeholder="Search majors..."
            placeholderTextColor={themeColors.secondaryText}
          />
        </View>

        <FlatList
          data={filteredMajors}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => `major-${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.interestItem,
                profile.major === item && {
                  backgroundColor: 'rgba(52, 152, 219, 0.2)',
                },
              ]}
              onPress={() => {
                setProfile({ ...profile, major: item });
                setShowMajorModal(false);
              }}
            >
              <Text style={{ color: themeColors.text, fontSize: 16 }}>
                {item}
              </Text>
              {profile.major === item && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={themeColors.primary}
                />
              )}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );

  // Render Year Modal
  const renderYearModal = () => (
    <Modal
      visible={showYearModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowYearModal(false)}
    >
      <SafeAreaView
        style={[
          styles.modalContainer,
          { backgroundColor: themeColors.background },
        ]}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowYearModal(false)}>
            <Text style={{ color: themeColors.primary, fontSize: 16 }}>
              Done
            </Text>
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>
            Select Year
          </Text>
          <View style={{ width: 50 }} />
        </View>

        <FlatList
          data={YEARS}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => `year-${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.interestItem,
                profile.year === item && {
                  backgroundColor: 'rgba(52, 152, 219, 0.2)',
                },
              ]}
              onPress={() => {
                setProfile({ ...profile, year: item });
                setShowYearModal(false);
              }}
            >
              <Text style={{ color: themeColors.text, fontSize: 16 }}>
                {item}
              </Text>
              {profile.year === item && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={themeColors.primary}
                />
              )}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={themeColors.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColors.text }]}>
          Edit Profile
        </Text>
        <TouchableOpacity
          onPress={handleSaveProfile}
          style={[styles.saveButton, { backgroundColor: themeColors.primary }]}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {profile ? (
        <>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Photos
            </Text>
            <View style={styles.photoContainer}>
              <Image
                source={
                  profile.photos && profile.photos.length > 0
                    ? { uri: profile.photos[currentPhotoIndex]?.url }
                    : {
                        uri: 'https://via.placeholder.com/400x400?text=Add+Photo',
                      }
                }
                defaultSource={{
                  uri: 'https://via.placeholder.com/400x400?text=Add+Photo',
                }}
                style={styles.profileImage}
              />
              {profile.photos && profile.photos.length > 1 && (
                <View style={styles.photoControls}>
                  <TouchableOpacity
                    onPress={prevPhoto}
                    style={styles.photoButton}
                  >
                    <Ionicons name="chevron-back" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={nextPhoto}
                    style={styles.photoButton}
                  >
                    <Ionicons name="chevron-forward" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              )}
              {profile.photos && profile.photos.length > 1 && (
                <View style={styles.photoIndicators}>
                  {profile.photos.map((_, index) => (
                    <View
                      key={`edit-photo-indicator-${index}`}
                      style={[
                        styles.photoIndicator,
                        index === currentPhotoIndex &&
                          styles.photoIndicatorActive,
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>

            <View style={styles.photoActions}>
              <TouchableOpacity
                onPress={addNewPhoto}
                style={styles.photoActionButton}
              >
                <Ionicons
                  name="add-circle"
                  size={20}
                  color={themeColors.primary}
                />
                <Text
                  style={[
                    styles.photoActionText,
                    { color: themeColors.primary },
                  ]}
                >
                  Add Photo
                </Text>
              </TouchableOpacity>

              {profile.photos && profile.photos.length > 0 && (
                <TouchableOpacity
                  onPress={removeCurrentPhoto}
                  style={styles.photoActionButton}
                >
                  <Ionicons name="trash" size={20} color={themeColors.error} />
                  <Text
                    style={[
                      styles.photoActionText,
                      { color: themeColors.error },
                    ]}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Basic Info
            </Text>

            {/* Disabled inputs with info message */}
            <View style={styles.restrictedSection}>
              <Text
                style={[
                  styles.restrictedMessage,
                  { color: themeColors.secondaryText },
                ]}
              >
                Name, age, bio, and education can only be edited in Settings
              </Text>
              <TouchableOpacity
                style={[
                  styles.settingsButton,
                  { backgroundColor: themeColors.primary },
                ]}
                onPress={navigateToSettings}
              >
                <Text style={styles.settingsButtonText}>Go to Settings</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: themeColors.secondaryText,
                    backgroundColor: themeColors.inputBackground,
                    borderColor: themeColors.border,
                  },
                ]}
                value={profile.name}
                editable={false}
                placeholder="Your name"
                placeholderTextColor={themeColors.secondaryText}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Age
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: themeColors.secondaryText,
                    backgroundColor: themeColors.inputBackground,
                    borderColor: themeColors.border,
                  },
                ]}
                value={profile.age?.toString() || ''}
                editable={false}
                keyboardType="number-pad"
                placeholder="Your age"
                placeholderTextColor={themeColors.secondaryText}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Occupation
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: themeColors.text,
                    backgroundColor: themeColors.inputBackground,
                    borderColor: themeColors.border,
                  },
                ]}
                value={
                  'Student'
                } /* Default value since occupation is not in Profile type */
                editable={false}
                placeholder="Your occupation"
                placeholderTextColor={themeColors.secondaryText}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              About Me
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  color: themeColors.text,
                  backgroundColor: themeColors.inputBackground,
                  borderColor: themeColors.border,
                },
              ]}
              value={profile.detailedBio?.aboutMe || ''}
              onChangeText={(text) =>
                setProfile({
                  ...profile,
                  detailedBio: {
                    ...profile.detailedBio,
                    aboutMe: text,
                  },
                })
              }
              multiline
              numberOfLines={Platform.OS === 'ios' ? 0 : 4}
              placeholder="More detailed information about yourself"
              placeholderTextColor={themeColors.secondaryText}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Roommate Preferences
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  color: themeColors.text,
                  backgroundColor: themeColors.inputBackground,
                  borderColor: themeColors.border,
                },
              ]}
              value={profile.detailedBio?.roommatePreferences || ''}
              onChangeText={(text) =>
                setProfile({
                  ...profile,
                  detailedBio: {
                    ...profile.detailedBio,
                    roommatePreferences: text,
                  },
                })
              }
              multiline
              numberOfLines={Platform.OS === 'ios' ? 0 : 4}
              placeholder="Describe your preferences for a roommate"
              placeholderTextColor={themeColors.secondaryText}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Education
            </Text>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                University
              </Text>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  {
                    backgroundColor: themeColors.inputBackground,
                    borderColor: themeColors.border,
                  },
                ]}
                onPress={() => setShowUniversityModal(true)}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    {
                      color: profile.university
                        ? themeColors.text
                        : themeColors.secondaryText,
                    },
                  ]}
                >
                  {profile.university || 'Select University'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={themeColors.text}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Major
              </Text>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  {
                    backgroundColor: themeColors.inputBackground,
                    borderColor: themeColors.border,
                  },
                ]}
                onPress={() => setShowMajorModal(true)}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    {
                      color: profile.major
                        ? themeColors.text
                        : themeColors.secondaryText,
                    },
                  ]}
                >
                  {profile.major || 'Select Major'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={themeColors.text}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Year
              </Text>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  {
                    backgroundColor: themeColors.inputBackground,
                    borderColor: themeColors.border,
                  },
                ]}
                onPress={() => setShowYearModal(true)}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    {
                      color: profile.year
                        ? themeColors.text
                        : themeColors.secondaryText,
                    },
                  ]}
                >
                  {profile.year || 'Select Year'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={themeColors.text}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Interests
            </Text>
            <TouchableOpacity
              style={[
                styles.selectInterestsButton,
                {
                  backgroundColor: themeColors.inputBackground,
                  borderColor: themeColors.border,
                },
              ]}
              onPress={() => setShowInterestsModal(true)}
            >
              <Text style={{ color: themeColors.text }}>Select Interests</Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={themeColors.text}
              />
            </TouchableOpacity>

            <View style={styles.interestsContainer}>
              {profile.interests?.map((interest, index) => (
                <View
                  key={`edit-interest-${interest}-${index}`}
                  style={[
                    styles.interestTag,
                    { backgroundColor: themeColors.primary },
                  ]}
                >
                  <Text style={[styles.interestText, { color: 'white' }]}>
                    {interest}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeInterest(interest)}
                    style={styles.removeInterestButton}
                  >
                    <Ionicons name="close-circle" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {profile.lifestyle && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Lifestyle
              </Text>
              <View style={styles.switchGroup}>
                <Text style={[styles.label, { color: themeColors.text }]}>
                  Smoking
                </Text>
                <Switch
                  trackColor={{ false: '#E5E7EB', true: '#BFDBFE' }}
                  thumbColor={
                    profile.lifestyle.smoking !== 'None' ? '#2563EB' : '#9CA3AF'
                  }
                  ios_backgroundColor="#E5E7EB"
                  onValueChange={(value) =>
                    setProfile({
                      ...profile,
                      lifestyle: {
                        ...profile.lifestyle,
                        smoking: value ? 'Cigarettes' : 'None',
                      },
                    })
                  }
                  value={profile.lifestyle.smoking !== 'None'}
                />
              </View>

              <View style={styles.switchGroup}>
                <Text style={[styles.label, { color: themeColors.text }]}>
                  Pets
                </Text>
                <Switch
                  trackColor={{ false: '#E5E7EB', true: '#BFDBFE' }}
                  thumbColor={profile.lifestyle.pets ? '#2563EB' : '#9CA3AF'}
                  ios_backgroundColor="#E5E7EB"
                  onValueChange={(value) =>
                    setProfile({
                      ...profile,
                      lifestyle: {
                        ...profile.lifestyle,
                        pets: value,
                      },
                    })
                  }
                  value={profile.lifestyle.pets}
                />
              </View>

              <View style={styles.switchGroup}>
                <Text style={[styles.label, { color: themeColors.text }]}>
                  Sleep Schedule
                </Text>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      profile.lifestyle.sleepSchedule === 'early_bird' &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() =>
                      setProfile({
                        ...profile,
                        lifestyle: {
                          ...profile.lifestyle,
                          sleepSchedule: 'early_bird',
                        },
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        profile.lifestyle.sleepSchedule === 'early_bird' &&
                          styles.optionTextSelected,
                      ]}
                    >
                      Early Bird
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      profile.lifestyle.sleepSchedule === 'night_owl' &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() =>
                      setProfile({
                        ...profile,
                        lifestyle: {
                          ...profile.lifestyle,
                          sleepSchedule: 'night_owl',
                        },
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        profile.lifestyle.sleepSchedule === 'night_owl' &&
                          styles.optionTextSelected,
                      ]}
                    >
                      Night Owl
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.switchGroup}>
                <Text style={[styles.label, { color: themeColors.text }]}>
                  Personality
                </Text>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      profile.lifestyle.personality === 'introvert' &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() =>
                      setProfile({
                        ...profile,
                        lifestyle: {
                          ...profile.lifestyle,
                          personality: 'introvert',
                        },
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        profile.lifestyle.personality === 'introvert' &&
                          styles.optionTextSelected,
                      ]}
                    >
                      Introvert
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      profile.lifestyle.personality === 'extrovert' &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() =>
                      setProfile({
                        ...profile,
                        lifestyle: {
                          ...profile.lifestyle,
                          personality: 'extrovert',
                        },
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        profile.lifestyle.personality === 'extrovert' &&
                          styles.optionTextSelected,
                      ]}
                    >
                      Extrovert
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      profile.lifestyle.personality === 'ambivert' &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() =>
                      setProfile({
                        ...profile,
                        lifestyle: {
                          ...profile.lifestyle,
                          personality: 'ambivert',
                        },
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        profile.lifestyle.personality === 'ambivert' &&
                          styles.optionTextSelected,
                      ]}
                    >
                      Ambivert
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.saveButtonLarge,
              { backgroundColor: themeColors.primary },
            ]}
            onPress={handleSaveProfile}
          >
            <Text style={styles.saveButtonTextLarge}>Save Profile</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: themeColors.text }]}>
            Loading profile data...
          </Text>
        </View>
      )}

      {renderUniversityModal()}
      {renderMajorModal()}
      {renderYearModal()}
      {renderInterestsModal()}
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
  backButton: {
    padding: 4,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  photoContainer: {
    position: 'relative',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
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
    bottom: 20,
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
    width: 16,
    height: 8,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  photoActionButton: {
    alignItems: 'center',
    padding: 8,
  },
  photoActionText: {
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  textArea: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  saveButtonLarge: {
    margin: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonTextLarge: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  restrictedSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  restrictedMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginBottom: 12,
  },
  settingsButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  interestInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  interestInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2563EB',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 4,
  },
  removeInterestButton: {
    padding: 2,
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 8,
  },
  optionButtonSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  optionText: {
    fontSize: 14,
    color: '#4B5563',
  },
  optionTextSelected: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  interestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  selectInterestsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  selectButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  searchInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
});

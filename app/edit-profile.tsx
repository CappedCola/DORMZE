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
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Profile } from '@/types/profile';
import { useProfile } from '@/context/ProfileContext';

export default function EditProfileScreen() {
  // Get profile from context
  const { profile: contextProfile, updateProfile } = useProfile();

  // Local state for editing with initial default values
  const [profile, setProfile] = useState<Profile>({
    id: '',
    name: '',
    age: 0,
    occupation: '',
    bio: '',
    detailedBio: { aboutMe: '', lookingFor: '', roommatePreferences: '' },
    university: '',
    major: '',
    year: '',
    interests: [],
    lifestyle: {
      cleanliness: 0,
      sleepSchedule: 'early_bird',
      smoking: false,
      pets: false,
      visitors: 'sometimes',
      drinking: 'sometimes',
      cooking: 'sometimes',
      personality: 'ambivert',
    },
    photos: [],
    budget: { min: 0, max: 0, preferredRange: '' },
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

  const updatePhotoCaption = (caption: string) => {
    if (!profile || !profile.photos) return;

    const updatedPhotos = [...profile.photos];
    updatedPhotos[currentPhotoIndex] = {
      ...updatedPhotos[currentPhotoIndex],
      caption,
    };
    setProfile({ ...profile, photos: updatedPhotos });
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

  const addInterest = () => {
    if (!profile || !profile.interests) return;

    if (!newInterest) return;
    if (profile.interests.includes(newInterest)) {
      Alert.alert(
        'Already exists',
        'This interest already exists in your profile'
      );
      return;
    }
    setProfile({
      ...profile,
      interests: [...profile.interests, newInterest],
    });
    setNewInterest('');
  };

  const removeInterest = (interest: string) => {
    if (!profile || !profile.interests) return;

    setProfile({
      ...profile,
      interests: profile.interests.filter((item) => item !== interest),
    });
  };

  const addNewPhoto = () => {
    if (!profile) return;

    // In a real app, this would open the image picker
    // For now, we'll add a placeholder image
    const newPhoto = {
      url: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
      caption: 'New photo',
    };

    const photos = profile.photos || [];
    setProfile({
      ...profile,
      photos: [...photos, newPhoto],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {profile && profile.photos && profile.photos.length > 0 ? (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: profile.photos[currentPhotoIndex]?.url }}
                style={styles.profileImage}
              />
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
            </View>

            <View style={styles.captionContainer}>
              <TextInput
                style={styles.captionInput}
                value={profile.photos[currentPhotoIndex]?.caption || ''}
                onChangeText={updatePhotoCaption}
                placeholder="Photo caption"
              />
            </View>

            <View style={styles.photoActions}>
              <TouchableOpacity
                onPress={addNewPhoto}
                style={styles.photoActionButton}
              >
                <Ionicons name="add-circle" size={20} color="#2563EB" />
                <Text style={styles.photoActionText}>Add Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={removeCurrentPhoto}
                style={styles.photoActionButton}
              >
                <Ionicons name="trash" size={20} color="#EF4444" />
                <Text style={[styles.photoActionText, { color: '#EF4444' }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Info</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
                placeholder="Your name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={profile.age?.toString() || ''}
                onChangeText={(text) => {
                  const age = parseInt(text) || 0;
                  setProfile({ ...profile, age });
                }}
                keyboardType="number-pad"
                placeholder="Your age"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Occupation</Text>
              <TextInput
                style={styles.input}
                value={profile.occupation}
                onChangeText={(text) =>
                  setProfile({ ...profile, occupation: text })
                }
                placeholder="Your occupation"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <TextInput
              style={styles.textArea}
              value={profile.bio}
              onChangeText={(text) => setProfile({ ...profile, bio: text })}
              multiline
              numberOfLines={Platform.OS === 'ios' ? 0 : 4}
              placeholder="Tell potential roommates about yourself"
            />

            <TextInput
              style={styles.textArea}
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
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>University</Text>
              <TextInput
                style={styles.input}
                value={profile.university}
                onChangeText={(text) =>
                  setProfile({ ...profile, university: text })
                }
                placeholder="Your university"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Major</Text>
              <TextInput
                style={styles.input}
                value={profile.major}
                onChangeText={(text) => setProfile({ ...profile, major: text })}
                placeholder="Your major"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.input}
                value={profile.year}
                onChangeText={(text) => setProfile({ ...profile, year: text })}
                placeholder="Class of..."
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.interestInputContainer}>
              <TextInput
                style={styles.interestInput}
                value={newInterest}
                onChangeText={setNewInterest}
                placeholder="Add a new interest..."
              />
              <TouchableOpacity style={styles.addButton} onPress={addInterest}>
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.interestsContainer}>
              {profile.interests?.map((interest, index) => (
                <View
                  key={`edit-interest-${interest}-${index}`}
                  style={styles.interestTag}
                >
                  <Text style={styles.interestText}>{interest}</Text>
                  <TouchableOpacity
                    onPress={() => removeInterest(interest)}
                    style={styles.removeInterestButton}
                  >
                    <Ionicons name="close-circle" size={16} color="#4B5563" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {profile.lifestyle && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lifestyle</Text>
              <View style={styles.switchGroup}>
                <Text style={styles.label}>Smoking</Text>
                <Switch
                  trackColor={{ false: '#E5E7EB', true: '#BFDBFE' }}
                  thumbColor={profile.lifestyle.smoking ? '#2563EB' : '#9CA3AF'}
                  ios_backgroundColor="#E5E7EB"
                  onValueChange={(value) =>
                    setProfile({
                      ...profile,
                      lifestyle: {
                        ...profile.lifestyle,
                        smoking: value,
                      },
                    })
                  }
                  value={profile.lifestyle.smoking}
                />
              </View>

              <View style={styles.switchGroup}>
                <Text style={styles.label}>Pets</Text>
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
                <Text style={styles.label}>Sleep Schedule</Text>
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
                <Text style={styles.label}>Personality</Text>
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
            style={styles.saveButtonLarge}
            onPress={handleSaveProfile}
          >
            <Text style={styles.saveButtonTextLarge}>Save Profile</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile data...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  backButton: {
    padding: 4,
  },
  saveButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#2563EB',
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  photoContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
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
    paddingHorizontal: 8,
  },
  photoButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  photoIndicators: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  photoIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  photoIndicatorActive: {
    backgroundColor: '#fff',
  },
  captionContainer: {
    marginBottom: 16,
  },
  captionInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  photoActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  photoActionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#2563EB',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
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
  saveButtonLarge: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonTextLarge: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 300,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  FlatList,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  UNIVERSITIES,
  MAJORS,
  YEARS,
  INTERESTS,
  SLEEP_SCHEDULE_OPTIONS,
  PERSONALITY_OPTIONS,
  SmokingOption,
  SleepScheduleOption,
  PersonalityOption,
} from '@/constants/profileOptions';
import { Profile } from '@/types/profile';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ProfileEditorProps {
  profile: Profile;
  onUpdate: (updatedProfile: Profile) => void;
}

export function ProfileEditor({ profile, onUpdate }: ProfileEditorProps) {
  const { theme, isDark } = useTheme();
  const themeColors = colors[theme];
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [showMajorModal, setShowMajorModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const updateProfile = (updates: Partial<Profile>) => {
    onUpdate({ ...profile, ...updates });
  };

  const toggleInterest = (interest: string) => {
    const updatedInterests = profile.interests.includes(interest)
      ? profile.interests.filter((i) => i !== interest)
      : [...profile.interests, interest];
    updateProfile({ interests: updatedInterests });
  };

  const renderFullScreenModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    options: string[],
    onSelect: (value: string) => void,
    selectedValue?: string
  ) => (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: isDark ? '#0e1621' : '#ffffff' }}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ fontSize: 16, color: '#3498db' }}>Cancel</Text>
          </TouchableOpacity>
          <Text
            style={[styles.modalTitle, { color: isDark ? 'white' : '#000' }]}
          >
            {title}
          </Text>
          <View style={{ width: 60 }} />
        </View>

        <FlatList
          data={options}
          style={{ backgroundColor: isDark ? '#0e1621' : '#ffffff' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.optionItem,
                {
                  backgroundColor:
                    item === selectedValue
                      ? 'rgba(52, 152, 219, 0.1)'
                      : 'transparent',
                },
              ]}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={{ fontSize: 18, color: isDark ? 'white' : '#000' }}>
                {item}
              </Text>
              {item === selectedValue && (
                <Ionicons name="checkmark" size={22} color="#3498db" />
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </SafeAreaView>
    </Modal>
  );

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0e1621' : '#f8f9fa' },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: isDark ? 'white' : '#000' }]}
        >
          Education
        </Text>

        <Text style={[styles.label, { color: isDark ? '#bdc3c7' : '#6c757d' }]}>
          University
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowUniversityModal(true)}
        >
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: isDark ? '#1a2735' : 'white' },
            ]}
          >
            <Text
              style={[styles.inputText, { color: isDark ? 'white' : '#000' }]}
            >
              {profile.university}
            </Text>
          </View>
        </TouchableOpacity>

        <Text
          style={[
            styles.label,
            { color: isDark ? '#bdc3c7' : '#6c757d', marginTop: 16 },
          ]}
        >
          Major
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowMajorModal(true)}
        >
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: isDark ? '#1a2735' : 'white' },
            ]}
          >
            <Text
              style={[styles.inputText, { color: isDark ? 'white' : '#000' }]}
            >
              {profile.major}
            </Text>
          </View>
        </TouchableOpacity>

        <Text
          style={[
            styles.label,
            { color: isDark ? '#bdc3c7' : '#6c757d', marginTop: 16 },
          ]}
        >
          Year
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowYearModal(true)}
        >
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: isDark ? '#1a2735' : 'white' },
            ]}
          >
            <Text
              style={[styles.inputText, { color: isDark ? 'white' : '#000' }]}
            >
              {profile.year}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.divider,
          { backgroundColor: isDark ? '#2c3e50' : '#e9ecef' },
        ]}
      />

      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: isDark ? 'white' : '#000' }]}
        >
          Interests
        </Text>

        <TouchableOpacity
          style={[
            styles.addInterestRow,
            { backgroundColor: isDark ? '#1a2735' : 'white' },
          ]}
          activeOpacity={0.7}
          onPress={() => setShowInterestsModal(true)}
        >
          <Text style={{ color: isDark ? '#bdc3c7' : '#6c757d', fontSize: 16 }}>
            Add a new interest...
          </Text>
          <View style={styles.addButton}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '400' }}>
              +
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.interestTags}>
          {profile.interests.map((interest) => (
            <View key={interest} style={styles.interestTag}>
              <Text style={{ color: 'white', fontSize: 14 }}>{interest}</Text>
              <TouchableOpacity
                onPress={() => toggleInterest(interest)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color="white"
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View
        style={[
          styles.divider,
          { backgroundColor: isDark ? '#2c3e50' : '#e9ecef' },
        ]}
      />

      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: isDark ? 'white' : '#000' }]}
        >
          Lifestyle
        </Text>

        <View style={styles.switchRow}>
          <Text style={{ fontSize: 16, color: isDark ? 'white' : '#000' }}>
            Smoking
          </Text>
          <Switch
            value={profile.lifestyle.smoking !== 'None'}
            onValueChange={(value) =>
              updateProfile({
                lifestyle: {
                  ...profile.lifestyle,
                  smoking: value ? 'Multiple' : 'None',
                },
              })
            }
            trackColor={{ false: '#e9ecef', true: '#4dabf7' }}
            thumbColor="white"
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={{ fontSize: 16, color: isDark ? 'white' : '#000' }}>
            Pets
          </Text>
          <Switch
            value={profile.lifestyle.pets}
            onValueChange={(value) =>
              updateProfile({
                lifestyle: { ...profile.lifestyle, pets: value },
              })
            }
            trackColor={{ false: '#e9ecef', true: '#4dabf7' }}
            thumbColor="white"
          />
        </View>

        <Text
          style={[
            styles.label,
            { color: isDark ? '#bdc3c7' : '#6c757d', marginTop: 16 },
          ]}
        >
          Sleep Schedule
        </Text>
        <View style={styles.segmentControl}>
          {SLEEP_SCHEDULE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.segment,
                {
                  backgroundColor:
                    profile.lifestyle.sleepSchedule === option
                      ? '#4573d5'
                      : 'transparent',
                  borderColor:
                    profile.lifestyle.sleepSchedule === option
                      ? '#4573d5'
                      : '#dcdee0',
                },
              ]}
              onPress={() =>
                updateProfile({
                  lifestyle: {
                    ...profile.lifestyle,
                    sleepSchedule: option as SleepScheduleOption,
                  },
                })
              }
            >
              <Text
                style={{
                  color:
                    profile.lifestyle.sleepSchedule === option
                      ? 'white'
                      : isDark
                      ? '#bdc3c7'
                      : '#495057',
                  fontSize: 14,
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text
          style={[
            styles.label,
            { color: isDark ? '#bdc3c7' : '#6c757d', marginTop: 16 },
          ]}
        >
          Personality
        </Text>
        <View style={styles.segmentControl}>
          {PERSONALITY_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.segment,
                {
                  backgroundColor:
                    profile.lifestyle.personality === option
                      ? '#4573d5'
                      : 'transparent',
                  borderColor:
                    profile.lifestyle.personality === option
                      ? '#4573d5'
                      : '#dcdee0',
                },
              ]}
              onPress={() =>
                updateProfile({
                  lifestyle: {
                    ...profile.lifestyle,
                    personality: option as PersonalityOption,
                  },
                })
              }
            >
              <Text
                style={{
                  color:
                    profile.lifestyle.personality === option
                      ? 'white'
                      : isDark
                      ? '#bdc3c7'
                      : '#495057',
                  fontSize: 14,
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Modals */}
      {renderFullScreenModal(
        showUniversityModal,
        () => setShowUniversityModal(false),
        'Select University',
        UNIVERSITIES,
        (value) => updateProfile({ university: value }),
        profile.university
      )}

      {renderFullScreenModal(
        showMajorModal,
        () => setShowMajorModal(false),
        'Select Major',
        MAJORS,
        (value) => updateProfile({ major: value }),
        profile.major
      )}

      {renderFullScreenModal(
        showYearModal,
        () => setShowYearModal(false),
        'Select Year',
        YEARS,
        (value) => updateProfile({ year: value }),
        profile.year
      )}

      <Modal
        visible={showInterestsModal}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowInterestsModal(false)}
      >
        <SafeAreaView
          style={{ flex: 1, backgroundColor: isDark ? '#0e1621' : '#ffffff' }}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setShowInterestsModal(false)}
              style={styles.closeButton}
            >
              <Text style={{ fontSize: 16, color: '#3498db' }}>Done</Text>
            </TouchableOpacity>
            <Text
              style={[styles.modalTitle, { color: isDark ? 'white' : '#000' }]}
            >
              Select Interests
            </Text>
            <View style={{ width: 60 }} />
          </View>

          <FlatList
            data={INTERESTS}
            style={{ backgroundColor: isDark ? '#0e1621' : '#ffffff' }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: profile.interests.includes(item)
                      ? 'rgba(52, 152, 219, 0.1)'
                      : 'transparent',
                  },
                ]}
                onPress={() => toggleInterest(item)}
              >
                <Text
                  style={{ fontSize: 18, color: isDark ? 'white' : '#000' }}
                >
                  {item}
                </Text>
                {profile.interests.includes(item) && (
                  <Ionicons name="checkmark" size={22} color="#3498db" />
                )}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  inputText: {
    fontSize: 16,
  },
  addInterestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4573d5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4573d5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  segmentControl: {
    flexDirection: 'row',
    marginTop: 4,
  },
  segment: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 8,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/styles/theme';
import { useProfile } from '@/context/ProfileContext';

export default function SettingsScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const themeColors = colors[theme];
  const { profile, updateProfile } = useProfile();

  // Local state for editing profile data
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age?.toString() || '');
  const [bio, setBio] = useState(profile.bio);
  const [university, setUniversity] = useState(profile.university);
  const [major, setMajor] = useState(profile.major);
  const [year, setYear] = useState(profile.year);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => router.replace('/login'),
        style: 'destructive',
      },
    ]);
  };

  const handleSaveProfile = () => {
    const updatedProfile = {
      ...profile,
      name,
      age: parseInt(age) || 0,
      bio,
      university,
      major,
      year,
    };

    updateProfile(updatedProfile);
    Alert.alert('Success', 'Profile updated successfully');
  };

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
          Settings
        </Text>
      </View>

      <View style={styles.content}>
        {/* Appearance section */}
        <View
          style={[styles.section, { borderBottomColor: themeColors.border }]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Appearance
          </Text>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: themeColors.text }]}>
              Dark Mode
            </Text>
            <Switch
              trackColor={{
                false: themeColors.switch.track.false,
                true: themeColors.switch.track.true,
              }}
              thumbColor={
                isDark
                  ? themeColors.switch.thumb.true
                  : themeColors.switch.thumb.false
              }
              ios_backgroundColor={themeColors.switch.track.false}
              onValueChange={toggleTheme}
              value={isDark}
            />
          </View>
        </View>

        {/* Profile section */}
        <View
          style={[styles.section, { borderBottomColor: themeColors.border }]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Profile Information
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: themeColors.text }]}>
              Name
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
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={themeColors.secondaryText}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: themeColors.text }]}>
              Age
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
              value={age}
              onChangeText={setAge}
              placeholder="Your age"
              keyboardType="number-pad"
              placeholderTextColor={themeColors.secondaryText}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: themeColors.text }]}>
              University
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
              value={university}
              onChangeText={setUniversity}
              placeholder="Your university"
              placeholderTextColor={themeColors.secondaryText}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: themeColors.text }]}>
              Major
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
              value={major}
              onChangeText={setMajor}
              placeholder="Your major"
              placeholderTextColor={themeColors.secondaryText}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: themeColors.text }]}>
              Year
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
              value={year}
              onChangeText={setYear}
              placeholder="Your year"
              placeholderTextColor={themeColors.secondaryText}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: themeColors.text }]}>
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
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              placeholderTextColor={themeColors.secondaryText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              { backgroundColor: themeColors.primary },
            ]}
            onPress={handleSaveProfile}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Account section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Account
          </Text>

          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: themeColors.error }]}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color={themeColors.error}
            />
            <Text style={[styles.logoutText, { color: themeColors.error }]}>
              Logout
            </Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
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
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 100,
  },
  saveButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  logoutText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
});

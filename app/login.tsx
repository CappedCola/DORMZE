import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/styles/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const { theme } = useTheme();
  const themeColors = colors[theme];

  const validateEmail = (email: string) => {
    if (!email) return false;
    const isEduEmail = email.toLowerCase().endsWith('.edu');
    return isEduEmail;
  };

  const handleLogin = () => {
    // Reset error state
    setEmailError('');

    // Validate email is a .edu address
    if (!validateEmail(email)) {
      setEmailError('Only .edu email addresses are allowed');
      return;
    }

    // Proceed to the main app
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: themeColors.background },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={[styles.appName, { color: themeColors.primary }]}>
            DORMZE
          </Text>
          <Text style={[styles.tagline, { color: themeColors.secondaryText }]}>
            Find your perfect roommate match
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.eduEmailNotice}>
            <Text
              style={[
                styles.eduEmailText,
                { color: themeColors.secondaryText },
              ]}
            >
              DORMZE is exclusively for students with .edu email addresses
            </Text>
          </View>

          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: themeColors.inputBackground,
                borderColor: emailError
                  ? themeColors.error
                  : themeColors.border,
              },
            ]}
          >
            <TextInput
              placeholder="Email (.edu only)"
              placeholderTextColor={themeColors.secondaryText}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError && validateEmail(text)) {
                  setEmailError('');
                }
              }}
              style={[styles.input, { color: themeColors.text }]}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {emailError ? (
            <Text style={[styles.errorText, { color: themeColors.error }]}>
              {emailError}
            </Text>
          ) : null}

          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: themeColors.inputBackground,
                borderColor: themeColors.border,
              },
            ]}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={themeColors.secondaryText}
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { color: themeColors.text }]}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeColors.primary }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotText, { color: themeColors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text
            style={[styles.signupText, { color: themeColors.secondaryText }]}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity>
            <Text style={[styles.signupLink, { color: themeColors.primary }]}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 36,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  eduEmailNotice: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  eduEmailText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
    marginLeft: 4,
  },
  inputContainer: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});

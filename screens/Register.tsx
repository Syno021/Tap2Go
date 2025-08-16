import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  useColorScheme,
  Dimensions,
} from "react-native";
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

export default function Register() {
  const { width: windowWidth } = useWindowDimensions();
  const colorScheme = useColorScheme();
  
  const isDark = colorScheme === 'dark';
  const primaryColor = Colors[colorScheme ?? 'light'].tint;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const isMobile = windowWidth < 600;
  const formWidth = isMobile ? "100%" : 400;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8f9ff' }]}>
      {/* Premium Background Elements */}
      <View style={[
        styles.backgroundAccent, 
        { backgroundColor: isDark ? '#1a1a2e' : '#6c63ff' }
      ]} />
      
      {/* Floating Elements */}
      <View style={[styles.floatingElement, styles.element1, { backgroundColor: primaryColor }]} />
      <View style={[styles.floatingElement, styles.element2, { backgroundColor: primaryColor }]} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
            onPress={() => router.push("/")}
          >
            <Text style={[styles.backButtonText, { color: isDark ? '#fff' : '#2d3748' }]}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#666' : '#8892b0' }]}>
              CREATE ACCOUNT
            </Text>
            <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
              Join Tap2Go
            </Text>
            <View style={[styles.headerUnderline, { backgroundColor: primaryColor }]} />
          </View>
        </View>

        {/* Form Container */}
        <View style={[
          styles.formContainer, 
          { 
            width: formWidth,
            backgroundColor: isDark ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
          }
        ]}>
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#a0a0a0' : '#4a5568' }]}>
              FULL NAME
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: focusedInput === 'name' ? primaryColor : (isDark ? '#333' : '#e2e8f0'),
                  backgroundColor: isDark ? '#111' : '#fff',
                  color: isDark ? '#fff' : '#2d3748',
                }
              ]}
              placeholder="Enter your full name"
              placeholderTextColor={isDark ? '#666' : '#a0aec0'}
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#a0a0a0' : '#4a5568' }]}>
              EMAIL ADDRESS
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: focusedInput === 'email' ? primaryColor : (isDark ? '#333' : '#e2e8f0'),
                  backgroundColor: isDark ? '#111' : '#fff',
                  color: isDark ? '#fff' : '#2d3748',
                }
              ]}
              placeholder="Enter your email"
              placeholderTextColor={isDark ? '#666' : '#a0aec0'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#a0a0a0' : '#4a5568' }]}>
              PASSWORD
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: focusedInput === 'password' ? primaryColor : (isDark ? '#333' : '#e2e8f0'),
                  backgroundColor: isDark ? '#111' : '#fff',
                  color: isDark ? '#fff' : '#2d3748',
                }
              ]}
              placeholder="Create a password"
              placeholderTextColor={isDark ? '#666' : '#a0aec0'}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#a0a0a0' : '#4a5568' }]}>
              CONFIRM PASSWORD
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: focusedInput === 'confirmPassword' ? primaryColor : (isDark ? '#333' : '#e2e8f0'),
                  backgroundColor: isDark ? '#111' : '#fff',
                  color: isDark ? '#fff' : '#2d3748',
                }
              ]}
              placeholder="Confirm your password"
              placeholderTextColor={isDark ? '#666' : '#a0aec0'}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              { 
                backgroundColor: primaryColor,
                shadowColor: primaryColor,
                marginTop: 20
              }
            ]}
            onPress={() => router.push("/login")}
            activeOpacity={0.9}
          >
            <Text style={styles.loginButtonText}>Create Account</Text>
            <View style={styles.buttonArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.registerContainer}>
          <Text style={[styles.registerText, { color: isDark ? '#888' : '#718096' }]}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={[styles.registerLink, { color: primaryColor }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative' as const,
  },
  backgroundAccent: {
    position: 'absolute' as const,
    top: 0,
    right: 0,
    width: width * 0.8,
    height: height * 0.3,
    borderBottomLeftRadius: 100,
    opacity: 0.3,
  },
  floatingElement: {
    position: 'absolute' as const,
    borderRadius: 20,
    opacity: 0.1,
  },
  element1: {
    top: '20%',
    left: '10%',
    width: 100,
    height: 100,
    transform: [{ rotate: '45deg' }],
  },
  element2: {
    bottom: '30%',
    right: '15%',
    width: 150,
    height: 150,
    transform: [{ rotate: '-15deg' }],
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center' as const,
    paddingVertical: 40,
  },
  header: {
    width: '100%',
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center' as const,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    marginBottom: 8,
  },
  headerUnderline: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  formContainer: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  loginButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600' as const,
    marginRight: 8,
  },
  buttonArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  arrowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600' as const,
  },
  registerContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginTop: 24,
  },
  registerText: {
    fontSize: 16,
  },
  registerLink: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginLeft: 8,
  },
});

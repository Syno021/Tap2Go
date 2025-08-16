import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { RootStackParamList } from "../app/navigation/AppNavigator";
import styles from "../css/authStyles";
import { createUser, verifyUser } from "../src/database";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { width } = useWindowDimensions();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  const isMobile = width < 600;
  const formWidth = isMobile ? "100%" : 400;

  // Animation values
  const slideAnim = useSharedValue(0);
  const loginOpacity = useSharedValue(1);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const user = await verifyUser(username, password);
      if (user) {
        // Login successful
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  const handleRegister = async () => {
    if (!regUsername || !regPassword || !regConfirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await createUser({ username: regUsername, password: regPassword });
      Alert.alert('Success', 'Account created successfully');
      // Slide back to login
      slideToLogin();
      // Clear registration fields
      setRegUsername('');
      setRegPassword('');
      setRegConfirmPassword('');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Registration failed');
    }
  };

  const slideToRegister = () => {
    'worklet';
    slideAnim.value = withTiming(1, {
      duration: 300,
      easing: Platform.OS === 'web' ? Easing.ease : undefined,
    });
    loginOpacity.value = withTiming(0, {
      duration: 200,
      easing: Platform.OS === 'web' ? Easing.ease : undefined,
    });
  };

  const slideToLogin = () => {
    'worklet';
    slideAnim.value = withTiming(0, {
      duration: 300,
      easing: Platform.OS === 'web' ? Easing.ease : undefined,
    });
    loginOpacity.value = withTiming(1, {
      duration: 200,
      easing: Platform.OS === 'web' ? Easing.ease : undefined,
    });
  };

  const loginCardStyle = useAnimatedStyle(() => {
    return {
      opacity: loginOpacity.value,
      transform: [
        {
          translateX: interpolate(
            slideAnim.value,
            [0, 1],
            [0, -width]
          ),
        },
      ],
    };
  });

  const registerCardStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        slideAnim.value,
        [0, 1],
        [0, 1]
      ),
      transform: [
        {
          translateX: interpolate(
            slideAnim.value,
            [0, 1],
            [width, 0]
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={[styles.cardsContainer, { width: formWidth }]}>
        {/* Login Card */}
        <Animated.View style={[styles.card, loginCardStyle]}>
          <Text style={styles.cardTitle}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleLogin}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Don't have an account?</Text>
            <TouchableOpacity onPress={slideToRegister}>
              <Text style={styles.link}> Register</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Register Card */}
        <Animated.View style={[styles.card, registerCardStyle, styles.registerCard]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={slideToLogin}
          >
            <Text style={styles.backButtonText}>← Back to Login</Text>
          </TouchableOpacity>

          <Text style={styles.cardTitle}>Create Account</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            autoCapitalize="none"
            value={regUsername}
            onChangeText={setRegUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={regPassword}
            onChangeText={setRegPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={regConfirmPassword}
            onChangeText={setRegConfirmPassword}
          />

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleRegister}
          >
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

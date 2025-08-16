// App.tsx
// CRITICAL: Import polyfills FIRST, before any other imports
import './src/polyfills';

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import AppNavigator from "./app/navigation/AppNavigator";
import { initDatabase } from "./src/database";

export default function App() {
  useEffect(() => {
    const initDb = async () => {
      try {
        await initDatabase();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Database initialization error:', error);
        Alert.alert(
          'Error',
          'Failed to initialize the database. Please restart the app.'
        );
      }
    };

    initDb();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
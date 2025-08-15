import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import styles from "../css/homeStyles";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { width } = useWindowDimensions();

  const isMobile = width < 600;
  const cardWidth = isMobile ? "48%" : "30%";

  return (
    <View style={{ flex: 1 }}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[styles.headerBtn, styles.loginBtn]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.headerBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

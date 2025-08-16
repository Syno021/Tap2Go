import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const primaryColor = "#FF6B00"; // adjust if you have a theme color

export default function Explore() {
  return (
    <View style={styles.container}>
    

      {/* Send Payment Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/sendPay")}
      >
        <Ionicons name="send" size={40} color={primaryColor} />
        <Text style={styles.cardText}>Send Payment</Text>
      </TouchableOpacity>

      {/* Receive Payment Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/receivePay")}
      >
        <Ionicons name="download" size={40} color={primaryColor} />
        <Text style={styles.cardText}>Receive Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: 180,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

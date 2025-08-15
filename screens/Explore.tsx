import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ExploreStackParamList } from '../app/navigation/ExploreStack';

type ExploreNavigationProp = NativeStackNavigationProp<ExploreStackParamList, 'Explore'>;

export default function Explore() {
  const navigation = useNavigation<ExploreNavigationProp>();
  const userInitials = 'JD';

  const options = [
    { label: 'View Regions', icon: <Ionicons name="location-outline" size={22} color="#FF8C42" />, route: 'sendPay' },
    { label: 'View Books', icon: <Ionicons name="book-outline" size={22} color="#FF8C42" />, route: 'receivePay' },
  ];

  return (
    <View>
      {/* Header */}
      <View>
        <Text>Explore</Text>
        <Text>{userInitials}</Text>
      </View>

      {/* Content */}
      <ScrollView>
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate({ name: item.route as any, params: undefined })}
          >
            <View>
              <View>{item.icon}</View>
              <Text>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={22} color="#aaa" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

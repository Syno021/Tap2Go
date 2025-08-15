import { View } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}
    />
  );
}

import { Text, TextProps, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export default function ThemedText(props: TextProps) {
  const colorScheme = useColorScheme();
  return (
    <Text
      {...props}
      style={[
        {
          color: Colors[colorScheme ?? 'light'].text,
        },
        props.style,
      ]}
    />
  );
}

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';

if (Platform.OS === 'web') {
  // Polyfills for web
  if (typeof window !== 'undefined') {
    window.requestAnimationFrame = window.requestAnimationFrame || function(callback) {
      setTimeout(callback, 1000 / 60);
    };
  }
}

AppRegistry.registerComponent(appName, () => App);

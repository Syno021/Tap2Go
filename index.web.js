import './src/polyfills';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Register the app
AppRegistry.registerComponent(appName, () => App);

// Setup web-specific rendering
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root')
});

import { router } from 'expo-router';
import { Dimensions, Image, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import ThemedText from '../components/ThemedText';
import ThemedView from '../components/ThemedView';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const primaryColor = Colors[colorScheme ?? 'light'].tint;

  return (
    <ThemedView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8f9ff' }]}>
      {/* Premium Background Elements */}
      <View style={[
        styles.backgroundAccent, 
        { backgroundColor: isDark ? '#1a1a2e' : '#6c63ff' }
      ]} />
      
      {/* Floating Elements */}
      <View style={[styles.floatingElement, styles.element1, { backgroundColor: primaryColor }]} />
      <View style={[styles.floatingElement, styles.element2, { backgroundColor: primaryColor }]} />
      
      <View style={styles.contentContainer}>
        {/* Logo Section with Glow Effect */}
        <View style={styles.logoSection}>
          <View style={[styles.logoContainer, { shadowColor: primaryColor }]}>
            <Image 
              source={require('../assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.nfcBadge, { backgroundColor: primaryColor }]}>
            <ThemedText style={styles.badgeText}>NFC Ready</ThemedText>
          </View>
        </View>
        
        {/* Premium Typography */}
        <View style={styles.textSection}>
          <ThemedText style={[styles.welcomeText, { color: isDark ? '#666' : '#8892b0' }]}>
            WELCOME TO
          </ThemedText>
          <ThemedText style={[styles.brandTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
            Tap2Go
          </ThemedText>
          <View style={[styles.underline, { backgroundColor: primaryColor }]} />
          
          <ThemedText style={[styles.tagline, { color: isDark ? '#a0a0a0' : '#4a5568' }]}>
            The Future of Digital Payments
          </ThemedText>
          
          <ThemedText style={[styles.description, { color: isDark ? '#888' : '#718096' }]}>
            Seamless NFC payments that work offline and sync automatically when connected. Split bills, manage multiple wallets, and pay instantly.
          </ThemedText>
        </View>
        
        {/* Feature Highlights */}
        <View style={styles.featuresGrid}>
          <View style={[styles.featureCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <ThemedText style={styles.featureIcon}>⚡</ThemedText>
            <ThemedText style={[styles.featureTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
              Instant
            </ThemedText>
          </View>
          
          <View style={[styles.featureCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <ThemedText style={styles.featureIcon}>🔒</ThemedText>
            <ThemedText style={[styles.featureTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
              Secure
            </ThemedText>
          </View>
          
          <View style={[styles.featureCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <ThemedText style={styles.featureIcon}>📱</ThemedText>
            <ThemedText style={[styles.featureTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
              Smart
            </ThemedText>
          </View>
        </View>
        
        {/* Premium CTA */}
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: primaryColor, shadowColor: primaryColor }]}
          onPress={() => router.push('/login')}
          activeOpacity={0.9}
        >
          <ThemedText style={styles.buttonText}>Start Your Journey</ThemedText>
          <View style={styles.buttonArrow}>
            <ThemedText style={styles.arrowText}>→</ThemedText>
          </View>
        </TouchableOpacity>
        
        {/* Secondary Action */}
        <TouchableOpacity style={styles.secondaryAction}>
          <ThemedText style={[styles.secondaryText, { color: isDark ? '#888' : '#718096' }]}>
            Learn about our technology
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    opacity: 0.1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.1,
  },
  element1: {
    width: 120,
    height: 120,
    top: 100,
    right: -20,
  },
  element2: {
    width: 80,
    height: 80,
    bottom: 200,
    left: -10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 50,
    position: 'relative',
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 80,
    padding: 25,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logo: {
    width: 100,
    height: 100,
  },
  nfcBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 48,
    fontWeight: '200',
    letterSpacing: -1,
    marginBottom: 8,
  },
  underline: {
    width: 60,
    height: 3,
    borderRadius: 2,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 320,
    fontWeight: '400',
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 280,
    marginBottom: 50,
  },
  featureCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    width: 80,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 50,
    width: '100%',
    maxWidth: 300,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonArrow: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
  },
  secondaryAction: {
    paddingVertical: 12,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
    letterSpacing: 0.3,
  },
});
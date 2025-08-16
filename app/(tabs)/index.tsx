import React from 'react';
import { 
  Dimensions, 
  StyleSheet, 
  TouchableOpacity, 
  useColorScheme, 
  View,
  Text,
  StatusBar,
  ScrollView
} from 'react-native';

// Define colors since we don't have the Colors constant
const Colors = {
  light: {
    tint: '#6c63ff',
  },
  dark: {
    tint: '#8b5cf6',
  }
};

const { width, height } = Dimensions.get('window');

// Quick data for home
const quickData = {
  balance: 2676.75,
  pendingCount: 2
};

const quickActions = [
  { id: 'pay', title: 'Pay', icon: '💳', color: '#6c63ff' },
  { id: 'request', title: 'Request', icon: '📥', color: '#10b981' },
  { id: 'split', title: 'Split Bill', icon: '🔄', color: '#f59e0b' },
  { id: 'scan', title: 'Scan QR', icon: '📱', color: '#ef4444' }
];

export default function Home() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const primaryColor = Colors[colorScheme ?? 'light'].tint;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8f9ff' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Premium Background */}
      <View style={[
        styles.backgroundAccent, 
        { backgroundColor: isDark ? '#1a1a2e' : '#6c63ff' }
      ]} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: isDark ? '#888' : '#718096' }]}>
              Welcome back
            </Text>
            <Text style={[styles.userName, { color: isDark ? '#fff' : '#2d3748' }]}>
              Alex Johnson
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Overview */}
        <View style={[styles.balanceCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
          <Text style={[styles.balanceLabel, { color: isDark ? '#888' : '#718096' }]}>
            Total Balance
          </Text>
          <Text style={[styles.balanceAmount, { color: isDark ? '#fff' : '#2d3748' }]}>
            ${quickData.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          {quickData.pendingCount > 0 && (
            <View style={styles.pendingContainer}>
              <Text style={[styles.pendingText, { color: '#f59e0b' }]}>
                {quickData.pendingCount} transactions pending sync
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
            Quick Actions
          </Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Text style={styles.actionEmoji}>{action.icon}</Text>
                </View>
                <Text style={[styles.actionTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* NFC Status */}
        <View style={[styles.nfcCard, { backgroundColor: primaryColor }]}>
          <View style={styles.nfcContent}>
            <View style={styles.nfcLeft}>
              <Text style={styles.nfcIcon}>📱</Text>
              <View style={styles.nfcText}>
                <Text style={styles.nfcTitle}>NFC Ready</Text>
                <Text style={styles.nfcSubtitle}>Tap to pay anywhere</Text>
              </View>
            </View>
            <View style={styles.nfcIndicator}>
              <View style={styles.nfcDot} />
            </View>
          </View>
        </View>

        {/* Wallet Preview */}
        <View style={styles.walletSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
              My Wallets
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: primaryColor }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.walletPreview, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <View style={styles.walletRow}>
              <View style={[styles.walletIcon, { backgroundColor: primaryColor + '20' }]}>
                <Text style={styles.walletEmoji}>💳</Text>
              </View>
              <View style={styles.walletInfo}>
                <Text style={[styles.walletName, { color: isDark ? '#fff' : '#2d3748' }]}>
                  Main Wallet
                </Text>
                <Text style={[styles.walletBalance, { color: isDark ? '#888' : '#718096' }]}>
                  $2,450.75
                </Text>
              </View>
            </View>
            
            <View style={styles.walletRow}>
              <View style={[styles.walletIcon, { backgroundColor: '#10b981' + '20' }]}>
                <Text style={styles.walletEmoji}>🍽️</Text>
              </View>
              <View style={styles.walletInfo}>
                <Text style={[styles.walletName, { color: isDark ? '#fff' : '#2d3748' }]}>
                  Dining Wallet
                </Text>
                <Text style={[styles.walletBalance, { color: isDark ? '#888' : '#718096' }]}>
                  $180.20
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
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
    height: height * 0.25,
    opacity: 0.1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconText: {
    fontSize: 18,
  },
  balanceCard: {
    marginHorizontal: 30,
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '200',
    letterSpacing: -1,
  },
  pendingContainer: {
    marginTop: 12,
  },
  pendingText: {
    fontSize: 13,
    fontWeight: '500',
  },
  actionsSection: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 90) / 4,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionEmoji: {
    fontSize: 20,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  nfcCard: {
    marginHorizontal: 30,
    borderRadius: 16,
    marginBottom: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  nfcContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  nfcLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nfcIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  nfcText: {
    flex: 1,
  },
  nfcTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  nfcSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '400',
  },
  nfcIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nfcDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  walletSection: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  walletPreview: {
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  walletEmoji: {
    fontSize: 16,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  walletBalance: {
    fontSize: 13,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 80,
  },
});
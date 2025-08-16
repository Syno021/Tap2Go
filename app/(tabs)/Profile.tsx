import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  useColorScheme, 
  ScrollView,
  Dimensions,
  StatusBar,
  Text,
  Image,
  Switch
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

// Dummy user data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  memberSince: 'March 2024',
  avatarInitials: 'AJ',
  verificationLevel: 'Premium',
  totalTransactions: 847,
  totalSpent: 12450.75,
  favoriteWallet: 'Main Wallet',
  nfcEnabled: true,
  biometricEnabled: true,
  offlineLimit: 500.00
};

// Dummy wallets data
const walletsData = [
  {
    id: 'main',
    name: 'Main Wallet',
    balance: 2450.75,
    currency: 'USD',
    color: '#6c63ff',
    icon: '💳',
    isDefault: true
  },
  {
    id: 'crypto',
    name: 'Crypto Wallet',
    balance: 0.05432,
    currency: 'BTC',
    color: '#f7931a',
    icon: '₿',
    isDefault: false
  },
  {
    id: 'dining',
    name: 'Dining Wallet',
    balance: 180.20,
    currency: 'USD',
    color: '#10b981',
    icon: '🍽️',
    isDefault: false
  },
  {
    id: 'transport',
    name: 'Transport Wallet',
    balance: 45.80,
    currency: 'USD',
    color: '#3b82f6',
    icon: '🚇',
    isDefault: false
  }
];

const menuItems = [
  { id: 'security', title: 'Security Settings', icon: '🔒', hasArrow: true },
  { id: 'payment', title: 'Payment Methods', icon: '💳', hasArrow: true },
  { id: 'notifications', title: 'Notifications', icon: '🔔', hasArrow: true },
  { id: 'limits', title: 'Spending Limits', icon: '📊', hasArrow: true },
  { id: 'support', title: 'Help & Support', icon: '💬', hasArrow: true },
  { id: 'about', title: 'About Tap2Go', icon: 'ℹ️', hasArrow: true },
];

export default function Profile() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const primaryColor = Colors[colorScheme ?? 'light'].tint;
  
  const [nfcEnabled, setNfcEnabled] = useState(userData.nfcEnabled);
  const [biometricEnabled, setBiometricEnabled] = useState(userData.biometricEnabled);

  const formatBalance = (balance, currency) => {
    if (currency === 'BTC') {
      return `${balance.toFixed(6)} ${currency}`;
    }
    return `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8f9ff' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Premium Background Elements */}
      <View style={[
        styles.backgroundAccent, 
        { backgroundColor: isDark ? '#1a1a2e' : '#6c63ff' }
      ]} />
      
      {/* Floating Elements */}
      <View style={[styles.floatingElement, styles.element1, { backgroundColor: primaryColor }]} />
      <View style={[styles.floatingElement, styles.element2, { backgroundColor: primaryColor }]} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header with Avatar */}
        <View style={styles.headerSection}>
          <View style={[styles.avatarContainer, { borderColor: primaryColor }]}>
            <Text style={[styles.avatarText, { color: primaryColor }]}>
              {userData.avatarInitials}
            </Text>
            <View style={[styles.verificationBadge, { backgroundColor: primaryColor }]}>
              <Text style={styles.badgeText}>✓</Text>
            </View>
          </View>
          
          <Text style={[styles.userName, { color: isDark ? '#fff' : '#2d3748' }]}>
            {userData.name}
          </Text>
          <Text style={[styles.userEmail, { color: isDark ? '#888' : '#718096' }]}>
            {userData.email}
          </Text>
          <Text style={[styles.memberSince, { color: isDark ? '#666' : '#a0aec0' }]}>
            Member since {userData.memberSince}
          </Text>

          {/* Verification Level */}
          <View style={[styles.verificationCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <View style={styles.verificationHeader}>
              <Text style={[styles.verificationTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
                Verification Level
              </Text>
              <View style={[styles.levelBadge, { backgroundColor: primaryColor }]}>
                <Text style={styles.levelText}>{userData.verificationLevel}</Text>
              </View>
            </View>
            <Text style={[styles.verificationDesc, { color: isDark ? '#888' : '#718096' }]}>
              Full access to all Tap2Go features including offline payments and high-value transfers
            </Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
            Your Activity
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={[styles.statValue, { color: isDark ? '#fff' : '#2d3748' }]}>
                {userData.totalTransactions.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? '#888' : '#718096' }]}>
                Total Transactions
              </Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={[styles.statValue, { color: isDark ? '#fff' : '#2d3748' }]}>
                ${userData.totalSpent.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, { color: isDark ? '#888' : '#718096' }]}>
                Total Spent
              </Text>
            </View>
          </View>
        </View>

        {/* Wallets Section */}
        <View style={styles.walletsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
              My Wallets
            </Text>
            <TouchableOpacity style={styles.addWalletButton}>
              <Text style={[styles.addWalletText, { color: primaryColor }]}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          {walletsData.map((wallet) => (
            <TouchableOpacity
              key={wallet.id}
              style={[styles.walletCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
              activeOpacity={0.7}
            >
              <View style={styles.walletMain}>
                <View style={[styles.walletIcon, { backgroundColor: wallet.color + '20' }]}>
                  <Text style={styles.walletIconText}>{wallet.icon}</Text>
                </View>
                
                <View style={styles.walletDetails}>
                  <View style={styles.walletHeader}>
                    <Text style={[styles.walletName, { color: isDark ? '#fff' : '#2d3748' }]}>
                      {wallet.name}
                    </Text>
                    {wallet.isDefault && (
                      <View style={[styles.defaultBadge, { backgroundColor: wallet.color }]}>
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.walletBalance, { color: wallet.color }]}>
                    {formatBalance(wallet.balance, wallet.currency)}
                  </Text>
                </View>
              </View>
              
              <Text style={[styles.walletArrow, { color: isDark ? '#666' : '#a0aec0' }]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Settings */}
        <View style={styles.quickSettingsSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
            Quick Settings
          </Text>
          
          <View style={[styles.settingCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingIcon}>📱</Text>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
                    NFC Payments
                  </Text>
                  <Text style={[styles.settingDesc, { color: isDark ? '#888' : '#718096' }]}>
                    Enable tap-to-pay functionality
                  </Text>
                </View>
              </View>
              <Switch
                value={nfcEnabled}
                onValueChange={setNfcEnabled}
                trackColor={{ false: '#767577', true: primaryColor + '40' }}
                thumbColor={nfcEnabled ? primaryColor : '#f4f3f4'}
              />
            </View>
          </View>
          
          <View style={[styles.settingCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingIcon}>🔒</Text>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
                    Biometric Security
                  </Text>
                  <Text style={[styles.settingDesc, { color: isDark ? '#888' : '#718096' }]}>
                    Use fingerprint/Face ID for authentication
                  </Text>
                </View>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#767577', true: primaryColor + '40' }}
                thumbColor={biometricEnabled ? primaryColor : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Offline Spending Limit */}
          <View style={[styles.settingCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingIcon}>💳</Text>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
                    Offline Spending Limit
                  </Text>
                  <Text style={[styles.settingDesc, { color: isDark ? '#888' : '#718096' }]}>
                    Current limit: ${userData.offlineLimit.toFixed(2)}
                  </Text>
                </View>
              </View>
              <Text style={[styles.settingArrow, { color: isDark ? '#666' : '#a0aec0' }]}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
            Settings & Support
          </Text>
          
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemContent}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={[styles.menuTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
                  {item.title}
                </Text>
              </View>
              {item.hasArrow && (
                <Text style={[styles.menuArrow, { color: isDark ? '#666' : '#a0aec0' }]}>›</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutSection}>
          <TouchableOpacity
            style={[styles.signOutButton, { backgroundColor: isDark ? '#2a1a1a' : '#fff', borderColor: '#EF4444' }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.signOutText, { color: '#EF4444' }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={[styles.versionText, { color: isDark ? '#666' : '#a0aec0' }]}>
            Tap2Go v2.1.0 • Build 2024.08.16
          </Text>
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
  floatingElement: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.05,
  },
  element1: {
    width: 80,
    height: 80,
    top: 120,
    right: -20,
  },
  element2: {
    width: 60,
    height: 60,
    bottom: 180,
    left: -15,
  },
  scrollContainer: {
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    marginBottom: 20,
    position: 'relative',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '300',
    letterSpacing: 2,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  userName: {
    fontSize: 28,
    fontWeight: '200',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 20,
  },
  verificationCard: {
    padding: 20,
    borderRadius: 16,
    width: '100%',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verificationDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  statsSection: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  walletsSection: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addWalletButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addWalletText: {
    fontSize: 14,
    fontWeight: '600',
  },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  walletMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  walletIconText: {
    fontSize: 20,
  },
  walletDetails: {
    flex: 1,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  walletName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  defaultText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  walletBalance: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  walletArrow: {
    fontSize: 20,
    fontWeight: '300',
  },
  quickSettingsSection: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  settingCard: {
    borderRadius: 12,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 13,
    fontWeight: '400',
  },
  settingArrow: {
    fontSize: 20,
    fontWeight: '300',
  },
  menuSection: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 20,
    fontWeight: '300',
  },
  signOutSection: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  signOutButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  versionSection: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '400',
  },
  bottomPadding: {
    height: 80,
  },
});
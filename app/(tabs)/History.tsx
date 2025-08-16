import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  useColorScheme, 
  ScrollView,
  Dimensions,
  StatusBar,
  Text
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

// Dummy transaction data showcasing Tap2Go features
const dummyTransactions = [
  {
    id: 'tx_001',
    type: 'nfc_payment',
    amount: -25.50,
    currency: 'USD',
    recipient: 'Coffee Bean Café',
    status: 'confirmed',
    timestamp: new Date('2025-08-16T08:30:00'),
    method: 'NFC Tap',
    wallet: 'Main Wallet',
    fraudScore: 0.02,
    location: 'Downtown',
    icon: '☕'
  },
  {
    id: 'tx_002',
    type: 'split_payment',
    amount: -45.00,
    currency: 'USD',
    recipient: 'Dinner Split - 4 people',
    status: 'pending',
    timestamp: new Date('2025-08-15T19:15:00'),
    method: 'Split Payment',
    wallet: 'Dining Wallet',
    fraudScore: 0.01,
    splitWith: ['Alice', 'Bob', 'Charlie'],
    icon: '🍽️'
  },
  {
    id: 'tx_003',
    type: 'token_purchase',
    amount: +100.00,
    currency: 'BTC',
    recipient: 'Token Purchase',
    status: 'confirmed',
    timestamp: new Date('2025-08-15T14:22:00'),
    method: 'Exchange',
    wallet: 'Crypto Wallet',
    fraudScore: 0.00,
    exchangeRate: 0.0023,
    icon: '₿'
  },
  {
    id: 'tx_004',
    type: 'offline_payment',
    amount: -15.75,
    currency: 'USD',
    recipient: 'Metro Transit',
    status: 'syncing',
    timestamp: new Date('2025-08-15T12:45:00'),
    method: 'Offline QR',
    wallet: 'Transport Wallet',
    fraudScore: 0.00,
    syncProgress: 75,
    icon: '🚇'
  },
  {
    id: 'tx_005',
    type: 'wallet_transfer',
    amount: -50.00,
    currency: 'USD',
    recipient: 'Main → Dining Wallet',
    status: 'confirmed',
    timestamp: new Date('2025-08-14T16:30:00'),
    method: 'Internal Transfer',
    wallet: 'Main Wallet',
    fraudScore: 0.00,
    icon: '💱'
  },
  {
    id: 'tx_006',
    type: 'suspicious_blocked',
    amount: -200.00,
    currency: 'USD',
    recipient: 'Unknown Merchant',
    status: 'blocked',
    timestamp: new Date('2025-08-14T23:45:00'),
    method: 'NFC Tap',
    wallet: 'Main Wallet',
    fraudScore: 0.89,
    aiReason: 'Unusual time & amount',
    icon: '⚠️'
  }
];

const filterOptions = ['All', 'Confirmed', 'Pending', 'Blocked'];

export default function History() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const primaryColor = Colors[colorScheme ?? 'light'].tint;
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredTransactions = dummyTransactions.filter(tx => {
    if (selectedFilter === 'All') return true;
    return tx.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'syncing': return '#3B82F6';
      case 'blocked': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getAmountColor = (amount) => {
    return amount > 0 ? '#10B981' : (isDark ? '#fff' : '#1F2937');
  };

  const formatAmount = (amount, currency) => {
    const prefix = amount > 0 ? '+' : '';
    if (currency === 'BTC') {
      return `${prefix}${amount.toFixed(6)} ${currency}`;
    }
    return `${prefix}$${Math.abs(amount).toFixed(2)}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
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
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.pageTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
            Transaction History
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#888' : '#718096' }]}>
            Your payment activity across all wallets
          </Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContainer}
          >
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  {
                    backgroundColor: selectedFilter === filter 
                      ? primaryColor 
                      : (isDark ? '#1a1a1a' : '#fff'),
                    borderColor: selectedFilter === filter 
                      ? primaryColor 
                      : 'rgba(255, 255, 255, 0.1)'
                  }
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  {
                    color: selectedFilter === filter 
                      ? '#fff' 
                      : (isDark ? '#888' : '#718096')
                  }
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsContainer}>
          {filteredTransactions.map((transaction, index) => (
            <TouchableOpacity
              key={transaction.id}
              style={[
                styles.transactionCard,
                {
                  backgroundColor: isDark ? '#1a1a1a' : '#fff',
                  borderColor: transaction.status === 'blocked' 
                    ? '#EF4444' 
                    : 'rgba(255, 255, 255, 0.1)',
                  borderWidth: transaction.status === 'blocked' ? 1 : 0
                }
              ]}
              activeOpacity={0.7}
            >
              {/* Transaction Icon & Main Info */}
              <View style={styles.transactionMain}>
                <View style={[styles.iconContainer, { backgroundColor: isDark ? '#2a2a2a' : '#f7fafc' }]}>
                  <Text style={styles.transactionIcon}>
                    {transaction.icon}
                  </Text>
                </View>
                
                <View style={styles.transactionDetails}>
                  <View style={styles.transactionHeader}>
                    <Text style={[styles.recipientName, { color: isDark ? '#fff' : '#2d3748' }]}>
                      {transaction.recipient}
                    </Text>
                    <Text style={[styles.transactionAmount, { color: getAmountColor(transaction.amount) }]}>
                      {formatAmount(transaction.amount, transaction.currency)}
                    </Text>
                  </View>
                  
                  <View style={styles.transactionMeta}>
                    <Text style={[styles.transactionMethod, { color: isDark ? '#888' : '#718096' }]}>
                      {transaction.method} • {transaction.wallet}
                    </Text>
                    <Text style={[styles.transactionTime, { color: isDark ? '#666' : '#a0aec0' }]}>
                      {formatDate(transaction.timestamp)} {formatTime(transaction.timestamp)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Status & Additional Info */}
              <View style={styles.transactionFooter}>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(transaction.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Text>
                  
                  {transaction.status === 'syncing' && (
                    <Text style={[styles.syncProgress, { color: isDark ? '#666' : '#a0aec0' }]}>
                      {transaction.syncProgress}%
                    </Text>
                  )}
                </View>

                {/* AI Fraud Score */}
                {transaction.fraudScore > 0 && (
                  <View style={styles.fraudContainer}>
                    <Text style={[styles.fraudLabel, { color: isDark ? '#666' : '#a0aec0' }]}>
                      AI Score:
                    </Text>
                    <Text style={[
                      styles.fraudScore,
                      { color: transaction.fraudScore > 0.5 ? '#EF4444' : '#10B981' }
                    ]}>
                      {(transaction.fraudScore * 100).toFixed(0)}%
                    </Text>
                  </View>
                )}

                {/* Split Payment Info */}
                {transaction.type === 'split_payment' && transaction.splitWith && (
                  <View style={styles.splitInfo}>
                    <Text style={[styles.splitLabel, { color: isDark ? '#666' : '#a0aec0' }]}>
                      Split with: {transaction.splitWith.join(', ')}
                    </Text>
                  </View>
                )}

                {/* AI Block Reason */}
                {transaction.status === 'blocked' && transaction.aiReason && (
                  <View style={styles.blockReason}>
                    <Text style={[styles.blockLabel, { color: '#EF4444' }]}>
                      Blocked: {transaction.aiReason}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📱</Text>
            <Text style={[styles.emptyTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
              No {selectedFilter.toLowerCase()} transactions
            </Text>
            <Text style={[styles.emptyDescription, { color: isDark ? '#888' : '#718096' }]}>
              Your {selectedFilter.toLowerCase()} transactions will appear here
            </Text>
          </View>
        )}

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
    height: height * 0.3,
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
    width: 100,
    height: 100,
    top: 80,
    right: -30,
  },
  element2: {
    width: 60,
    height: 60,
    bottom: 150,
    left: -20,
  },
  scrollContainer: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '200',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterScrollContainer: {
    paddingHorizontal: 30,
    paddingRight: 50,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  transactionsContainer: {
    paddingHorizontal: 30,
  },
  transactionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  transactionMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionIcon: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  transactionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionMethod: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  transactionTime: {
    fontSize: 11,
    fontWeight: '400',
  },
  transactionFooter: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  syncProgress: {
    fontSize: 11,
    marginLeft: 8,
    fontWeight: '500',
  },
  fraudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  fraudLabel: {
    fontSize: 11,
    marginRight: 6,
  },
  fraudScore: {
    fontSize: 11,
    fontWeight: '600',
  },
  splitInfo: {
    marginTop: 4,
  },
  splitLabel: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  blockReason: {
    marginTop: 4,
  },
  blockLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
});
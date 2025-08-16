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

// Dummy data
const dashboardData = {
  totalBalance: 2676.75,
  monthlySpending: 1240.50,
  pendingTransactions: 3,
  offlineLimit: 500.00,
  usedOfflineLimit: 127.50
};

const recentTransactions = [
  {
    id: '1',
    recipient: 'Coffee Bean',
    amount: -5.50,
    status: 'confirmed',
    icon: '☕',
    time: '2 min ago'
  },
  {
    id: '2',
    recipient: 'Lunch Split',
    amount: -12.25,
    status: 'pending',
    icon: '🍽️',
    time: '1 hour ago'
  },
  {
    id: '3',
    recipient: 'Token Purchase',
    amount: +50.00,
    status: 'confirmed',
    icon: '₿',
    time: '3 hours ago'
  }
];

const quickActions = [
  { id: 'send', title: 'Send', icon: '📤', color: '#6c63ff' },
  { id: 'request', title: 'Request', icon: '📥', color: '#10b981' },
  { id: 'split', title: 'Split', icon: '🔄', color: '#f59e0b' },
  { id: 'scan', title: 'Scan', icon: '📷', color: '#ef4444' }
];

export default function Dashboard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const primaryColor = Colors[colorScheme ?? 'light'].tint;

  const getStatusColor = (status) => {
    return status === 'confirmed' ? '#10B981' : '#F59E0B';
  };

  const formatAmount = (amount) => {
    const prefix = amount > 0 ? '+' : '';
    return `${prefix}$${Math.abs(amount).toFixed(2)}`;
  };

  const offlineUsagePercent = (dashboardData.usedOfflineLimit / dashboardData.offlineLimit) * 100;

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
              Good morning
            </Text>
            <Text style={[styles.userName, { color: isDark ? '#fff' : '#2d3748' }]}>
              Alex
            </Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
          <Text style={[styles.balanceLabel, { color: isDark ? '#888' : '#718096' }]}>
            Total Balance
          </Text>
          <Text style={[styles.balanceAmount, { color: isDark ? '#fff' : '#2d3748' }]}>
            ${dashboardData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          <View style={styles.balanceFooter}>
            <View style={styles.spendingInfo}>
              <Text style={[styles.spendingLabel, { color: isDark ? '#666' : '#a0aec0' }]}>
                This month: 
              </Text>
              <Text style={[styles.spendingAmount, { color: '#ef4444' }]}>
                -${dashboardData.monthlySpending.toFixed(2)}
              </Text>
            </View>
            {dashboardData.pendingTransactions > 0 && (
              <View style={[styles.pendingBadge, { backgroundColor: '#f59e0b' }]}>
                <Text style={styles.pendingText}>
                  {dashboardData.pendingTransactions} Pending
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
            Quick Actions
          </Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionButton, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
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

        {/* Offline Limit Status */}
        <View style={[styles.offlineCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
          <View style={styles.offlineHeader}>
            <Text style={[styles.offlineTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
              Offline Spending Limit
            </Text>
            <Text style={[styles.offlineAmount, { color: primaryColor }]}>
              ${dashboardData.usedOfflineLimit.toFixed(2)} / ${dashboardData.offlineLimit.toFixed(2)}
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: isDark ? '#2a2a2a' : '#e5e7eb' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: primaryColor,
                    width: `${offlineUsagePercent}%`
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: isDark ? '#888' : '#718096' }]}>
              {offlineUsagePercent.toFixed(0)}% used
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#2d3748' }]}>
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: primaryColor }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={[styles.transactionItem, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
              activeOpacity={0.7}
            >
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: isDark ? '#2a2a2a' : '#f7fafc' }]}>
                  <Text style={styles.transactionEmoji}>{transaction.icon}</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={[styles.transactionName, { color: isDark ? '#fff' : '#2d3748' }]}>
                    {transaction.recipient}
                  </Text>
                  <Text style={[styles.transactionTime, { color: isDark ? '#666' : '#a0aec0' }]}>
                    {transaction.time}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount, 
                  { color: transaction.amount > 0 ? '#10B981' : (isDark ? '#fff' : '#1F2937') }
                ]}>
                  {formatAmount(transaction.amount)}
                </Text>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(transaction.status) }]} />
              </View>
            </TouchableOpacity>
          ))}
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
  notificationButton: {
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
  notificationIcon: {
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
    marginBottom: 16,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spendingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spendingLabel: {
    fontSize: 13,
  },
  spendingAmount: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  pendingBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  quickActionsSection: {
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
  actionButton: {
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
  },
  offlineCard: {
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  offlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  offlineTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  offlineAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activitySection: {
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
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    fontWeight: '400',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  bottomPadding: {
    height: 80,
  },
});
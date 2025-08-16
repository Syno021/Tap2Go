import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
  StatusBar
} from "react-native";
// TypeScript declarations for Paystack
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        onClose: () => void;
        callback: (response: { reference: string; status: string }) => void;
        onError: (error: { message?: string }) => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

const { width } = Dimensions.get('window');
const PAYSTACKKEY = "pk_test_0553ae959cc7caa09e540a64fef7a6e62cbbbe43";

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

export default function WalletExplore() {
  const [balance, setBalance] = useState(0); // Mock initial balance
  const [isLoading, setIsLoading] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'deposit',
      amount: 5000,
      date: '2024-01-15',
      status: 'completed',
      reference: 'PSK_123456789'
    },
    {
      id: '2',
      type: 'transfer',
      amount: -2500,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 10000,
      date: '2024-01-13',
      status: 'completed',
      reference: 'PSK_987654321'
    }
  ]);

  // Load Paystack script for web (if running on web)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadPaystackScript();
    }
  }, []);

  const loadPaystackScript = () => {
    if (typeof document !== 'undefined' && !document.querySelector('script[src*="paystack"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        console.log('Paystack script loaded successfully');
      };
      document.head.appendChild(script);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const generateTransactionReference = (): string => {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleDeposit = (amount: number = 1000) => {
    setIsLoading(true);

    // For React Native, you would typically use a WebView or redirect to Paystack
    // For web, we can use the Paystack popup
    if (typeof window !== 'undefined' && window.PaystackPop) {
      const reference = generateTransactionReference();
      
      const handler = window.PaystackPop.setup({
        key: PAYSTACKKEY,
        email: 'user@example.com', // Replace with actual user email
        amount: amount * 100, // Convert to kobo/cents
        currency: 'ZAR',
        ref: reference,
        onClose: () => {
          setIsLoading(false);
          console.log('Payment window closed');
        },
        callback: (response: any) => {
          console.log('Payment successful:', response);
          handleSuccessfulPayment(response.reference, amount);
          setIsLoading(false);
        },
        onError: (error: any) => {
          console.error('Payment error:', error);
          Alert.alert('Payment Error', error.message || 'Payment failed. Please try again.');
          setIsLoading(false);
        }
      });

      handler.openIframe();
    } else {
      // For React Native, implement WebView or deep linking to Paystack
      Alert.alert(
        'Deposit',
        `This would normally open Paystack payment for ${formatCurrency(amount)}. For demo purposes, simulating successful payment.`,
        [
          { text: 'Cancel', style: 'cancel', onPress: () => setIsLoading(false) },
          { 
            text: 'Simulate Success', 
            onPress: () => {
              setTimeout(() => {
                handleSuccessfulPayment(generateTransactionReference(), amount);
                setIsLoading(false);
              }, 2000);
            }
          }
        ]
      );
    }
  };

  const handleSuccessfulPayment = (reference: string, amount: number) => {
    // Update balance
    setBalance(prevBalance => prevBalance + amount);
    
    // Add transaction to history
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      reference: reference
    };
    
    setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);
    
    Alert.alert(
      'Deposit Successful!',
      `${formatCurrency(amount)} has been added to your wallet.`,
      [{ text: 'OK' }]
    );
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'arrow-down-circle';
      case 'withdrawal':
        return 'arrow-up-circle';
      case 'transfer':
        return 'send';
      default:
        return 'card';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return '#4CAF50';
      case 'withdrawal':
        return '#F44336';
      case 'transfer':
        return '#FF9800';
      default:
        return '#2196F3';
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with Balance */}
        <View style={styles.header}>
          <View style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
              
              <View style={styles.balanceActions}>
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => {/* Toggle balance visibility */}}
                >
                  <Ionicons name="eye" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.depositButton]}
            onPress={() => handleDeposit(1000)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Ionicons name="add-circle" size={24} color="white" />
            )}
            <Text style={styles.actionButtonText}>
              {isLoading ? 'Processing...' : 'Deposit'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.transferButton]}
            onPress={() => router.push("/sendPay")}
          >
            <Ionicons name="send" size={24} color="white" />
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.receiveButton]}
            onPress={() => router.push("/receivePay")}
          >
            <Ionicons name="qr-code" size={24} color="white" />
            <Text style={styles.actionButtonText}>Receive</Text>
          </TouchableOpacity>
        </View>

        {/* Deposit Amount Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Deposit</Text>
          <View style={styles.depositOptions}>
            {[500, 1000, 2500, 5000].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={styles.depositOption}
                onPress={() => handleDeposit(amount)}
                disabled={isLoading}
              >
                <Text style={styles.depositOptionText}>
                  {formatCurrency(amount)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push("/transactions")}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: `${getTransactionColor(transaction.type)}20` }
                  ]}>
                    <Ionicons
                      name={getTransactionIcon(transaction.type)}
                      size={20}
                      color={getTransactionColor(transaction.type)}
                    />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionType}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                    {transaction.reference && (
                      <Text style={styles.transactionReference}>
                        {transaction.reference}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={[
                    styles.transactionAmount,
                    {
                      color: transaction.type === 'deposit' 
                        ? '#4CAF50' 
                        : transaction.amount < 0 
                          ? '#F44336' 
                          : '#333'
                    }
                  ]}>
                    {transaction.type === 'deposit' ? '+' : ''}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: transaction.status === 'completed' ? '#4CAF50' : '#FF9800' }
                  ]}>
                    <Text style={styles.statusText}>
                      {transaction.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1a237e',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // Create gradient effect with multiple background layers
    position: 'relative',
  },
  headerGradient: {
    backgroundColor: '#3949ab',
    borderRadius: 20,
    padding: 20,
    // Simulate gradient with opacity overlay
    opacity: 0.95,
  },
  headerContent: {
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 10,
  },
  balanceLabel: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 5,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  balanceActions: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  eyeButton: {
    padding: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  depositButton: {
    backgroundColor: '#4CAF50',
  },
  withdrawButton: {
    backgroundColor: '#FF5722',
  },
  transferButton: {
    backgroundColor: '#2196F3',
  },
  receiveButton: {
    backgroundColor: '#9C27B0',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  seeAllText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  depositOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  depositOption: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  depositOptionText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  transactionsList: {
    gap: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  transactionReference: {
    fontSize: 10,
    color: '#999',
    marginTop: 1,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
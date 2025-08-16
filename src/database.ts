import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  username: string;
  password: string;
}

// Single database implementation using AsyncStorage
class StorageDatabase {
  private readonly USERS_KEY = '@tap2go/users';

  constructor() {}

  async init(): Promise<void> {
    console.log('AsyncStorage database initialized');
    return Promise.resolve();
  }

  async createUser(user: Omit<User, 'id'>, hashedPassword: string): Promise<void> {
    try {
      // Get existing users
      const usersJson = await AsyncStorage.getItem(this.USERS_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      // Check if username exists
      if (users.some(u => u.username === user.username)) {
        throw new Error('Username already exists');
      }

      // Store user data
      const newUser: User = {
        id: Date.now(), // Simple way to generate unique IDs
        username: user.username,
        password: hashedPassword
      };

      users.push(newUser);
      await AsyncStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async verifyUser(username: string, password: string): Promise<User | null> {
    try {
      const usersJson = await AsyncStorage.getItem(this.USERS_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      const user = users.find(u => u.username === username);
      if (!user) {
        return null;
      }

      const isValid = await bcrypt.compare(password, user.password);
      return isValid ? user : null;
    } catch (error) {
      console.error('Error verifying user:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const usersJson = await AsyncStorage.getItem(this.USERS_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];
      return users.map(user => ({
        id: user.id,
        username: user.username,
        password: ''
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async clearAllUsers(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.USERS_KEY);
    } catch (error) {
      console.error('Error clearing users:', error);
      throw error;
    }
  }

  isAvailable(): boolean {
    return true;
  }
}

// Singleton database instance
const database = new StorageDatabase();

// Public API
export const initDatabase = async (): Promise<void> => {
  return database.init();
};

export const createUser = async (user: Omit<User, 'id'>): Promise<void> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return database.createUser(user, hashedPassword);
};

export const verifyUser = async (username: string, password: string): Promise<User | null> => {
  return database.verifyUser(username, password);
};

export const getAllUsers = async (): Promise<User[]> => {
  return database.getAllUsers();
};

export const clearAllUsers = async (): Promise<void> => {
  return database.clearAllUsers();
};

export const isDatabaseAvailable = (): boolean => {
  return database.isAvailable();
};

export const getDatabaseType = (): string => {
  return 'AsyncStorage';
};

// Legacy compatibility
export const getDatabase = () => {
  return null;
};
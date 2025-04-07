import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '@/types/auth';
import { db } from '@/lib/database';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}>({
  authState: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  },
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          setAuthState({
            user: JSON.parse(user),
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Error checking authentication status',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const database = await db;
      const user = await database.get(
        'SELECT * FROM users WHERE username = ?',
        [credentials.username]
      );

      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const { password_hash, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      router.push('/dashboard');
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const database = await db;
      const existingUser = await database.get(
        'SELECT * FROM users WHERE username = ?',
        [credentials.username]
      );

      if (existingUser) {
        throw new Error('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      const result = await database.run(
        'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
        [credentials.username, hashedPassword, credentials.role]
      );

      if (!result.lastID) {
        throw new Error('Failed to create user');
      }

      const newUser: User = {
        id: result.lastID,
        username: credentials.username,
        role: credentials.role,
        created_at: new Date().toISOString(),
      };

      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      router.push('/login');
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 
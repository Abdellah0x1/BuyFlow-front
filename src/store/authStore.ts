import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  email?: string;
  roles: string[]
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

    }),
    {
      name: 'auth-storage', // The name of the key in localStorage
    }
  )
);

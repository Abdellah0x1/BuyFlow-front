import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUser, logoutRequest } from '@/api/auth';
import { useCartStore } from './cardStore';

interface User {
  username: string;
  email?: string;
  roles: string[]
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  hasCheckedAuth: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

let authRequestId = 0;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: false,
      hasCheckedAuth: false,
      login: (userData) => {
        authRequestId += 1;
        set({ user: userData, isAuthenticated: true, isCheckingAuth: false, hasCheckedAuth: true })
      },
      logout: async () => {
        authRequestId += 1;
        try {
          await logoutRequest();
        } finally {
          set({ user: null, isAuthenticated: false, isCheckingAuth: false, hasCheckedAuth: true });
          useCartStore.getState().clearCart();
        }
      },
      checkAuth: async () => {
        const requestId = authRequestId + 1;
        authRequestId = requestId;
        set({ isCheckingAuth: true });

        const res = await getCurrentUser();

        if (requestId !== authRequestId) {
          return;
        }

        if (res.success) {
          set({
            user: res.data,
            isAuthenticated: true,
            isCheckingAuth: false,
            hasCheckedAuth: true,
          });
          return;
        }

        set({
          user: null,
          isAuthenticated: false,
          isCheckingAuth: false,
          hasCheckedAuth: true,
        });
        useCartStore.getState().clearCart();
      },

    }),
    {
      name: 'auth-storage', // The name of the key in localStorage
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as Partial<AuthState> | undefined;
        return { user: state?.user ?? null };
      },
      partialize: (state) => ({ user: state.user }),
    }
  )
);

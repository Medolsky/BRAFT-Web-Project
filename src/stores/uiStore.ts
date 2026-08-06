import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  isCartDrawerOpen: boolean;
  isChatWidgetOpen: boolean;
  toggleDarkMode: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setChatWidgetOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isDarkMode: true,
      isMobileMenuOpen: false,
      isCartDrawerOpen: false,
      isChatWidgetOpen: false,
      toggleDarkMode: () =>
        set((state) => {
          const next = !state.isDarkMode;
          if (next) {
            document.body.classList.remove('light-mode');
          } else {
            document.body.classList.add('light-mode');
          }
          return { isDarkMode: next };
        }),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      setCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),
      setChatWidgetOpen: (open) => set({ isChatWidgetOpen: open }),
    }),
    {
      name: 'webcraft-ui-theme',
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);

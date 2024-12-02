// sidebarStore.js
import { create } from 'zustand';

interface SidebarState {
  isMobileOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isMobileOpen: false,
  openSidebar: () => set({ isMobileOpen: true }),
  closeSidebar: () => set({ isMobileOpen: false }),
  toggleSidebar: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
}));

export default useSidebarStore;

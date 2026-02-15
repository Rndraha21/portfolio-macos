import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface WindowItem {
  isOpen: boolean;
  zIndex: number;
  data: any | null;
}

interface WindowState {
  windows: Record<string, WindowItem>;
  nextZIndex: number;
}

interface WindowActions {
  openWindow: (windowKey: string, data?: any) => void;
  closeWindow: (windowKey: string) => void;
  focusWindow: (windowKey: string) => void;
}

type windowStore = WindowState & WindowActions;

const useWindowStore = create<windowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX,

    openWindow: (windowKey: any, data = null) => {
      set((state: any) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      });
    },

    closeWindow: (windowKey: any) =>
      set((state: any) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    focusWindow: (windowKey: any) =>
      set((state: any) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;

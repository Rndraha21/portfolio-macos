import { locations } from "@constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_LOCATION = locations.work;

export interface LocationItem {
  id: number;
  name: string;
  icon: string;
  kind: string;
  type?: string;
  position?: string;
  windowPosition?: string;

  fileType?: string;
  href?: string;
  imageUrl?: string;
  subtitle?: string;
  description?: string[];

  children?: LocationItem[];
}

export interface Locations {
  work: LocationItem;
  about: LocationItem;
  resume: LocationItem;
  trash: LocationItem;
}

interface LocationState {
  activeLocation: LocationItem;
  setActiveLocation: (location: LocationItem | null) => void;
  resetActiveLocation: () => void;
}

const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION as LocationItem,

    setActiveLocation: (location) =>
      set((state) => {
        if (location) {
          state.activeLocation = location;
        }
      }),

    resetActiveLocation: () =>
      set((state: any) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  })),
);

export default useLocationStore;

import { create } from "zustand";

type UiState = {
  bookingOpen: boolean;
  bookingTourSlug: string | null;
  openBooking: (tourSlug?: string | null) => void;
  closeBooking: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  bookingOpen: false,
  bookingTourSlug: null,
  openBooking: (tourSlug = null) =>
    set({ bookingOpen: true, bookingTourSlug: tourSlug }),
  closeBooking: () => set({ bookingOpen: false, bookingTourSlug: null }),
}));

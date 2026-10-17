import { create } from "zustand";
import { emptyFilters, type TourFilters } from "@/lib/catalog";

type UiState = {
  bookingOpen: boolean;
  bookingTourSlug: string | null;
  /** Departure date picked on a tour page, prefilled in the form. */
  bookingDate: string | null;
  filters: TourFilters;
  openBooking: (tourSlug?: string | null, date?: string | null) => void;
  closeBooking: () => void;
  setFilters: (patch: Partial<TourFilters>) => void;
  clearFilters: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  bookingOpen: false,
  bookingTourSlug: null,
  bookingDate: null,
  filters: emptyFilters,
  openBooking: (tourSlug = null, date = null) =>
    set({ bookingOpen: true, bookingTourSlug: tourSlug, bookingDate: date }),
  closeBooking: () => set({ bookingOpen: false, bookingTourSlug: null, bookingDate: null }),
  setFilters: (patch) =>
    set((state) => ({ filters: { ...state.filters, ...patch } })),
  clearFilters: () => set({ filters: emptyFilters }),
}));

export function scrollToId(id: string) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
}

import { create } from "zustand";
import { emptyFilters, type TourFilters } from "@/lib/catalog";

type UiState = {
  bookingOpen: boolean;
  bookingTourSlug: string | null;
  filters: TourFilters;
  openBooking: (tourSlug?: string | null) => void;
  closeBooking: () => void;
  setFilters: (patch: Partial<TourFilters>) => void;
  clearFilters: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  bookingOpen: false,
  bookingTourSlug: null,
  filters: emptyFilters,
  openBooking: (tourSlug = null) =>
    set({ bookingOpen: true, bookingTourSlug: tourSlug }),
  closeBooking: () => set({ bookingOpen: false, bookingTourSlug: null }),
  setFilters: (patch) =>
    set((state) => ({ filters: { ...state.filters, ...patch } })),
  clearFilters: () => set({ filters: emptyFilters }),
}));

export function scrollToId(id: string) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
}

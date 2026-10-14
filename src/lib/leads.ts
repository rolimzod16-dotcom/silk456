import { mutateDoc, readDoc } from "@/lib/store";

export type BookingStatus = "new" | "confirmed" | "closed";

export type BookingLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  tourSlug: string;
  tourTitle: string;
  travelers: number;
  travelDate: string;
  message: string | null;
  status: BookingStatus;
  createdAt: string;
};

export type InquiryLead = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

type LeadStore = {
  bookings: BookingLead[];
  inquiries: InquiryLead[];
};

const DOC_ID = "silk456-leads.json";
const EMPTY: LeadStore = { bookings: [], inquiries: [] };

function normalize(value: unknown): LeadStore {
  const record = value && typeof value === "object" ? (value as Partial<LeadStore>) : {};
  return {
    bookings: Array.isArray(record.bookings) ? record.bookings : [],
    inquiries: Array.isArray(record.inquiries) ? record.inquiries : [],
  };
}

async function readStore(): Promise<LeadStore> {
  const value = await readDoc(DOC_ID);
  return value ? normalize(value) : EMPTY;
}

function mutate<T>(change: (store: LeadStore) => { store: LeadStore; result: T }): Promise<T> {
  return mutateDoc(DOC_ID, readStore, change);
}

export function listLeads() {
  return readStore();
}

export function addBooking(input: Omit<BookingLead, "id" | "status" | "createdAt">) {
  const booking: BookingLead = {
    ...input,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  return mutate((store) => ({
    store: { ...store, bookings: [booking, ...store.bookings] },
    result: booking,
  }));
}

export function addInquiry(input: Omit<InquiryLead, "id" | "createdAt">) {
  const inquiry: InquiryLead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  return mutate((store) => ({
    store: { ...store, inquiries: [inquiry, ...store.inquiries] },
    result: inquiry,
  }));
}

export function setBookingStatus(id: string, status: BookingStatus) {
  return mutate((store) => ({
    store: {
      ...store,
      bookings: store.bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking,
      ),
    },
    result: true,
  }));
}

export function deleteLead(kind: "booking" | "inquiry", id: string) {
  return mutate((store) => ({
    store: {
      bookings: kind === "booking" ? store.bookings.filter((item) => item.id !== id) : store.bookings,
      inquiries: kind === "inquiry" ? store.inquiries.filter((item) => item.id !== id) : store.inquiries,
    },
    result: true,
  }));
}

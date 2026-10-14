import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/site/inner-pages";
import { LegalText } from "@/components/site/legal-text";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <SimplePage page="terms">
      <LegalText>
        <h2>Booking requests</h2>
        <p>
          A booking request sent through this website is not a payment and does not oblige you to
          travel. A manager will contact you to confirm dates, availability and the final price.
        </p>
        <h2>Prices</h2>
        <p>
          Prices on the website are per person and indicative. The final price depends on dates,
          group size and the services you choose, and is fixed once your trip is confirmed.
        </p>
        <h2>Payment</h2>
        <p>
          No prepayment is required on the website. Payment terms are agreed with your manager after
          the itinerary is confirmed.
        </p>
        <h2>Questions</h2>
        <p>
          If anything is unclear,{" "}
          <Link href="/contact" className="text-primary underline">
            write to us
          </Link>{" "}
          before you travel.
        </p>
      </LegalText>
    </SimplePage>
  );
}

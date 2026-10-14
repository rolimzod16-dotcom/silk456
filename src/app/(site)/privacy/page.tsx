import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/site/inner-pages";
import { LegalText } from "@/components/site/legal-text";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <SimplePage page="privacy">
      <LegalText>
        <h2>What we collect</h2>
        <p>
          When you send a booking request, a contact message or subscribe to our newsletter, we
          receive the details you enter: your name, email, phone number, preferred tour, dates,
          number of travelers and your message.
        </p>
        <h2>How we use it</h2>
        <p>
          We use these details only to reply to you, prepare your itinerary and confirm your trip.
          We do not sell or share your data with third parties for marketing.
        </p>
        <h2>Partners</h2>
        <p>
          To organise a confirmed trip we may pass the necessary details to the hotels, drivers and
          guides who serve your route, and to authorities when a visa or permit requires it.
        </p>
        <h2>Your rights</h2>
        <p>
          You can ask us to update or delete your details at any time — just{" "}
          <Link href="/contact" className="text-primary underline">
            contact us
          </Link>
          .
        </p>
      </LegalText>
    </SimplePage>
  );
}

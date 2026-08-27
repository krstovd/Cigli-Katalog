import type { Metadata } from "next";
import InspirationClient from "./InspirationClient";

export const metadata: Metadata = {
  title: "Инспирација",
  description: "Идеи за уредување простор со декоративни цигли Zmaga.",
  alternates: { canonical: "/inspiration" },
  openGraph: { url: "/inspiration" },
};

export default function Inspiration() {
  return <InspirationClient />;
}

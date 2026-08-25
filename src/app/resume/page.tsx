import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";

export const metadata: Metadata = {
  title: "Resume — Sriram Kancherla",
  description: "View and download Sriram Kancherla's resume.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return <ResumeView />;
}

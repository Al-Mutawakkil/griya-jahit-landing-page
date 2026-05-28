import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
  title: string;
  description: string;
  examples: string[];
  icon: LucideIcon;
}

export interface SupplyItem {
  id: string;
  name: string;
  category: "kain" | "benang" | "resleting" | "kancing" | "jarum" | "mesin";
  description: string;
  note: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  context: string;
}

export interface Announcement {
  id: string;
  message: string;
  label?: string;
  href?: string;
  active?: boolean;
  dismissible?: boolean;
  tone?: "info" | "notice" | "urgent";
}

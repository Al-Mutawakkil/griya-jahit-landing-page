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

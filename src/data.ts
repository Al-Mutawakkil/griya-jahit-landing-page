import {
  BadgeCheck,
  Package,
  Ruler,
  Scissors,
  Shirt,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { ServiceItem, SupplyItem, Testimonial } from "./types";

export const WHATSAPP_NUMBER = "628123456789";
export const DISPLAY_PHONE = "0812-3456-789";

export const serviceItems: ServiceItem[] = [
  {
    title: "Permak & Reparasi Cepat",
    description:
      "Untuk pakaian harian yang perlu segera dipakai kembali. Kami cek kondisi dulu supaya harga dan waktu pengerjaan jelas di awal.",
    examples: ["Potong celana", "Ganti resleting", "Kecilkan baju/celana", "Tambal sobek"],
    icon: Scissors,
  },
  {
    title: "Jahit Pakaian Baru",
    description:
      "Jahit baju dari bahan sendiri untuk kebutuhan kerja, sekolah, keluarga, acara, atau pesanan satuan.",
    examples: ["Kemeja", "Seragam", "Gamis", "Kebaya sederhana"],
    icon: Shirt,
  },
  {
    title: "Toko Alat & Bahan Jahit",
    description:
      "Perlengkapan menjahit untuk kebutuhan rumah tangga, sekolah, hobi, dan penjahit rumahan sekitar Cibarusah.",
    examples: ["Kain", "Benang", "Kancing", "Jarum dan resleting"],
    icon: Package,
  },
];

export const popularRepairs = [
  { title: "Potong Celana", detail: "Jeans, chino, bahan kantor, rok, atau seragam.", icon: Ruler },
  { title: "Ganti Resleting", detail: "Celana, jaket, gamis, rok, tas kecil, dan pakaian harian.", icon: Wrench },
  { title: "Kecilkan Ukuran", detail: "Pinggang, samping baju, lengan, atau panjang pakaian.", icon: Shirt },
  { title: "Tambal & Rapikan", detail: "Sobek kecil, jahitan lepas, kancing hilang, atau obras ulang.", icon: BadgeCheck },
  { title: "Jahit Seragam", detail: "Untuk sekolah, kerja, komunitas, keluarga, atau acara lokal.", icon: Sparkles },
  { title: "Jahit Dari Bahan Sendiri", detail: "Bawa kain dan contoh model, lalu diskusikan langsung.", icon: Scissors },
];

export const supplies: SupplyItem[] = [
  {
    id: "benang-astra",
    name: "Benang jahit aneka warna",
    category: "benang",
    description: "Benang untuk jahit pakaian harian, seragam, kerajinan, dan kebutuhan rumah.",
    note: "Tanyakan stok warna",
  },
  {
    id: "resleting-ykk",
    name: "Resleting celana, jaket, rok",
    category: "resleting",
    description: "Pilihan resleting biasa, jaket, Jepang, dan ukuran populer untuk reparasi.",
    note: "Cek ukuran dulu",
  },
  {
    id: "kancing-baju",
    name: "Kancing baju & celana",
    category: "kancing",
    description: "Kancing kemeja, kancing celana, kancing jepit, dan pilihan warna dasar.",
    note: "Bisa beli eceran",
  },
  {
    id: "jarum-tangan-mesin",
    name: "Jarum tangan & jarum mesin",
    category: "jarum",
    description: "Jarum untuk menjahit manual, mesin rumahan, dan kebutuhan kecil harian.",
    note: "Sebut tipe mesin",
  },
  {
    id: "kain-meteran",
    name: "Kain & bahan meteran",
    category: "kain",
    description: "Bahan untuk seragam, furing, kain bantu, dan kebutuhan jahit sederhana.",
    note: "Motif berubah-ubah",
  },
  {
    id: "alat-mesin",
    name: "Alat bantu mesin jahit",
    category: "mesin",
    description: "Spul, sekoci, minyak mesin, pendedel, meteran, dan perlengkapan kecil.",
    note: "Tanya kecocokan",
  },
  {
    id: "karet-pita",
    name: "Karet, pita, dan renda",
    category: "kain",
    description: "Aksesori jahit untuk pakaian anak, kerajinan, mukena, dan kebutuhan rumah.",
    note: "Beli sesuai meter",
  },
  {
    id: "peralatan-kecil",
    name: "Gunting, meteran, pendedel",
    category: "mesin",
    description: "Peralatan kecil untuk penjahit rumahan, siswa, dan kebutuhan reparasi sendiri.",
    note: "Cek stok toko",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Mas Rian",
    location: "Cibarusah Kota",
    context: "Permak celana kerja",
    quote:
      "Celana kerja kepanjangan bisa selesai cepat dan hasil lipatannya rapi. Enak karena harga dijelaskan dulu sebelum dikerjakan.",
  },
  {
    name: "Bu Lilis",
    location: "Sukamahi",
    context: "Beli perlengkapan jahit",
    quote:
      "Cari benang dan resleting tidak perlu jauh ke pasar. Bisa tanya stok lewat WhatsApp dulu, lalu tinggal ambil ke toko.",
  },
  {
    name: "Ibu Ratna",
    location: "Serang Baru",
    context: "Jahit seragam keluarga",
    quote:
      "Jahitannya rapi dan ukurannya pas. Pemiliknya sabar diajak diskusi model, terutama untuk bahan yang kami bawa sendiri.",
  },
];

export const categoryLabels: Record<SupplyItem["category"] | "semua", string> = {
  semua: "Semua",
  kain: "Kain",
  benang: "Benang",
  resleting: "Resleting",
  kancing: "Kancing",
  jarum: "Jarum",
  mesin: "Alat Mesin",
};

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

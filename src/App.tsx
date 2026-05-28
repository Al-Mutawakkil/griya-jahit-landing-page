import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  PackageSearch,
  Phone,
  Search,
  Send,
  Star,
  Store,
  X,
} from "lucide-react";
import {
  categoryLabels,
  createWhatsAppUrl,
  DISPLAY_PHONE,
  popularRepairs,
  serviceItems,
  supplies,
  testimonials,
} from "./data";
import type { SupplyItem, Testimonial } from "./types";

const heroImage = `${import.meta.env.BASE_URL}images/griya-jahit-workshop.png`;
const suppliesImage = `${import.meta.env.BASE_URL}images/alat-bahan-jahit.png`;

const repairMessage =
  "Halo Toko Jahit Fajar, saya mau tanya permak/jahit pakaian. Saya akan kirim foto kondisi pakaiannya untuk dicek dulu.";
const suppliesMessage =
  "Halo Toko Jahit Fajar, saya mau tanya stok alat atau bahan jahit. Apakah bisa dibantu cek ketersediaannya?";

const categories: Array<SupplyItem["category"] | "semua"> = [
  "semua",
  "kain",
  "benang",
  "resleting",
  "kancing",
  "jarum",
  "mesin",
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SupplyItem["category"] | "semua">("semua");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const filteredSupplies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return supplies.filter((item) => {
      const categoryMatches = category === "semua" || item.category === category;
      const queryMatches =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        categoryLabels[item.category].toLowerCase().includes(normalizedQuery);

      return categoryMatches && queryMatches;
    });
  }, [category, query]);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, []);

  const navItems = [
    { label: "Layanan", href: "#layanan" },
    { label: "Alat Jahit", href: "#alat-jahit" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "Lokasi", href: "#lokasi" },
  ];

  return (
    <div className="min-h-screen bg-cream text-stone-900">
      <div className="border-b border-stone-200 bg-stone-950 px-4 py-2 text-xs text-stone-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-clay-300" />
              Cibarusah, Kabupaten Bekasi
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-clay-300" />
              Senin-Sabtu, 08.00-18.00
            </span>
          </div>
          <a
            className="inline-flex w-fit items-center gap-1.5 font-semibold text-emerald-300 hover:text-emerald-200"
            href={createWhatsAppUrl("Halo Toko Jahit Fajar, saya mau bertanya.")}
            target="_blank"
            rel="noreferrer"
          >
            <Phone size={14} />
            {DISPLAY_PHONE}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-stone-200 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a className="flex items-center gap-3" href="#beranda" aria-label="Toko Jahit Fajar">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-clay-700 text-white shadow-sm">
              <Store size={22} />
            </span>
            <span>
              <span className="block font-serif text-xl font-bold leading-none text-stone-950">
                Toko Jahit Fajar
              </span>
              <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                Toko Alat-Alat Jahit Fajar
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-white hover:text-clay-700"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              className="hidden items-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-forest-800 sm:inline-flex"
              href={createWhatsAppUrl(repairMessage)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
            <button
              className="grid h-11 w-11 place-items-center rounded-lg border border-stone-200 bg-white text-stone-700 md:hidden"
              type="button"
              aria-label="Buka menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-stone-200 bg-cream px-4 py-3 md:hidden" aria-label="Navigasi mobile">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-stone-700 hover:bg-white"
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="beranda">
        <section className="overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-clay-200 bg-white px-3 py-1.5 text-xs font-bold text-clay-700 shadow-sm">
                <CheckCircle2 size={15} />
                Buka hari ini, bisa konsultasi dulu
              </div>

              <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                Toko Jahit Fajar
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-650 sm:text-lg">
                Toko Alat-Alat Jahit Fajar menyediakan kain, benang, kancing, jarum, resleting,
                dan perlengkapan mesin jahit, sekaligus melayani permak pakaian seperti potong
                celana, ganti resleting, dan jahit sederhana di Cibarusah.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-forest-700 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-forest-800"
                  href={createWhatsAppUrl(suppliesMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PackageSearch size={18} />
                  Tanya Stok via WhatsApp
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-250 bg-white px-6 py-3 text-sm font-bold text-stone-800 shadow-sm hover:border-clay-300 hover:text-clay-700"
                  href={createWhatsAppUrl(repairMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Send size={17} />
                  Kirim Foto Pakaian
                </a>
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ["Harga jelas", "Disepakati setelah pakaian dicek"],
                  ["Lokal Cibarusah", "Melayani sekitar Kabupaten Bekasi"],
                  ["Dua kebutuhan", "Toko perlengkapan dan jasa jahit"],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                    <p className="text-sm font-bold text-stone-950">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-stone-500">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-clay-100 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white bg-white shadow-2xl shadow-stone-300/60">
                <img
                  className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]"
                  src={heroImage}
                  alt="Interior Toko Jahit Fajar dengan mesin jahit dan rak kain"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/85 to-transparent p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-wide text-clay-100">Workshop rumah jahit</p>
                  <p className="mt-1 text-sm text-stone-100">
                    Alat jahit, bahan jahit, dan perbaikan pakaian harian dalam satu tempat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white px-4 py-16 sm:px-6 lg:px-8" id="layanan">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Pilih kebutuhan Anda"
              title="Belanja alat jahit atau tanya permak pakaian"
              description="Pembeli perlengkapan jahit dan pelanggan permak punya tujuan berbeda, jadi halaman ini memisahkannya sejak awal."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {serviceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-stone-200 bg-cream p-6 shadow-sm">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-clay-700 text-white">
                      <Icon size={23} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-stone-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
                    <ul className="mt-5 grid gap-2">
                      {item.examples.map((example) => (
                        <li key={example} className="flex items-center gap-2 text-sm font-medium text-stone-700">
                          <CheckCircle2 size={16} className="text-forest-700" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-clay-700">Permak populer</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
                  Untuk pakaian yang perlu cepat dipakai lagi
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  Kami tidak menampilkan estimator harga karena kondisi pakaian harus dilihat dulu.
                  Kirim foto lewat WhatsApp atau datang langsung, lalu kami jelaskan opsi, biaya,
                  dan waktu pengerjaan sebelum mulai.
                </p>
                <a
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-forest-700 px-6 py-3 text-sm font-bold text-white hover:bg-forest-800"
                  href={createWhatsAppUrl(repairMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  Kirim Foto untuk Dicek
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {popularRepairs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                      <Icon size={21} className="text-clay-700" />
                      <h3 className="mt-4 text-base font-bold text-stone-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-stone-600">{item.detail}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-stone-950 px-4 py-16 text-white sm:px-6 lg:px-8" id="alat-jahit">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-clay-200">Toko alat & bahan jahit</p>
                <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                  Cari benang, resleting, kancing, jarum, kain, atau alat mesin
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  Gunakan daftar ini sebagai katalog ringan. Stok dan warna bisa berubah, jadi CTA
                  diarahkan ke WhatsApp untuk konfirmasi sebelum pelanggan datang.
                </p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <img
                    className="aspect-[4/3] w-full object-cover"
                    src={suppliesImage}
                    alt="Benang, kancing, resleting, jarum, gunting, dan meteran jahit"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white p-5 text-stone-900 shadow-xl">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <label className="relative block md:w-72">
                    <span className="sr-only">Cari alat jahit</span>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
                    <input
                      className="min-h-11 w-full rounded-xl border border-stone-250 bg-stone-50 py-2 pl-10 pr-9 text-sm outline-none focus:border-clay-500 focus:bg-white"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Cari resleting, benang, jarum..."
                    />
                    {query && (
                      <button
                        className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                        type="button"
                        aria-label="Hapus pencarian"
                        onClick={() => setQuery("")}
                      >
                        <X size={15} />
                      </button>
                    )}
                  </label>

                  <a
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-forest-700 px-4 py-2 text-sm font-bold text-white hover:bg-forest-800"
                    href={createWhatsAppUrl(suppliesMessage)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tanya Stok
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`min-h-10 rounded-full border px-4 text-sm font-bold transition ${
                        category === item
                          ? "border-clay-700 bg-clay-700 text-white"
                          : "border-stone-200 bg-white text-stone-650 hover:border-clay-300 hover:text-clay-700"
                      }`}
                    >
                      {categoryLabels[item]}
                    </button>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {filteredSupplies.map((item) => (
                    <article key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-clay-700">
                            {categoryLabels[item.category]}
                          </p>
                          <h3 className="mt-1 text-sm font-bold leading-5 text-stone-950">{item.name}</h3>
                        </div>
                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-stone-500">
                          {item.note}
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-6 text-stone-600">{item.description}</p>
                      <a
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-900"
                        href={createWhatsAppUrl(
                          `Halo Toko Jahit Fajar, saya mau tanya stok ${item.name}. Apakah tersedia?`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Tanya barang ini
                        <ArrowRight size={14} />
                      </a>
                    </article>
                  ))}
                </div>

                {filteredSupplies.length === 0 && (
                  <div className="mt-5 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                    <PackageSearch className="mx-auto text-stone-400" size={34} />
                    <p className="mt-3 text-sm font-semibold text-stone-700">Barang tidak ditemukan.</p>
                    <button
                      className="mt-2 text-sm font-bold text-clay-700"
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setCategory("semua");
                      }}
                    >
                      Reset pencarian
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Cara kerja"
              title="Sederhana, tanpa janji harga palsu"
              description="Untuk jasa jahit dan permak, pelanggan tetap mendapat estimasi cepat, tetapi setelah kondisi pakaian dilihat terlebih dahulu."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {[
                ["1", "Kirim foto atau datang", "Tunjukkan bagian yang ingin dipermak, dijahit, atau barang yang dicari."],
                ["2", "Kami cek kebutuhan", "Kami lihat kondisi pakaian, bahan, ukuran, stok, dan tingkat kesulitan."],
                ["3", "Harga disepakati", "Biaya dan waktu pengerjaan dijelaskan sebelum pekerjaan dimulai."],
                ["4", "Ambil saat selesai", "Pelanggan dikabari saat pakaian atau barang siap diambil."],
              ].map(([number, title, detail]) => (
                <article key={number} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-clay-100 text-sm font-black text-clay-800">
                    {number}
                  </span>
                  <h3 className="mt-5 text-base font-bold text-stone-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <AnimatedTestimonials
          activeIndex={activeTestimonial}
          onChange={setActiveTestimonial}
          testimonials={testimonials}
        />

        <section className="px-4 py-16 sm:px-6 lg:px-8" id="lokasi">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-clay-700">Lokasi & kontak</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">
                Datang langsung atau tanya dulu lewat WhatsApp
              </h2>
              <div className="mt-6 grid gap-4 text-sm text-stone-650">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 flex-none text-clay-700" size={19} />
                  Area Cibarusah, Kabupaten Bekasi. Ganti dengan alamat toko lengkap saat siap dipublikasikan.
                </p>
                <p className="flex gap-3">
                  <Clock className="mt-0.5 flex-none text-clay-700" size={19} />
                  Senin-Sabtu, 08.00-18.00 WIB. Hari Minggu bisa dikonfirmasi dulu.
                </p>
                <p className="flex gap-3">
                  <Phone className="mt-0.5 flex-none text-clay-700" size={19} />
                  WhatsApp {DISPLAY_PHONE}
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-forest-700 px-6 py-3 text-sm font-bold text-white hover:bg-forest-800"
                  href={createWhatsAppUrl("Halo Toko Jahit Fajar, saya mau tanya alamat dan jam buka toko.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  Tanya Lokasi
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-250 bg-white px-6 py-3 text-sm font-bold text-stone-800 hover:border-clay-300 hover:text-clay-700"
                  href="https://maps.google.com/?q=Cibarusah%20Kabupaten%20Bekasi"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={18} />
                  Buka Google Maps
                </a>
              </div>
            </div>

            <div className="min-h-80 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <div className="grid h-full min-h-80 place-items-center bg-[linear-gradient(135deg,#f5efe7_25%,#ffffff_25%,#ffffff_50%,#f5efe7_50%,#f5efe7_75%,#ffffff_75%,#ffffff_100%)] bg-[length:32px_32px] p-8 text-center">
                <div className="rounded-2xl border border-stone-200 bg-white/95 p-6 shadow-sm">
                  <MapPin className="mx-auto text-clay-700" size={34} />
                  <p className="mt-3 font-bold text-stone-950">Area Cibarusah / Kabupaten Bekasi</p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-stone-600">
                    Placeholder peta. Saat alamat final tersedia, bagian ini bisa diganti dengan embed Google Maps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-stone-950 px-4 py-8 text-stone-300 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-serif text-lg font-bold text-white">Toko Jahit Fajar</p>
            <p className="mt-1 text-xs text-stone-400">Permak pakaian, jahit custom, alat & bahan jahit.</p>
          </div>
          <a
            className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
            href={createWhatsAppUrl(repairMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} />
            Hubungi via WhatsApp
          </a>
        </div>
      </footer>

      <a
        className="fixed bottom-4 right-4 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-bold text-white shadow-xl shadow-emerald-950/25 hover:bg-emerald-700 sm:hidden"
        href={createWhatsAppUrl(repairMessage)}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={19} />
        WhatsApp
      </a>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-clay-700">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-stone-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">{description}</p>
    </div>
  );
}

function AnimatedTestimonials({
  activeIndex,
  onChange,
  testimonials,
}: {
  activeIndex: number;
  onChange: (index: number) => void;
  testimonials: Testimonial[];
}) {
  const active = testimonials[activeIndex] ?? testimonials[0];

  if (!active) return null;

  return (
    <section className="overflow-hidden border-y border-stone-200 bg-white px-4 py-16 sm:px-6 lg:px-8" id="testimoni">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-clay-100 px-3 py-1.5 text-xs font-bold text-clay-800">
            <Star size={14} fill="currentColor" />
            Cerita pelanggan sekitar Cibarusah
          </div>
          <h2 className="mt-5 max-w-xl font-serif text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
            Dipakai untuk kebutuhan harian, bukan hanya acara besar
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            Ulasan ini mewakili tiga kebutuhan utama: permak cepat, belanja perlengkapan jahit,
            dan jahit pakaian dari bahan sendiri.
          </p>

          <div className="mt-8 flex items-center gap-2" aria-label="Pilih testimoni">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => onChange(index)}
                className="grid h-11 place-items-center rounded-full px-1"
                aria-label={`Lihat testimoni ${item.name}`}
                aria-pressed={activeIndex === index}
              >
                <span
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "w-10 bg-clay-700" : "w-2.5 bg-stone-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[430px] pb-6 pr-5">
          <div className="absolute inset-0 translate-x-5 translate-y-6 rounded-2xl border border-clay-100 bg-clay-100/50" />
          <div className="absolute inset-0 translate-x-2.5 translate-y-3 rounded-2xl border border-stone-200 bg-cream shadow-sm" />

          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className={`absolute inset-0 rounded-2xl border bg-cream p-6 shadow-xl shadow-stone-300/30 transition-all duration-500 sm:p-8 ${
                activeIndex === index
                  ? "z-10 translate-x-0 scale-100 border-clay-200 opacity-100"
                  : "z-0 -translate-x-3 scale-95 border-stone-200 opacity-0"
              }`}
              aria-hidden={activeIndex !== index}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1 text-amber-500" aria-label="Rating lima bintang">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={19} fill="currentColor" />
                    ))}
                  </div>
                  <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-bold text-stone-500">
                    {index + 1} / {testimonials.length}
                  </span>
                </div>

                <div className="relative mt-8 flex-1">
                  <p className="max-w-2xl text-xl font-semibold leading-9 text-stone-900 sm:text-2xl sm:leading-10">
                    {item.quote}
                  </p>
                </div>

                <div className="mt-8 border-t border-stone-200 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 flex-none place-items-center rounded-full border border-clay-200 bg-white font-serif text-xl font-bold text-clay-800">
                      {getInitials(item.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-950">{item.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-clay-700">{item.context}</p>
                      <p className="mt-1 text-sm text-stone-500">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


import { ArrowRight, BookOpen, Layers, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* ================= HERO ================= */}


      {/* ================= FEATURED ARTICLES ================= */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Artikel Unggulan
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Bacaan pilihan yang dikurasi untuk memperluas wawasan dan literasi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="group rounded-3xl border border-border bg-background p-6 hover:shadow-xl transition"
            >
              <div className="mb-4 h-40 rounded-2xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="size-16 text-primary/60" />
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                Judul Artikel Unggulan
              </h3>

              <p className="text-sm text-foreground/70 mb-4">
                Ringkasan singkat artikel untuk menarik minat pembaca.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Baca Selengkapnya
                <ArrowRight size={16} />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-10 text-center">
            Jelajahi Berdasarkan Kategori
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Pendidikan", icon: BookOpen },
              { title: "Budaya", icon: Layers },
              { title: "Sejarah", icon: Clock },
              { title: "Literasi", icon: BookOpen },
            ].map((cat, i) => (
              <div
                key={i}
                className="rounded-3xl p-8 bg-background border border-border text-center hover:scale-105 transition"
              >
                <cat.icon className="mx-auto mb-4 size-10 text-primary" />
                <h3 className="font-bold text-lg">{cat.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LATEST ARTICLES ================= */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black">Artikel Terbaru</h2>
          <a
            href="/artikel"
            className="inline-flex items-center gap-2 font-semibold text-primary"
          >
            Lihat Semua
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4].map((item) => (
            <article
              key={item}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl border border-border hover:bg-muted/30 transition"
            >
              <div className="h-32 w-full md:w-48 rounded-2xl bg-primary/10" />

              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  Judul Artikel Terbaru
                </h3>
                <p className="text-sm text-foreground/70 mb-3">
                  Deskripsi singkat artikel terbaru untuk preview pembaca.
                </p>
                <span className="text-xs text-foreground/50">
                  12 Januari 2026 · 5 menit baca
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-primary/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Dukung Literasi & Peradaban
          </h2>
          <p className="max-w-xl mx-auto text-foreground/70 mb-10">
            Donasikan buku atau bagikan artikel untuk menyebarkan ilmu
            pengetahuan.
          </p>

          <button className="px-12 py-5 rounded-3xl bg-primary font-black text-xl shadow-lg hover:scale-105 transition">
            Donasi Buku
          </button>
        </div>
      </section>
    </main>
  );
}

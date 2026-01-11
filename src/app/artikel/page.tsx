
"use client";
import { ArrowRight, BookOpen, Layers, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
        <div>
             <div className="pt-12 border-t-2 border-gray-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 text-foreground/40 dark:text-slate-500 text-sm font-bold">
                    <p>© 2026 Rumah Kisah Nurmala. Dibuat dengan ❤️ untuk Literasi.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-primary transition-colors">Privasi</a>
                        <a href="#" className="hover:text-primary transition-colors">Ketentuan</a>
                        <a href="#" className="hover:text-primary transition-colors">Kontak</a>
                    </div>
                    <div className="flex gap-4">
                        {["𝕏", "IG", "LI", "FB"].map((s) => (
                            <motion.span
                                key={s}
                                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0], backgroundColor: "#ffd60a", color: "#000" }}
                                className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center cursor-pointer transition-all border-2 border-gray-100 dark:border-slate-700 font-black shadow-sm"
                            >
                                {s}
                            </motion.span>
                        ))}
                    </div>
                </div>
        </div>
    </main>
  
  );
}

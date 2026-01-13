export const dynamic = 'force-dynamic';
import { ArrowRight, BookOpen, Layers, Clock } from "lucide-react";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import Image from "next/image";

export default async function HomePage() {
  // ✅ Ambil artikel TERBARU untuk homepage
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      Judul: true,
      slug: true,
      artikel: true,
      createdAt: true,
      coverImage: true,
    },
  });

  return (
    <main className="flex flex-col">

      {/* ================= FEATURED ARTICLES ================= */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Artikel Terbaru
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Bacaan pilihan yang dikurasi untuk memperluas wawasan dan literasi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/artikel/${article.slug}`}
              className="group rounded-3xl border border-border bg-background p-6 hover:shadow-xl transition block"
            >
              <div className="mb-4 h-40 rounded-2xl bg-primary/10 flex items-center justify-center">
                {/* <BookOpen className="size-16 text-primary/60" /> */}
                {/* {article.coverImage} */}
                {article.coverImage && (
                  <Image
                    src={article.coverImage}
                    alt={article.Judul}
                    width={300}
                    height={800}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
                
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                {article.Judul}
              </h3>

              <p className="text-sm text-foreground/70 mb-4">
                {article.artikel.slice(0, 120)}...
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Baca Selengkapnya
                <ArrowRight size={16} />
              </span>
            </Link>
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
      <section className="container mx-auto px-6 py-29">
        <h2 className="text-4xl font-black mb-10">Daftar Artikel</h2>

        <div className="space-y-6 ">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/artikel/${article.slug}`}
              className="flex gap-6 p-6 rounded-3xl border border-border hover:bg-muted/30 transition"
            >

              <div className="h-32 w-48 rounded-2xl overflow-hidden flex-shrink-0">
                {article.coverImage && (
                  <Image
                    src={article.coverImage}
                    alt={article.Judul}
                    width={300}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              

              <div>
                <h3 className="text-xl font-bold mb-2">
                  {article.Judul}
                </h3>
                <p className="text-sm text-foreground/70">
                  {article.artikel.slice(0, 150)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}

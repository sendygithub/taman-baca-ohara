export const dynamic = 'force-dynamic';
import { ArrowRight, BookOpen, Layers, Clock, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import Image from "next/image";

export default async function HomePage() {
  // Ambil semua artikel untuk ditampilkan di bagian "Sedang Hangat"
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      Judul: true,
      slug: true,
      artikel: true,
      penulis: true,
      createdAt: true,
      coverImage: true,
      category: true,
    },
  });

  if (articles.length === 0) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="text-zinc-400 text-lg font-medium">Belum ada artikel yang diterbitkan.</div>
      </main>
    );
  }

  // 3 Postingan terbaru
  const latestArticles = articles.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-24 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
            Jurnal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Literasi</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Eksplorasi ide, wawasan, dan cerita terbaru. Kurasi informasi terbaik untuk memperluas perspektif Anda.
          </p>
        </div>

        {/* 3 Postingan Terbaru - Grid Kebawah (Vertical List) */}
        <div className="mb-10">
          <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
            <Clock className="text-blue-500" size={28} />
            Postingan Terbaru
          </h2>
          <div className="flex flex-col gap-6">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/artikel/${article.slug}`}
                className="group flex flex-col md:flex-row gap-6 p-5 rounded-[2rem] border border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700/50 transition-all duration-300 items-center shadow-lg"
              >
                <div className="relative h-48 md:h-56 w-full md:w-80 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-800/50">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.Judul}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                      <BookOpen className="text-zinc-700 size-12" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/90 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg shadow-blue-500/20">
                    Terbaru
                  </div>
                </div>
                <div className="flex-1 space-y-4 w-full md:pr-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-zinc-800 text-blue-400 text-xs font-bold uppercase tracking-wider border border-zinc-700">
                      {article.category || 'Umum'}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      {new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(article.createdAt))}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors mb-3 leading-snug">
                      {article.Judul}
                    </h3>
                    <p className="text-zinc-400 text-sm md:text-base line-clamp-3 leading-relaxed">
                      {article.artikel.slice(0, 200)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-black text-white shadow-md">
                      {article.penulis.substring(0, 2).toUpperCase()}
                    </span>
                    <span className="text-sm font-bold text-zinc-300">{article.penulis}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sedang Hangat - Semua Postingan (Grid 3 Columns) */}
      <section className="container mx-auto px-6 py-12 border-t border-zinc-800/50 mt-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-blue-500" size={28} />
            <h2 className="text-3xl font-black text-white tracking-tight">Semua Postingan</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/artikel/${article.slug}`}
              className="group flex flex-col gap-5 p-5 rounded-[2rem] border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-zinc-800/50">
                {article.coverImage ? (
                  <Image
                    src={article.coverImage}
                    alt={article.Judul}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <Layers className="text-zinc-700 size-10" />
                  </div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                  {article.category || 'Artikel'}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                  {article.Judul}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                  {article.artikel.slice(0, 120)}...
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                  <Calendar size={14} />
                  {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(article.createdAt))}
                </div>
                <ArrowRight size={16} className="text-zinc-600 group-hover:text-blue-500 group-hover:-rotate-45 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}


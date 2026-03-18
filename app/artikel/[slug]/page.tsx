import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Twitter,
  Facebook,
  Link as LinkIcon,
  ChevronRight,
  Bookmark,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch artikel utama + ambil 3 artikel terbaru lainnya untuk saran bacaan
  const [article, otherArticles] = await Promise.all([
    prisma.article.findUnique({ where: { slug } }),
    prisma.article.findMany({
      where: { NOT: { slug: slug } }, // Jangan tampilkan artikel yang sedang dibaca
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!article) notFound();

  // Hitung Estimasi Waktu Baca (rata-rata 200 kata per menit)
  const wordsPerMinute = 200;
  const wordCount = article.artikel.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  const dateStr = article.createdAt
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
        new Date(article.createdAt),
      )
    : "Baru saja";

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 selection:bg-blue-500/30">
      {/* 1. Progress Bar (Client Component Simulant) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-blue-600/20 z-50">
        <div
          className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
          style={{ width: "45%" }}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[150px] pointer-events-none" />

      {/* 2. Floating Social Share (Desktop Only) */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
        <div className="flex flex-col gap-3 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-md">
          <button
            className="p-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-zinc-400"
            title="Share to Twitter"
          >
            <Twitter size={20} />
          </button>
          <button
            className="p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-zinc-400"
            title="Share to Facebook"
          >
            <Facebook size={20} />
          </button>
          <button
            className="p-3 rounded-xl hover:bg-zinc-700 hover:text-white transition-all text-zinc-400"
            title="Copy Link"
          >
            <LinkIcon size={20} />
          </button>
          <div className="h-px bg-zinc-800 my-1" />
          <button className="p-3 rounded-xl hover:bg-yellow-500 hover:text-white transition-all text-zinc-400">
            <Bookmark size={20} />
          </button>
        </div>
      </aside>

      <article className="relative z-10 max-w-3xl mx-auto px-6 pt-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/artikel" className="hover:text-blue-400">
            Artikel
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-300 truncate max-w-[150px]">
            {article.category}
          </span>
        </nav>

        <header className="space-y-8 mb-12">
          <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter">
            {article.Judul}
          </h1>

          <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-zinc-400 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-blue-500/20">
                {article.penulis.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-zinc-200 font-bold leading-none">
                  {article.penulis}
                </p>
                <p className="text-[10px] uppercase tracking-tighter text-zinc-500 mt-1">
                  Author
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
              <Calendar size={14} className="text-blue-500" />
              <span>{dateStr}</span>
            </div>

            <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
              <Clock size={14} className="text-blue-500" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {article.coverImage && (
          <div className="relative aspect-[16/9] w-full mb-16 group">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl group-hover:bg-blue-500/30 transition-all opacity-50" />
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-zinc-800 shadow-2xl">
              <Image
                fill
                src={article.coverImage}
                alt={article.Judul}
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        )}

        <section className="prose prose-lg prose-invert max-w-none mb-20">
          <div className="text-zinc-300 leading-relaxed text-lg md:text-xl whitespace-pre-wrap font-serif">
            {article.artikel}
          </div>
        </section>

        {/* 3. Call to Action / Share Mobile */}
        <div className="flex items-center justify-between p-6 rounded-[2rem] bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 mb-24">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-zinc-400">
              Share artikel:
            </span>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-zinc-800 hover:bg-blue-500 transition-colors">
                <Twitter size={18} />
              </button>
              <button className="p-2 rounded-lg bg-zinc-800 hover:bg-blue-600 transition-colors">
                <Facebook size={18} />
              </button>
              <button className="p-2 rounded-lg bg-zinc-800 hover:bg-white hover:text-black transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
          <Link
            href="/artikel"
            className="hidden sm:flex items-center gap-2 text-sm font-bold hover:text-blue-400 transition-colors"
          >
            Semua Artikel <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>

        {/* 4. Saran Artikel Lainnya */}
        <section className="space-y-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">
                Baca Selanjutnya
              </h2>
              <div className="h-1 w-20 bg-blue-600 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherArticles.map((item) => (
              <Link
                key={item.id}
                href={`/artikel/${item.slug}`}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 mb-4">
                  <Image
                    fill
                    src={item.coverImage}
                    alt={item.Judul}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-60" />
                </div>
                <h3 className="font-bold text-zinc-200 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {item.Judul}
                </h3>
                <p className="text-xs text-zinc-500 mt-2 flex items-center gap-2">
                  {item.category} • {readingTime} min read
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

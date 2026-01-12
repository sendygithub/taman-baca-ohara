import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Link } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  // ⬅️ WAJIB await
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    notFound();
  }

  return (
    <article className="container mx-auto px-6 py-24 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-black mb-4">
        {article.Judul}
      </h1>

      <p className="text-sm text-foreground/60 mb-8">
        {article.penulis} · {article.category}
      </p>

      {article.coverImage && (
        <Image
          width={1000}
          height={500}
          src={article.coverImage}
          alt={article.Judul}
          className="rounded-3xl mb-10"
        />
      )}

      <div className="prose prose-lg dark:prose-invert">
        {article.artikel}
      </div>

      <div>

        <Link href="/artikel" className="flex items-center gap-2 mt-10 hover:underline">
          <ArrowRight /> Kembali ke Artikel
        </Link>
      </div>
    </article>


  );
}

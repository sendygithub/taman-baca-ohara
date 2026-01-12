import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

      <p className="text-sm text-foreground/60 mb-3">
        Nama penulis :{article.penulis}
         </p>
         <p>
           Kategori: {article.category}
         </p>
        
       
     

      {article.coverImage && (
        <Image
          width={600}
          height={300}
          src={article.coverImage}
          alt={article.Judul}
          className="rounded-3xl mb-10"
        />
      )}

      <div className="prose prose-lg dark:prose-invert">
        {article.artikel}


        <Link href="/artikel" className="flex items-center gap-2 mt-10 hover:underline-bg-yellow-400 bg-yellow-500 text-white py-2 px-4 rounded-full w-fit">
        <button className="flex items-center gap-2">
          <ArrowLeft />
        </button>
           Kembali ke Artikel
        </Link>
      </div>

      <div>

        
      </div>
    </article>


  );
}

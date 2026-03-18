import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// ==========================
// GET ARTIKEL BY ID/SLUG
// ==========================
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }, // Tambahkan Promise di sini
) {
  try {
    // WAJIB di-await di Next.js 15
    const resolvedParams = await params;
    const idOrSlug = resolvedParams.slug;

    const article = await prisma.article.findUnique({
      where: {
        id: idOrSlug, // Mencari berdasarkan ID yang dikirim dari URL
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Artikel tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil artikel" },
      { status: 500 },
    );
  }
}

// ==========================
// UPDATE ARTIKEL
// ==========================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }, // Tambahkan Promise di sini
) {
  try {
    const resolvedParams = await params;
    const idOrSlug = resolvedParams.slug;

    const body = await request.json();
    const { Judul, slug, penulis, category, artikel, coverImage } = body;

    const updatedArticle = await prisma.article.update({
      where: {
        // Gunakan ID (idOrSlug) untuk mencari data yang mau diupdate
        // karena slug mungkin saja ikut diubah oleh user di form
        id: idOrSlug,
      },
      data: {
        Judul,
        slug,
        penulis,
        category,
        artikel,
        coverImage,
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("API PUT Error:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui artikel" },
      { status: 500 },
    );
  }
}

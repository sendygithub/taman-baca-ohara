import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// ==========================
// GET ARTIKEL BY SLUG
// ==========================

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: params.slug,
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
    console.error(error);

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
  { params }: { params: { slug: string } },
) {
  try {
    const body = await request.json();

    const { Judul, slug, penulis, category, artikel, coverImage } = body;

    const updatedArticle = await prisma.article.update({
      where: {
        slug: params.slug,
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
    console.error(error);

    return NextResponse.json(
      { message: "Gagal memperbarui artikel" },
      { status: 500 },
    );
  }
}

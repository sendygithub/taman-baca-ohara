import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
/* ===============================
   POST /api/article
=============================== */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      Judul,
      slug,
      coverImage,
      penulis,
      category,
      artikel,
      publishTime,
    } = body;

    /* ===============================
       VALIDATION
    =============================== */
    if (!Judul || !slug || !penulis || !category || !artikel) {
      return NextResponse.json(
        { message: "Field wajib tidak lengkap" },
        { status: 400 }
      );
    }

    /* ===============================
       CREATE ARTICLE
    =============================== */
    const data = await prisma.article.create({
      data: {
        Judul,
        slug,
        coverImage: coverImage || null,
        penulis,
        category,
        artikel,
        publishTime: publishTime ? new Date(publishTime) : null,
      },
    });

    return NextResponse.json(
      { message: "Artikel berhasil dibuat", data },
      { status: 201 }
    );
  } catch (error: any) {
    /* ===============================
       UNIQUE SLUG ERROR
    =============================== */
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Slug sudah digunakan" },
        { status: 409 }
      );
    }

    console.error("POST /api/article error:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        Judul: true,
        slug: true,
        penulis: true,
        category: true,
        publishTime: true,
        createdAt: true,
      },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil artikel" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


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
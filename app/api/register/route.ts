import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // validasi
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email dan password wajib diisi" },
      { status: 400 }
    );
  }

  // cek email sudah ada
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email sudah terdaftar" },
      { status: 409 }
    );
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // simpan ke database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    {
      message: "User berhasil dibuat",
      user: {
        id: user.id,
        email: user.email,
      },
    },
    { status: 201 }
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminArtikelPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/artikel", {
      method: "POST",
      body: JSON.stringify({
        Judul: formData.get("Judul"),
        slug: formData.get("slug"),
        coverImage: formData.get("coverImage"),
        penulis: formData.get("penulis"),
        category: formData.get("category"),
        artikel: formData.get("artikel"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    if (res.ok) {
      alert("Artikel berhasil disimpan");
      e.currentTarget.reset();
    } else {
      alert("Gagal menyimpan artikel");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-black mb-8">
        Tulis Artikel Baru
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="Judul"
          placeholder="Judul Artikel"
          required
          className="w-full p-4 rounded-xl border"
        />

        <input
          name="slug"
          placeholder="slug-artikel"
          required
          className="w-full p-4 rounded-xl border"
        />

        <input
          name="coverImage"
          placeholder="URL Cover Image (opsional)"
          className="w-full p-4 rounded-xl border"
        />

        <input
          name="penulis"
          placeholder="Nama Penulis"
          required
          className="w-full p-4 rounded-xl border"
        />

        <select
          name="category"
          className=" p-4 rounded-xl border bg-blue  hover:bg-gray-500 dark:hover:bg-slate-700"
        >
          <option value="Pendidikan">Pendidikan</option>
          <option value="Pendidikan">Pendidikan</option>
          <option value="Pendidikan">Pendidikan</option>
          <option value="Pendidikan">Pendidikan</option>
          <option value="Pendidikan">Pendidikan</option>
        </select>

        <textarea
          name="artikel"
          placeholder="Isi artikel (HTML / Markdown)"
          required
          rows={10}
          className="w-full p-4 rounded-xl border"
        />

        <button
          disabled={loading}
          className="px-10 py-4 rounded-xl bg-blue font-bold text-primary border border-primary bg-transparent hover:bg-yellow-500 hover:text-white transition duration-300"
        >
          {loading ? "Menyimpan..." : "Publish Artikel"}
        </button>

        <button
          type="reset"
          className="px-10 py-4 rounded-xl bg-blue font-bold text-primary border border-primary bg-transparent hover:bg-red-500 hover:text-white transition duration-300"
        >
          Reset
        </button>


        <Link href="/artikel" className="px-10 py-4 rounded-xl bg-blue font-bold text-primary border border-primary bg-transparent hover:bg-blue-500 hover:text-white transition duration-300">Kembali</Link>
      </form>
    </main>
  );
}

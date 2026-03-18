"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PenLine,
  Link as LinkIcon,
  User,
  Layers,
  FileText,
  ArrowLeft,
  Save,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function EditArtikelPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    Judul: "",
    slug: "",
    penulis: "",
    category: "",
    artikel: "",
    coverImage: "",
  });

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchArticle() {
      try {
        setLoading(true);
        const res = await fetch(`/api/artikel/${id}`);
        const data = await res.json();

        console.log("DATA DARI DATABASE:", data); // LIHAT DI KONSOL BROWSER

        if (data) {
          setFormData({
            Judul: data.Judul || "",
            slug: data.slug || "",
            penulis: data.penulis || "",
            category: data.category || "",
            artikel: data.artikel || "",
            coverImage: data.coverImage || "",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id, router]);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdating(true);

    try {
      let uploadedImageUrl = formData.coverImage;

      // upload gambar baru jika ada
      if (file) {
        const fd = new FormData();
        fd.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) {
          throw new Error("Gagal upload gambar baru");
        }

        const uploadData = await uploadRes.json();
        uploadedImageUrl = uploadData.url;
      }

      const res = await fetch(`/api/artikel/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formData,
          coverImage: uploadedImageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Artikel berhasil diperbarui ✨");
        router.push("/tabel");
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Gagal: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Terjadi kesalahan.");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] relative overflow-hidden flex items-center justify-center py-20 px-6 text-zinc-100">
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-4xl w-full mx-auto"
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-4">
              <Sparkles size={12} /> Editing Mode
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Edit <span className="text-blue-500">Artikel</span>
            </h1>
          </div>

          <Link
            href="/admin/artikel"
            className="group flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-all bg-zinc-900/50 px-5 py-3 rounded-2xl border border-zinc-800"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Batal
          </Link>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleUpdate}
          className="bg-zinc-900/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-zinc-800/50 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* JUDUL */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
                <PenLine size={14} className="text-blue-500" /> Judul Artikel
              </label>

              <input
                value={formData.Judul}
                onChange={(e) =>
                  setFormData({ ...formData, Judul: e.target.value })
                }
                required
                className="w-full p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-blue-500 outline-none text-white"
              />
            </div>

            {/* SLUG */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
                <LinkIcon size={14} className="text-blue-500" /> URL Slug
              </label>

              <input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
                className="w-full p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-blue-500 outline-none text-white"
              />
            </div>

            {/* PENULIS */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
                <User size={14} className="text-blue-500" /> Nama Penulis
              </label>

              <select
                value={formData.penulis}
                onChange={(e) =>
                  setFormData({ ...formData, penulis: e.target.value })
                }
                className="w-full p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 text-white"
              >
                <option value="Dian Nurmala">Dian Nurmala</option>
                <option value="Trieyana">Trieyana</option>
              </select>
            </div>

            {/* KATEGORI */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
                <Layers size={14} className="text-blue-500" /> Kategori
              </label>

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 text-white"
              >
                <option value="Edukasi">Edukasi</option>
                <option value="Berita">Berita</option>
                <option value="Blog/Opini">Blog/Opini</option>
              </select>
            </div>
          </div>

          {/* IMAGE */}
          <div className="space-y-4 p-6 bg-zinc-950/50 rounded-[2rem] border border-zinc-800 md:w-1/2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
              <LinkIcon size={14} /> Update Cover Image
            </label>

            {formData.coverImage && (
              <p className="text-[10px] text-zinc-500 truncate">
                File saat ini: {formData.coverImage}
              </p>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-blue-600 file:text-white"
            />
          </div>

          {/* KONTEN */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
              <FileText size={14} className="text-blue-500" /> Isi Konten
            </label>

            <textarea
              value={formData.artikel}
              onChange={(e) =>
                setFormData({ ...formData, artikel: e.target.value })
              }
              required
              rows={10}
              className="w-full p-6 rounded-[2.5rem] border border-zinc-800 bg-zinc-950/50 text-white"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end pt-6 border-t border-zinc-800/50">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={updating}
              type="submit"
              className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black flex items-center gap-3 disabled:bg-zinc-800"
            >
              {updating ? (
                "Menyimpan..."
              ) : (
                <>
                  Simpan Perubahan <Save size={18} />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}

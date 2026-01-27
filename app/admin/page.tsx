"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  PenLine, 
  Link as LinkIcon, 
  User, 
  Layers, 
  FileText, 
  ArrowLeft, 
  RotateCcw, 
  Send,
  Sparkles 
} from "lucide-react";

export default function AdminArtikelPage() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      
      const fileInput = formElement.querySelector('input[type="file"]') as HTMLInputElement;
      const fileToUpload = fileInput?.files?.[0];

      let uploadedImageUrl = "";

      if (fileToUpload) {
        const fd = new FormData();
        fd.append("file", fileToUpload);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) throw new Error("Gagal mengupload gambar");

        const uploadData = await uploadRes.json();
        uploadedImageUrl = uploadData.url;
      }

      const finalData = {
        Judul: formData.get("Judul"),
        slug: formData.get("slug"),
        penulis: formData.get("penulis"),
        category: formData.get("category"),
        artikel: formData.get("artikel"),
        coverImage: uploadedImageUrl,
      };

      const res = await fetch("/api/artikel", {
        method: "POST",
        body: JSON.stringify(finalData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Artikel berhasil disimpan ✨");
        formElement.reset();
        setFile(null);
      } else {
        const errorData = await res.json();
        alert(`Gagal: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memproses artikel.");
    } finally {
      setLoading(false);
    }
  }

  return (
    // Background Utama: Deep Dark Zinc
    <main className="min-h-screen bg-[#09090b] relative overflow-hidden flex items-center justify-center py-20 px-6 text-zinc-100">
      
      {/* --- BACKGROUND DECORATION (GLOW EFFECT) --- */}
      {/* Efek cahaya redup di pojok agar tidak membosankan */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-4xl w-full mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-4"
            >
              <Sparkles size={12} /> Creator Studio
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Tulis Artikel <span className="text-blue-500">Baru.</span>
            </h1>
          </div>
          <Link 
            href="/artikel" 
            className="group flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-all bg-zinc-900/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-zinc-800 shadow-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali
          </Link>
        </div>

        {/* Form Card: Dark Glassmorphism */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-zinc-900/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-zinc-800/50 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Judul */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
                <PenLine size={14} className="text-blue-500" /> Judul Artikel
              </label>
              <input
                name="Judul"
                placeholder="Tulis Judul.."
                required
                className="w-full p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:bg-zinc-950 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-white placeholder:text-zinc-700"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
                <LinkIcon size={14} className="text-blue-500" /> URL Slug
              </label>
              <input
                name="slug"
                placeholder="artikel-001"
                required
                className="w-full p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:bg-zinc-950 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-white placeholder:text-zinc-700"
              />
            </div>

            {/* Penulis */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
                <User size={14} className="text-blue-500" /> Nama Penulis
              </label>
              <select
                name="penulis"
                className="w-full p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:bg-zinc-950 focus:border-blue-500 outline-none transition-all font-semibold text-white appearance-none cursor-pointer"
              >
                <option value="Dian Nurmala" className="bg-zinc-900">Dian Nurmala</option>
                <option value="Trieyana" className="bg-zinc-900">Trieyana</option>
              </select>
            </div>

            {/* Kategori */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
                <Layers size={14} className="text-blue-500" /> Kategori
              </label>
              <div className="relative">
                <select
                  name="category"
                  className="w-full p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:bg-zinc-950 focus:border-blue-500 outline-none transition-all font-semibold text-white appearance-none cursor-pointer"
                >
                  <option value="Edukasi" className="bg-zinc-900">Edukasi</option>
                  <option value="Berita" className="bg-zinc-900">Berita</option>
                  <option value="Blog/Opini" className="bg-zinc-900">Blog/Opini</option>
                  <option value="Tutorial" className="bg-zinc-900">Tutorial</option>
                  <option value="Review" className="bg-zinc-900">Review</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                  <Layers size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image Section */}
          <div className="space-y-4 p-6 bg-zinc-950/50 rounded-[2rem] border border-zinc-800 md:w-1/2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                <LinkIcon size={14} /> Upload Image
              </label>
              <p className="text-[10px] font-bold text-zinc-600 italic">
                *Maks. 4MB
              </p>
            </div>
            
            <input
              name="coverImage"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 transition-all cursor-pointer"
            />
          </div>

          {/* Konten Artikel */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 ml-1">
              <FileText size={14} className="text-blue-500" /> Isi Konten
            </label>
            <textarea
              name="artikel"
              placeholder="Tulis artikel di sini..."
              required
              rows={10}
              className="w-full p-6 rounded-[2.5rem] border border-zinc-800 bg-zinc-950/50 focus:bg-zinc-950 focus:border-blue-500 outline-none transition-all font-medium text-white leading-relaxed resize-none placeholder:text-zinc-700"
            />
          </div>

          {/* Buttons Group */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-6 border-t border-zinc-800/50">
            <button
              type="reset"
              className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-red-400 transition-all"
            >
              <RotateCcw size={16} /> Bersihkan Form
            </button>
            
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-blue-600 text-white font-black shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:bg-zinc-800"
            >
              {loading ? "Sedang Memproses..." : (
                <>Terbitkan Sekarang <Send size={18} /></>
              )}
            </motion.button>
          </div>
        </form>

        <p className="text-center mt-8 text-zinc-600 text-[11px] font-medium tracking-wide italic">
          Admin Dashboard &bull; Mode Gelap Aktif
        </p>
      </motion.div>
    </main>
  );
}
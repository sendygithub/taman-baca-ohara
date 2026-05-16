"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Sparkles,
  Database,
  Calendar,
  User as UserIcon,
  Tag,
  ArrowLeft,
  Loader2,
} from "lucide-react";

interface Artikel {
  id: string;
  Judul: string;
  slug: string;
  penulis: string;
  category: string;
  createdAt: string;
}

export default function DatabaseArtikelPage() {
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/artikel");
      const data = await res.json();
      setArtikels(data);
    } catch (err) {
      console.error("Gagal mengambil data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.")) {
      try {
        const res = await fetch(`/api/artikel?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          setArtikels(artikels.filter((item) => item.id !== id));
          alert("Artikel berhasil dihapus");
        } else {
          alert("Gagal menghapus artikel");
        }
      } catch (err) {
        alert("Terjadi kesalahan saat menghapus");
      }
    }
  };

  const filteredArtikels = artikels.filter((a) =>
    a.Judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.penulis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateStr));
  };

  return (
    <main className="min-h-screen bg-[#09090b] relative overflow-hidden py-16 px-6 text-zinc-100">
      {/* Background Glows */}
      <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link href="/artikel" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-400 text-sm font-bold transition-colors mb-4 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Kembali ke Artikel
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
                <Database size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                  Database <span className="text-blue-500">Artikel.</span>
                </h1>
                <p className="text-zinc-500 text-sm mt-1">Manajemen lengkap konten dan metadata artikel.</p>
              </div>
            </div>
          </div>

          <Link href="/admin/artikel/tambah">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-900/20"
            >
              <Plus size={20} /> Tulis Artikel Baru
            </motion.button>
          </Link>
        </div>

        {/* Search & Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3 relative group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari berdasarkan judul, penulis, atau kategori..."
              className="w-full bg-zinc-900/40 border border-zinc-800 rounded-[1.5rem] py-5 pl-14 pr-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-[1.5rem] p-5 flex flex-col justify-center px-8">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Total Data</span>
            <span className="text-3xl font-black text-white mt-1">
              {filteredArtikels.length}
            </span>
          </div>
        </div>

        {/* Database Table Container */}
        <div className="bg-zinc-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-zinc-800/50 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-white/[0.02] border-b border-zinc-800/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Informasi Artikel
                  </th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Kategori & Penulis
                  </th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Waktu Penulisan
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-right">
                    Kontrol Data
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/30">
                <AnimatePresence mode="popLayout">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-20 text-center">
                        <Loader2 className="animate-spin text-blue-500 mx-auto mb-4" size={40} />
                        <p className="text-zinc-500 font-medium">Memuat data database...</p>
                      </td>
                    </tr>
                  ) : filteredArtikels.map((artikel) => (
                    <motion.tr
                      key={artikel.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group hover:bg-white/[0.03] transition-colors"
                    >
                      {/* Judul & Slug */}
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">
                            {artikel.Judul}
                          </span>
                          <span className="text-zinc-500 text-xs flex items-center gap-1.5 mt-1 font-medium">
                            <ExternalLink size={12} className="text-zinc-700" /> 
                            /artikel/{artikel.slug}
                          </span>
                        </div>
                      </td>

                      {/* Kategori & Penulis */}
                      <td className="px-6 py-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Tag size={12} className="text-blue-500" />
                            <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-400 text-[11px] font-black border border-blue-500/20">
                              {artikel.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                            <UserIcon size={14} className="text-zinc-600" />
                            {artikel.penulis}
                          </div>
                        </div>
                      </td>

                      {/* Tanggal */}
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                          <Calendar size={14} className="text-zinc-600" />
                          {formatDate(artikel.createdAt)}
                        </div>
                      </td>

                      {/* Aksi */}
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-3">
                          <Link href={`/edit/${artikel.id}`}>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-blue-600 text-zinc-400 hover:text-white transition-all border border-zinc-700 hover:border-blue-500 shadow-lg">
                              <Edit3 size={18} />
                              <span className="text-xs font-bold">Edit</span>
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(artikel.id)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all border border-zinc-700 hover:border-red-500/50 shadow-lg"
                          >
                            <Trash2 size={18} />
                            <span className="text-xs font-bold">Hapus</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {/* Empty State */}
            {filteredArtikels.length === 0 && !loading && (
              <div className="py-24 text-center">
                <div className="bg-zinc-800/50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-zinc-700/50">
                  <Sparkles size={32} className="text-zinc-600" />
                </div>
                <h3 className="text-xl font-black text-white">Data tidak ditemukan</h3>
                <p className="text-zinc-500 text-sm mt-2 max-w-xs mx-auto">
                  Kami tidak dapat menemukan data yang Anda cari. Coba gunakan kata kunci lain.
                </p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-6 text-blue-500 font-bold text-sm hover:underline"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            System Connected to PostgreSQL
          </div>
          <div>
            Data Management System &bull; &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </main>
  );
}

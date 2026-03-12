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
  MoreHorizontal,
  Sparkles,
  LayoutGrid,
  Calendar,
  User as UserIcon,
} from "lucide-react";

// Tipe data sederhana untuk artikel
interface Artikel {
  id: string;
  Judul: string;
  slug: string;
  penulis: string;
  category: string;
  createdAt: string;
}

export default function ListArtikelPage() {
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulasi fetch data - ganti dengan fetch ke API real Anda
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/artikel");
        const data = await res.json();
        setArtikels(data);
      } catch (err) {
        console.error("Gagal mengambil data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        const res = await fetch(`/api/artikel?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          setArtikels(artikels.filter((item) => item.id !== id));
        }
      } catch (err) {
        alert("Gagal menghapus");
      }
    }
  };

  const filteredArtikels = artikels.filter((a) =>
    a.Judul.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-[#09090b] relative overflow-hidden py-16 px-6 text-zinc-100">
      {/* Glow Effects */}
      <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-4"
            >
              <LayoutGrid size={12} /> Content Manager
            </motion.div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Manajemen <span className="text-blue-500">Artikel.</span>
            </h1>
          </div>

          <Link href="/admin/artikel/tambah">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20"
            >
              <Plus size={20} /> Tulis Artikel Baru
            </motion.button>
          </Link>
        </div>

        {/* Search & Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari artikel berdasarkan judul..."
              className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between px-8">
            <span className="text-zinc-500 text-sm font-medium">
              Total Artikel
            </span>
            <span className="text-2xl font-black text-white">
              {filteredArtikels.length}
            </span>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-zinc-900/40 backdrop-blur-2xl rounded-[2.5rem] border border-zinc-800/50 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800/50">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Artikel
                  </th>
                  <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Kategori
                  </th>
                  <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Penulis
                  </th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/30">
                <AnimatePresence mode="popLayout">
                  {filteredArtikels.map((artikel) => (
                    <motion.tr
                      key={artikel.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-white font-bold group-hover:text-blue-400 transition-colors cursor-default">
                            {artikel.Judul}
                          </span>
                          <span className="text-zinc-500 text-xs flex items-center gap-1 mt-1">
                            <ExternalLink size={12} /> {artikel.slug}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-[11px] font-bold border border-zinc-700">
                          {artikel.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <UserIcon size={12} className="text-blue-400" />
                          </div>
                          {artikel.penulis}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-3">
                          <Link href={`/edit/${artikel.id}`}>
                            <button className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all border border-zinc-700">
                              <Edit3 size={18} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(artikel.id)}
                            className="p-2.5 rounded-xl bg-zinc-800 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all border border-zinc-700 hover:border-red-500/50"
                          >
                            <Trash2 size={18} />
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
              <div className="py-20 text-center">
                <div className="bg-zinc-800/50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} className="text-zinc-600" />
                </div>
                <h3 className="text-white font-bold">Tidak ada artikel</h3>
                <p className="text-zinc-500 text-sm mt-1">
                  Coba cari kata kunci lain atau buat artikel baru.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center mt-10 text-zinc-600 text-[11px] font-medium tracking-wide italic">
          Dashboard v2.0 &bull; {new Date().getFullYear()} Management System
        </p>
      </div>
    </main>
  );
}

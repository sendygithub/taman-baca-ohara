"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, Heart, Search, ZoomIn } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const galleryImages = [
    { src: "/kunjungan1.jpeg", title: "Kegiatan Membaca Bersama", category: "Kegiatan" },
    { src: "/kunjungan2.jpeg", title: "Donasi Buku Baru", category: "Donasi" },
    { src: "/kunjungan3.jpeg", title: "Kunjungan Sekolah", category: "Edukasi" },
    { src: "/kunjungan4.jpeg", title: "Lomba Mewarnai", category: "Kegiatan" },
    { src: "/0.png", title: "Fasilitas Perpustakaan", category: "Fasilitas" },
    { src: "/1.jpeg", title: "Pojok Baca Ceria", category: "Fasilitas" },
    { src: "/4.jpg", title: "Workshop Kreatif", category: "Edukasi" },
    { src: "/t.jpg", title: "Sesi Mendongeng", category: "Kegiatan" },
];

export default function GalleryPage() {
    const [filter, setFilter] = useState("Semua");
    const categories = ["Semua", "Kegiatan", "Donasi", "Edukasi", "Fasilitas"];

    const filteredImages = filter === "Semua"
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    return (
        <div className="min-h-screen py-24 px-6 md:px-12">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4"
                    >
                        <ImageIcon size={16} />
                        <span>Galeri Foto</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary-pink to-primary-violet"
                    >
                        Momen Berharga di Rumah Kisah
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-foreground/60 max-w-2xl mx-auto font-medium text-lg"
                    >
                        Kumpulan foto aktivitas, keceriaan, dan perkembangan anak-anak di taman baca kami.
                    </motion.p>
                </div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-2xl font-bold transition-all ${filter === cat
                                ? "bg-primary text-foreground shadow-lg shadow-primary/20"
                                : "bg-white dark:bg-slate-900 border border-foreground/10 text-foreground/60 hover:border-primary/50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredImages.map((image, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            key={image.src}
                            className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl"
                        >
                            <Image
                                src={image.src}
                                alt={image.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    className="flex justify-between items-end"
                                >
                                    <div>
                                        <span className="text-primary text-xs font-black uppercase tracking-widest">{image.category}</span>
                                        <h3 className="text-white font-bold text-lg mt-1">{image.title}</h3>
                                    </div>
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-primary hover:text-foreground transition-all">
                                        <Heart size={20} />
                                    </button>
                                </motion.div>
                            </div>

                            {/* Hover Actions */}
                            <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                                    <ZoomIn size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-24">
                        <Search size={48} className="mx-auto text-foreground/20 mb-4" />
                        <p className="text-foreground/40 font-bold">Tidak ada foto ditemukan untuk kategori ini.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

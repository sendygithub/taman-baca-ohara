"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
    {
        title: "Sastra edukasi Indonesia",
        category: "Sastra",
        image: "/kunjungan1.jpeg",
        color: "from-blue-600 to-cyan-500",
    },
    {
        title: "Petualangan Cerita Anak",
        category: "Sains",
        image: "/kunjungan2.jpeg",
        color: "from-emerald-600 to-teal-500",
    },
    {
        title: "Berbagi Buku dan Koleksi",
        category: "Hiburan",
        image: "/kunjungan3.jpeg",
        color: "from-purple-600 to-pink-500",
    },
    {
        title: "Kegiatan Edukatif",
        category: "Referensi",
        image: "/kunjungan4.jpeg",
        color: "from-orange-600 to-amber-500",
    },
];

export const Portfolio = () => {
    return (
        <section id="portfolio" className="py-24 bg-gray-50/50 dark:bg-slate-900/50 overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-black mb-6 dark:text-white"
                    >
                        Koleksi & <span className="text-primary-violet underline decoration-secondary-cyan/30 underline-offset-8">Dokumentasi</span>
                    </motion.h2>
                    <p className="text-xl font-medium text-foreground/70 dark:text-slate-400 max-w-2xl mx-auto">
                        Jelajahi berbagai koleksi buku pilihan dan keseruan kegiatan kami di Rumah Peradaban SNC! 🎨
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative h-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-90 transition-all duration-500 flex flex-col justify-end p-10 text-white`}
                            >
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    className="text-sm font-black tracking-widest uppercase mb-2 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full w-fit"
                                >
                                    {project.category}
                                </motion.span>
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl font-black mb-8 drop-shadow-lg"
                                >
                                    {project.title}
                                </motion.h3>
                                <div className="flex gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.2, rotate: 15 }}
                                        className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-foreground transition-all border-2 border-white/30"
                                    >
                                        <ExternalLink size={28} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.2, rotate: -15 }}
                                        className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-foreground transition-all border-2 border-white/30"
                                    >
                                        <Github size={28} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <motion.button
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-12 py-6 bg-primary text-foreground font-black text-xl rounded-[2.5rem] shadow-[0_12px_0_0_#ca8a04] hover:shadow-[0_6px_0_0_#ca8a04] hover:translate-y-[6px] transition-all border-4 border-yellow-600 active:shadow-none active:translate-y-[12px]"
                    >
                        Lihat Semua Koleksi ✨
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

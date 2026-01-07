"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BookOpen, Layout, Smartphone, Palette, CheckCircle2, ArrowUpRight } from "lucide-react";

const categories = ["Semua", "Edukasi", "Kreativitas", "Komunitas"];

const services = [
    {
        category: "Edukasi",
        title: "Wakaf buku",
        desc: "Akses ribuan buku dari berbagai genre secara gratis untuk memperluas wawasan Anda.",
        icon: <BookOpen />,
        items: ["Koleksi Lengkap", "Proses Mudah", "Pengingat Digital"],
        color: "bg-primary",
    },
    {
        category: "Kreativitas",
        title: "Berkisah oleh pengelola",
        desc: "Asah kemampuan menulis dan bercerita bersama para penulis berpengalaman.",
        icon: <Palette />,
        items: ["Menulis Kreatif", "Storytelling", "Penerbitan"],
        color: "bg-secondary-pink",
    },
    {
        category: "Komunitas",
        title: "Les Bahasa Inggris",
        desc: "Sesi mendongeng interaktif untuk anak-anak guna menumbuhkan imajinasi dan budi pekerti.",
        icon: <Smartphone />,
        items: ["Interaktif", "Budi Pekerti", "Fun Learning"],
        color: "bg-secondary-cyan",
    },
    {
        category: "Edukasi",
        title: "Membaca buku mandiri",
        desc: "Pelatihan penggunaan teknologi yang bijak dan produktif untuk generasi muda.",
        icon: <Layout />,
        items: ["Internet Sehat", "Cek Fakta", "Tools Digital"],
        color: "bg-accent-amber",
    },
];

export const Services = () => {
    const [activeTab, setActiveTab] = useState("Semua");

    const filteredServices = activeTab === "Semua"
        ? services
        : services.filter(s => s.category === activeTab);

    return (
        <section id="services" className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-6xl font-black mb-6 dark:text-white"
                        >
                            Program Unggulan <span className="text-secondary-cyan">Kami</span>
                        </motion.h2>
                        <p className="text-xl font-medium text-foreground/70 dark:text-slate-400">
                            Ayo bergabung dalam berbagai kegiatan seru yang akan membuatmu semakin pintar dan kreatif! 🚀
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-gray-100 dark:bg-slate-800 p-2 rounded-[2rem] overflow-x-auto whitespace-nowrap scrollbar-hide border-4 border-gray-50 dark:border-slate-700 shadow-inner">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-8 py-3 rounded-[1.5rem] font-black tracking-wide transition-all relative ${activeTab === cat ? "text-foreground" : "text-foreground/50 dark:text-slate-500 hover:text-primary dark:hover:text-primary"
                                    }`}
                            >
                                <span className="relative z-10">{cat}</span>
                                {activeTab === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary rounded-[1.3rem] shadow-lg shadow-primary/30 border-b-4 border-yellow-600"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((service, idx) => (
                            <motion.div
                                key={service.title}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                                transition={{ type: "spring", stiffness: 100, delay: idx * 0.1 }}
                                className="group p-10 bg-white dark:bg-slate-800 rounded-[3.5rem] border-4 border-gray-50 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(255,214,10,0.2)] dark:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                            >
                                <div className="flex items-start justify-between mb-10">
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                                        className={`w-20 h-20 ${service.color} text-foreground rounded-3xl flex items-center justify-center shadow-xl border-b-4 border-black/10`}
                                    >
                                        <div className="scale-125">{service.icon}</div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ rotate: 180, scale: 1.2 }}
                                        className="w-14 h-14 bg-gray-50 dark:bg-slate-700 border-2 border-gray-100 dark:border-slate-600 rounded-full flex items-center justify-center text-foreground/40 dark:text-slate-500 hover:text-primary cursor-pointer shadow-sm"
                                    >
                                        <ArrowUpRight size={28} />
                                    </motion.div>
                                </div>

                                <h3 className="text-3xl font-black mb-4 dark:text-white">{service.title}</h3>
                                <p className="text-foreground/70 dark:text-slate-400 mb-10 text-lg font-medium leading-relaxed">
                                    {service.desc}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    {service.items.map((item) => (
                                        <motion.span
                                            key={item}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            className="flex items-center gap-2 text-sm font-black text-foreground/80 dark:text-slate-300 bg-gray-50 dark:bg-slate-700/50 px-5 py-2.5 rounded-2xl border-2 border-gray-100 dark:border-slate-600 shadow-sm"
                                        >
                                            <CheckCircle2 size={18} className="text-accent-emerald" />
                                            {item}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

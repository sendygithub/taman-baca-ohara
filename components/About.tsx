"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Briefcase, Award, Globe } from "lucide-react";

const stats = [
    { label: "Pembaca Setia", value: 100, icon: <Users className="text-primary" />, suffix: "+" },
    { label: "Koleksi Buku", value: 300, icon: <Briefcase className="text-secondary-cyan" />, suffix: "+" },
    { label: "Kegiatan Literasi", value: 15, icon: <Award className="text-secondary-pink" />, suffix: "" },
    { label: "Relawan Aktif", value: 30, icon: <Globe className="text-accent-amber" />, suffix: "+" },
];

const timeline = [
    { year: "2020", title: "START", desc: "Mulai sebagai komunitas kecil di teras rumah dengan 50 buku." },
    { year: "2021", title: "Perluasan Koleksi", desc: "Mendapat donasi dan wakaf dari komunitas SNC." },
    { year: "2022", title: "Program Pinjam Buku", desc: "Meluncurkan fasilitas peminjaman buku digital." },
    { year: "2023", title: "Jangkauan Nasional", desc: "Bekerja sama dengan perpustakaan daerah di seluruh Indonesia." },
    { year: "2024", title: "Pusat Kreativitas", desc: "Menjadi pusat literasi dan kreativitas bagi anak-anak bangsa." },
    { year: "2025", title: "Pengembangan Komunitas", desc: "Mengembangkan komunitas secara berkelanjutan." },

];

const StatCard = ({ stat }: { stat: typeof stats[0] }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [stat.value]);

    return (
        <motion.div
            whileHover={{ y: -15, scale: 1.05 }}
            className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl shadow-gray-100/50 dark:shadow-slate-900/50 border-4 border-gray-50 dark:border-slate-700 flex flex-col items-center text-center transition-all"
        >
            <div className="w-16 h-16 bg-gray-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6">
                {stat.icon}
            </div>
            <h3 className="text-4xl font-black text-foreground dark:text-white mb-2">
                {count}{stat.suffix}
            </h3>
            <p className="text-foreground/60 dark:text-slate-400 font-bold uppercase tracking-wider text-xs">{stat.label}</p>
        </motion.div>
    );
};

export const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section id="about" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-500" ref={containerRef}>
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-black mb-8 dark:text-white"
                    >
                        Rumah Peradaban <span className="text-primary underline decoration-secondary-pink/30 underline-offset-8">SNC</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-xl font-medium text-foreground/70 dark:text-slate-400"
                    >
                        Merupakan salah satu Rumah baca yang berada di naungan komunitas SNC (Spirit Nabawiyah Community)  dimana beberapa buku yang terdapat di rumah baca merupakan wakaf dari komunitas SNC tersebut. ✨
                    </motion.p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} stat={stat} />
                    ))}
                </div>

                {/* Timeline */}
                <div className="relative mt-32">
                    <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center text-sm font-black text-secondary-pink mb-12 tracking-[0.4em] uppercase"
                    >
                        Petualangan Kami ✨
                    </motion.h4>
                    <div className="overflow-x-auto pb-12 scrollbar-hide">
                        <motion.div
                            style={{ x: useTransform(scrollYProgress, [0.3, 0.7], [0, -400]) }}
                            className="flex gap-8 w-max px-6"
                        >
                            {timeline.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -15, scale: 1.02 }}
                                    className="w-[320px] p-10 bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl shadow-gray-200/50 dark:shadow-slate-900/50 border-4 border-gray-50 dark:border-slate-700 relative group transition-all"
                                >
                                    <span className="text-5xl font-black text-primary/20 dark:text-primary/10 absolute top-6 right-8 group-hover:text-primary/40 transition-colors">{item.year}</span>
                                    <h4 className="text-2xl font-black mb-4 relative z-10 dark:text-white">{item.title}</h4>
                                    <p className="text-foreground/70 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>

                                    {/* Bouncy Connector */}
                                    {idx !== timeline.length - 1 && (
                                        <div className="absolute top-1/2 -right-10 w-12 h-2 bg-primary rounded-full opacity-30 group-hover:opacity-100 group-hover:scale-x-125 transition-all" />
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-64 h-64 bg-secondary-cyan/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary-pink/5 rounded-full blur-3xl animate-pulse-slow" />
            </div>
        </section>
    );
};

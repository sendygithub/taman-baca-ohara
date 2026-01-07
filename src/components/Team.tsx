"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const team = [
    { name: "Dian Nurmala", role: "Pendiri & Pembina", image: "/6.jpg" },
    { name: "trieana", role: "Pustakawan Utama", image: "/t.jpg" },
    { name: "anggota SNC", role: "Generasi emas", image: "/1.jpeg" },
    { name: "Sendy", role: "Web Developer(ntar di ganti yg lain trik, aing gak tau anggotanya siapa lagi", image: "/0.png" },
];

const TeamCard = ({ member }: { member: typeof team[0] }) => {
    return (
        <motion.div
            whileHover={{ y: -15, scale: 1.05 }}
            className="relative group cursor-pointer"
        >
            <motion.div
                className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50 border-4 border-gray-100 dark:border-slate-700 p-4 transition-all"
            >
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 border-4 border-gray-50 dark:border-slate-600">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="flex gap-4">
                            <motion.span whileHover={{ scale: 1.2, rotate: 15 }} className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 flex items-center justify-center text-white text-xl">𝕏</motion.span>
                            <motion.span whileHover={{ scale: 1.2, rotate: -15 }} className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 flex items-center justify-center text-white text-xl">in</motion.span>
                        </div>
                    </div>
                </div>
                <div className="text-center pb-2">
                    <h4 className="text-2xl font-black mb-1 dark:text-white">{member.name}</h4>
                    <p className="text-primary font-black text-xs tracking-[0.2em] uppercase">{member.role}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const Team = () => {
    return (
        <section className="py-24 bg-gray-50/50 dark:bg-slate-900/30 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-black mb-6 dark:text-white"
                    >
                        Keluarga <span className="text-primary underline decoration-secondary-pink/30 underline-offset-8">SNC subang</span>
                    </motion.h2>
                    <p className="text-xl font-medium text-foreground/70 dark:text-slate-400 max-w-xl mx-auto">
                        Kenalan yuk dengan kakak-kakak hebat serta anggota yang selalu ceria menemanimu membaca! 🌈
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, delay: idx * 0.1 }}
                        >
                            <TeamCard member={member} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

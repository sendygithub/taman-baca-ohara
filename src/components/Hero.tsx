"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, Heart } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
    return (
        <section className="relative min-height-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
            <div className="container mx-auto text-center relative z-10">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/20 border-2 border-primary/30 text-foreground dark:text-white mb-8 shadow-lg"
                >
                    <Sparkles size={18} className="text-secondary-pink animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-wider">Wellcome to ! 🌟</span>
                </motion.div>

                {/* Headline */}
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="block dark:text-white"
                    >
                        Rumah Peradaban <motion.span
                            animate={{
                                color: ["#ffd60a", "#ff006e", "#00bbf9", "#8338ec", "#ffd60a"],
                                scale: [1, 1.05, 1],
                                rotate: [0, -8, 2, 0]
                            }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block"
                        >SNC</motion.span>
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.4 }}
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary-pink to-secondary-cyan drop-shadow-sm"
                    >
                        Subang
                    </motion.span>
                </h1>

                {/* Subheadline */}
                <motion.p
                    className="max-w-2xl mx-auto text-xl md:text-2xl font-medium text-foreground/80 dark:text-slate-300 mb-12 flex flex-wrap justify-center gap-x-2"
                >
                    {"Ayo bergabung dengan kami dan temukan petualangan seru dan ilmu pengetahuan yang luar biasa di Rumah Peradaban!".split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 100, delay: 1 + i * 0.05 }}
                            whileHover={{ scale: 1.2, color: "#ff006e" }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="group relative px-10 py-5 bg-primary text-white rounded-3xl font-black text-xl shadow-[0_10px_0_0_#ca8a04] hover:shadow-[0_5px_0_0_#ca8a04] hover:translate-y-[5px] transition-all border-2 border-yellow-300 active:shadow-none active:translate-y-[10px] text-black dark:text-white"
                    >
                        <span className="flex items-center gap-3">
                            <Link href="/artikel" className="flex items-center gap-3">
                                <BookOpen size={24} className="group-hover:translate-x-2 transition-transform" />
                                <Link href={"/artikel"}>
                                Baca Artikel kami
                                </Link>
                            </Link>
                            
                            
                            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />

                        </span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-10 py-5 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-foreground dark:text-white rounded-3xl font-black text-xl shadow-[0_10px_0_0_#e5e7eb] dark:shadow-[0_10px_0_0_#1e293b] hover:shadow-[0_5px_0_0_#e5e7eb] dark:hover:shadow-[0_5px_0_0_#1e293b] hover:translate-y-[5px] transition-all active:shadow-none active:translate-y-[10px]"
                    >
                        Donasi Buku
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Gulir</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-8 h-12 border-4 border-primary/30 rounded-full flex justify-center p-1.5"
                >
                    <div className="w-2 h-3 bg-primary rounded-full" />
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        rotate: [0, 15, -15, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute top-[15%] left-[5%] md:left-[10%] text-primary/40 dark:text-primary/20"
                >
                    <BookOpen size={160} />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -20, 0],
                        rotate: [0, -15, 15, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-[20%] right-[5%] md:right-[10%] text-secondary-pink/40 dark:text-secondary-pink/20"
                >
                    <Heart size={140} />
                </motion.div>

                {/* Extra Bubbles for Fun */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 5 + i, repeat: Infinity, delay: i }}
                        className={`absolute rounded-full blur-2xl ${["bg-primary", "bg-secondary-cyan", "bg-secondary-pink", "bg-accent-emerald", "bg-accent-amber", "bg-primary-violet"][i]
                            }`}
                        style={{
                            width: Math.random() * 200 + 100,
                            height: Math.random() * 200 + 100,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const OfficeParallax = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section ref={ref} className="py-24 bg-gray-10 dark:bg-slate-800 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[600px] group">
                        <motion.div
                            style={{ y: y1 }}
                            className="absolute left-0 top-0 w-3/4 h-3/4 overflow-hidden shadow-2xl z-20 rounded-br-none hover:grayscale-0 transition-all duration-700 rounded-[3rem]"
                        >
                            <Image
                                    src="/1.jpeg"  // Path relatif dari folder public
                                    alt="Deskripsi gambar"  // Wajib untuk accessibility
                                    width={1000}             // Lebar dalam pixel
                                    height={700}            // Tinggi dalam pixel
                                    />
                        </motion.div>
                        <motion.div
                            style={{ y: y2 }}
                            className="absolute right-0 bottom-0 w-3/4 h-3/4 rounded-[3rem] overflow-hidden shadow-2xl z-10   hover:grayscale-0 transition-all duration-700"
                        >
                            <Image
                                    src="/4.jpg"  // Path relatif dari folder public
                                    alt="Deskripsi gambar"  // Wajib untuk accessibility
                                    width={1400}             // Lebar dalam pixel
                                    height={1}            // Tinggi dalam pixel
                                    />






                        </motion.div>
                    </div>

                    <div className="space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-bold leading-tight"
                        >
                            Buku adalah teman yang  <span className="text-secondary-cyan">paling tenang dan setia</span>
                        </motion.h2>
                        <p className="text-lg text-foreground/60 leading-relaxed">
                        Mereka adalah penasihat yang paling mudah diakses dan bijaksana, dan guru yang paling sabar,
                            Membaca adalah cara untuk berdialog dengan pikiran-pikiran terhebat sepanjang sejarah.
                        </p>
                        <div className="flex gap-12">
                            <div>
                                <h4 className="text-3xl font-bold text-primary mb-1">+100</h4>
                                <p className="text-sm font-medium text-foreground/40 uppercase tracking-widest">Kisah Menarik</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-secondary-pink mb-1">+500</h4>
                                <p className="text-sm font-medium text-foreground/40 uppercase tracking-widest">Global edukasi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Book } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="pt-24 pb-12 bg-white dark:bg-slate-900 relative overflow-hidden border-t-8 border-primary transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                                className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-foreground border-b-4 border-yellow-600 shadow-lg"
                            >
                                <Book size={32} fill="currentColor" />
                            </motion.div>
                            <span className="text-3xl font-black dark:text-white tracking-tight">Rumah Peradaban SNC Subang</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-10 leading-tight dark:text-white">
                            Siap membuka <br />
                            <span className="text-primary underline decoration-secondary-cyan/30 underline-offset-8">Jendela Dunia?</span> 🌟
                        </h2>
                        <div className="space-y-6">
                            <motion.div whileHover={{ x: 10 }} className="flex items-center gap-5 text-foreground/70 dark:text-slate-400">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                                    <MapPin size={28} className="text-primary" />
                                </div>
                                <span className="font-bold text-lg">Kp.Blok Pilar RT 20/04 Kec.Purwadadi - Subang</span>
                            </motion.div>
                            <motion.div whileHover={{ x: 10 }} className="flex items-center gap-5 text-foreground/70 dark:text-slate-400">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                                    <Mail size={28} className="text-primary" />
                                </div>
                                <span className="font-bold text-lg">DianNurmala@gmail.com</span>
                            </motion.div>
                            <motion.div whileHover={{ x: 10 }} className="flex items-center gap-5 text-foreground/70 dark:text-slate-400">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                                    <Phone size={28} className="text-primary" />
                                </div>
                                <span className="font-bold text-lg">+62812345678910</span>
                            </motion.div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="p-10 bg-gray-50/50 dark:bg-slate-800/50 rounded-[4rem] border-4 border-gray-100 dark:border-slate-700 backdrop-blur-sm shadow-xl">
                            <h3 className="text-3xl font-black mb-8 dark:text-white">Sapa Kami Yuk! 👋</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="Nama Kamu"
                                        className="w-full px-8 py-5 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/10 transition-all font-black"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Kamu"
                                        className="w-full px-8 py-5 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/10 transition-all font-black"
                                    />
                                </div>
                                <textarea
                                    placeholder="Ceritakan hobimu membaca..."
                                    rows={4}
                                    className="w-full px-8 py-5 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/10 transition-all font-black resize-none"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-6 bg-primary text-foreground rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_10px_0_0_#ca8a04] hover:shadow-[0_5px_0_0_#ca8a04] hover:translate-y-[5px] transition-all border-2 border-yellow-600 active:shadow-none active:translate-y-[10px]"
                                >
                                    Kirim Pesan <Send size={24} />
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t-2 border-gray-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 text-foreground/40 dark:text-slate-500 text-sm font-bold">
                    <p>© 2026 Rumah Kisah Nurmala. Dibuat dengan ❤️ untuk Literasi.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-primary transition-colors">Privasi</a>
                        <a href="#" className="hover:text-primary transition-colors">Ketentuan</a>
                        <a href="#" className="hover:text-primary transition-colors">Kontak</a>
                    </div>
                    <div className="flex gap-4">
                        {["𝕏", "IG", "LI", "FB"].map((s) => (
                            <motion.span
                                key={s}
                                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0], backgroundColor: "#ffd60a", color: "#000" }}
                                className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center cursor-pointer transition-all border-2 border-gray-100 dark:border-slate-700 font-black shadow-sm"
                            >
                                {s}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer
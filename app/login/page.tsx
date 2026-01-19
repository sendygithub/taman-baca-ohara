"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Book, Mail, Lock, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eror, setError]= useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message === "Login berhasil") {
                        router.push("/admin");
                    } else {
                        setError(data.message);
                    }
                });
            
        } catch (error) {

            console.log(error);
            
        }


    };














    return (
        <div className="min-h-screen py-24 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,214,10,0.1),transparent_50%)]" />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-80 h-80 bg-primary-violet/20 rounded-full blur-3xl -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary-cyan/20 rounded-full blur-3xl -z-10"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800">
                    <div className="flex flex-col items-center mb-8">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                            className="w-16 h-16 bg-gradient-to-br from-primary via-accent-amber to-secondary-pink rounded-2xl flex items-center justify-center text-white shadow-xl mb-4"
                        >
                            <Book size={32} fill="currentColor" />
                        </motion.div>
                        <h1 className="text-3xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary-pink to-primary-violet">
                            Selamat Datang
                        </h1>
                        <p className="text-foreground/60 text-center mt-2 font-medium">
                            Masuk ke akun Rumah Kisah Anda
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/70 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 outline-none rounded-2xl py-3 pl-12 pr-4 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-foreground/70">Kata Sandi</label>
                                <Link href="#" className="text-xs font-bold text-primary hover:text-accent-amber transition-colors">
                                    Lupa sandi?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 outline-none rounded-2xl py-3 pl-12 pr-4 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-primary text-foreground font-black py-4 rounded-2xl shadow-lg shadow-primary/25 border-b-4 border-yellow-600 active:border-b-0 flex items-center justify-center gap-2 group mt-8 transition-all"
                        >
                            Masuk Sekarang
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </form>

                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-foreground/10"></div>
                            </div>
                            <span className="relative px-4 text-xs font-bold text-foreground/40 bg-white dark:bg-slate-900 uppercase tracking-widest">
                                Atau masuk dengan
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 py-3 border-2 border-foreground/5 rounded-2xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <Image src="/globe.svg" alt="Google" width={20} height={20} />
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 border-2 border-foreground/5 rounded-2xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <Github size={20} />
                                Github
                            </button>
                        </div>
                    </div>

                    <p className="text-center mt-8 text-sm font-bold text-foreground/60">
                        Belum punya akun?{" "}
                        <Link href="#" className="text-primary hover:text-accent-amber transition-colors">
                            Daftar gratis
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

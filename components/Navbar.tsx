"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Book } from "lucide-react";
import Link from "next/link";

import { DarkModeToggle } from "./DarkModeToggle";

const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "#about" },
    { name: "Program", href: "#services" },
    { name: "Koleksi", href: "#portfolio" },
    { name: "Kontak", href: "#contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-4 shadow-sm border-b border-gray-100 dark:border-slate-800"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        className="w-10 h-10 bg-gradient-to-br from-primary via-accent-amber to-secondary-pink rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20"
                    >
                        <Book size={24} fill="currentColor" />
                    </motion.div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary-pink to-primary-violet">
                        Rumah Kisah<span className="text-foreground"> Nurmala</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold text-foreground/70 hover:text-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <DarkModeToggle />
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-foreground px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-primary/25 hover:bg-yellow-400 transition-all border-b-4 border-yellow-600 active:border-b-0"
                        >
                           <Link href="/admin">
                            <span>Ayo Bergabung</span></Link>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Toggle & Dark Mode */}
                <div className="flex items-center gap-4 md:hidden">
                    <DarkModeToggle />
                    <button
                        className="text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-bold text-foreground/70 active:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button className="bg-primary text-foreground px-6 py-4 rounded-2xl font-bold w-full mt-2 shadow-lg border-b-4 border-yellow-600">
                                Ayo Gabung
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

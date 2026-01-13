"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export const DarkModeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg dark:shadow-slate-900/50 flex items-center justify-center text-primary dark:text-yellow-400 transition-colors"
            aria-label="Toggle Dark Mode"
        >
            {theme === "dark" ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
        </motion.button>
    );
};

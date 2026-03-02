"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        // Artificial delay to show the nice animation and ensure assets are ready
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Restore smooth scrolling for Lenis
            document.body.style.overflow = "";
        }, 2200); // 2.2 seconds total loading screen

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, []);

    // Text reveal animation steps
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.2,
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1] as const, // Fix ts typing for array
            },
        }),
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-foreground text-primary overflow-hidden"
                >
                    {/* Background subtle texture glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_50%)] opacity-5 pointer-events-none" />

                    {/* Logo/Icon Area */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-8 relative "
                    >
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-primary/20 shadow-[0_0_30px_rgba(245,166,35,0.15)] relative z-10">
                            <img src="/logo.jpg" alt="Gusttimo" className="w-full h-full object-cover" />
                        </div>
                        {/* Spinning loader ring behind logo */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute -inset-2 md:-inset-3 border-t border-r border-primary rounded-full opacity-40 z-0"
                        />
                    </motion.div>

                    {/* Masked Typography Reveal */}
                    <div className="overflow-hidden mb-2">
                        <motion.h1
                            custom={1}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-4xl md:text-6xl font-serif font-black italic tracking-widest uppercase text-balance"
                        >
                            GUSTTIMO
                        </motion.h1>
                    </div>

                    <div className="overflow-hidden">
                        <motion.p
                            custom={2}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-background/60 tracking-widest text-xs md:text-sm uppercase font-semibold"
                        >
                            Taste the Italian Wave
                        </motion.p>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}

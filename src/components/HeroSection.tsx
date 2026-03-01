"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Utensils, ShoppingBag } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function HeroSection() {
    const t = useTranslations('Hero');

    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.4 }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-40">
            {/* Background Image with Gradient Overlay positioned fixed for parallax effect */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="fixed inset-0 w-full h-[100vh] min-h-[100vh]">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src="/menu_photos/Mix vafli.jpeg"
                            alt="Gusttimo Gelato and Waffles"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    {/* Milky overlays to ensure dark text reads perfectly while image stays visible */}
                    <div className="absolute inset-0 bg-background/50" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center flex-grow my-auto">
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl"
                >
                    <motion.div variants={itemVars} className="mb-6 inline-block">
                        <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-background/50 backdrop-blur-md text-primary font-medium text-sm tracking-wide uppercase">
                            Taste the Italian Wave 🇮🇹
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVars}
                        className="text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem] font-serif font-black italic tracking-tighter text-foreground leading-[0.9] mb-8 mt-4"
                    >
                        {t('title').split(' ').map((word, i) => (
                            <span key={i} className="inline-block mr-[0.2em]">{word}</span>
                        ))}
                    </motion.h1>

                    <motion.p
                        variants={itemVars}
                        className="text-2xl md:text-3xl text-foreground/90 font-medium max-w-2xl mx-auto mb-10"
                    >
                        {t('subtitle')}
                    </motion.p>

                    <motion.div
                        variants={itemVars}
                        className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full px-4 sm:px-0"
                    >
                        <Link
                            href="#menu"
                            className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-primary text-background rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto shadow-[0_10px_40px_-10px_rgba(245,166,35,0.6)]"
                        >
                            <span className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                            <Utensils size={20} className="relative z-10" />
                            <span className="relative z-10">{t('viewMenu')}</span>
                        </Link>

                        <Link
                            href="#locations"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-background/80 backdrop-blur-md border border-foreground/10 text-foreground rounded-full font-bold text-lg hover:bg-background hover:shadow-xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                        >
                            <MapPin size={20} />
                            <span>{t('ourLocations')}</span>
                        </Link>

                        <a
                            href="https://wolt.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                        >
                            <ShoppingBag size={20} />
                            <span>{t('orderWolt')}</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 text-sm font-medium"
            >
                <span>Scroll to Explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-foreground/50 to-transparent"
                />
            </motion.div>
        </section >
    );
}

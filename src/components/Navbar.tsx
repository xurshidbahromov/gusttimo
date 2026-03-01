"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Home, Utensils, MapPin, Info, ShoppingBag } from 'lucide-react';
import { usePathname } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
    const t = useTranslations('Navigation');
    const tHero = useTranslations('Hero');
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Determine active tab based on current pathname
    const getActiveTab = () => {
        if (pathname === '/menu') return 'menu';
        if (pathname === '/locations') return 'locations';
        if (pathname === '/about') return 'about';
        return 'home';
    };
    const activeTab = getActiveTab();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setIsScrolled(latest > 50);
    });

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" }
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-500 ${isScrolled ? "bg-background/95 backdrop-blur-xl border-b border-foreground/5 shadow-sm py-3" : "bg-transparent py-6"
                    }`}
            >
                <div className="flex items-center gap-8 md:gap-16">
                    <Link href="/" className="flex items-center gap-4 group">
                        <img src="/logo.jpg" alt="Gusttimo Logo" className="w-11 h-11 rounded-full object-cover shadow-sm group-hover:rotate-12 transition-transform duration-300" />
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                            className="flex overflow-hidden items-center text-[1.75rem] font-serif font-black italic tracking-tighter text-primary mt-1"
                        >
                            {"GUSTTIMO".split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    transition={{ type: "spring", damping: 12, stiffness: 100 }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.div>
                    </Link>
                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="/menu" className="relative text-foreground hover:text-primary transition-colors text-xl font-serif font-black italic tracking-wide group pt-1">
                            {t('menu')}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/locations" className="relative text-foreground hover:text-primary transition-colors text-xl font-serif font-black italic tracking-wide group pt-1">
                            {t('locations')}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/about" className="relative text-foreground hover:text-primary transition-colors text-xl font-serif font-black italic tracking-wide group pt-1">
                            {t('about')}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <a
                        href="https://wolt.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex px-5 py-2.5 bg-foreground text-background rounded-full font-medium text-sm hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-xl"
                    >
                        {tHero('orderWolt')}
                    </a>
                </div>
            </motion.nav>

            {/* Mobile Floating Bottom Navigation Bar */}
            <AnimatePresence>
                {!hidden && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[400px] md:max-w-[500px]"
                    >
                        <div className="bg-background/80 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2rem] p-2 flex items-center justify-between shadow-black/10 md:p-3 relative">
                            {/* Home Tab */}
                            <Link href="/" className="relative flex flex-col items-center justify-center w-16 h-14 md:w-20 md:h-16 rounded-2xl md:rounded-[1.5rem] group transition-colors flex-1">
                                {activeTab === 'home' && (
                                    <motion.div layoutId="mobileNavBg" className="absolute inset-0 bg-foreground rounded-[1.25rem] md:rounded-[1.5rem]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                                )}
                                <Home className={`relative z-10 w-6 h-6 md:w-7 md:h-7 mb-1 transition-colors ${activeTab === 'home' ? 'text-background' : 'text-foreground/50'}`} />
                                <span className={`relative z-10 text-[10px] md:text-xs font-bold transition-colors ${activeTab === 'home' ? 'text-background' : 'text-foreground/50'}`}>Home</span>
                            </Link>

                            {/* Menu Tab */}
                            <Link href="/menu" className="relative flex flex-col items-center justify-center w-16 h-14 md:w-20 md:h-16 rounded-2xl md:rounded-[1.5rem] group transition-colors flex-1">
                                {activeTab === 'menu' && (
                                    <motion.div layoutId="mobileNavBg" className="absolute inset-0 bg-foreground rounded-[1.25rem] md:rounded-[1.5rem]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                                )}
                                <Utensils className={`relative z-10 w-6 h-6 md:w-7 md:h-7 mb-1 transition-colors ${activeTab === 'menu' ? 'text-background' : 'text-foreground/50'}`} />
                                <span className={`relative z-10 text-[10px] md:text-xs font-bold transition-colors ${activeTab === 'menu' ? 'text-background' : 'text-foreground/50'}`}>{t('menu')}</span>
                            </Link>

                            {/* Locations Tab */}
                            <Link href="/locations" className="relative flex flex-col items-center justify-center w-16 h-14 md:w-20 md:h-16 rounded-2xl md:rounded-[1.5rem] group transition-colors flex-1">
                                {activeTab === 'locations' && (
                                    <motion.div layoutId="mobileNavBg" className="absolute inset-0 bg-foreground rounded-[1.25rem] md:rounded-[1.5rem]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                                )}
                                <MapPin className={`relative z-10 w-6 h-6 md:w-7 md:h-7 mb-1 transition-colors ${activeTab === 'locations' ? 'text-background' : 'text-foreground/50'}`} />
                                <span className={`relative z-10 text-[10px] md:text-xs font-bold transition-colors ${activeTab === 'locations' ? 'text-background' : 'text-foreground/50'}`}>{t('locations')}</span>
                            </Link>

                            {/* About Tab */}
                            <Link href="/about" className="relative flex flex-col items-center justify-center w-16 h-14 md:w-20 md:h-16 rounded-2xl md:rounded-[1.5rem] group transition-colors flex-1">
                                {activeTab === 'about' && (
                                    <motion.div layoutId="mobileNavBg" className="absolute inset-0 bg-foreground rounded-[1.25rem] md:rounded-[1.5rem]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                                )}
                                <Info className={`relative z-10 w-6 h-6 md:w-7 md:h-7 mb-1 transition-colors ${activeTab === 'about' ? 'text-background' : 'text-foreground/50'}`} />
                                <span className={`relative z-10 text-[10px] md:text-xs font-bold transition-colors ${activeTab === 'about' ? 'text-background' : 'text-foreground/50'}`}>{t('about')}</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

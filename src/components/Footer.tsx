"use client";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
    const t = useTranslations('Navigation');
    return (
        <footer className="bg-foreground text-background py-20 px-6 md:px-12 border-t border-background/10 relative overflow-hidden">
            {/* Background Texture elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-5 pointer-events-none" />

            <div className="container mx-auto">
                {/* Massive Branding */}
                <div className="flex flex-col items-center justify-center text-center mb-20 relative z-10">
                    <img src="/logo.jpg" alt="Gusttimo Logo" className="w-24 h-24 rounded-full object-cover mb-8 shadow-[0_0_30px_rgba(245,166,35,0.2)]" />
                    <h2 className="text-6xl md:text-8xl lg:text-[12rem] font-serif font-black italic tracking-tighter text-primary leading-[0.8] drop-shadow-lg text-balance">
                        GUSTTIMO
                    </h2>
                    <p className="mt-8 text-2xl font-serif italic text-background/60 max-w-md mx-auto">
                        Taste the Italian Wave 🇮🇹<br />Original Gelato & Waffles
                    </p>
                </div>

                {/* Grid Layout for Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16 relative z-10 border-t border-background/10 pt-16">
                    {/* Navigation */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h4 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">{t('explore')}</h4>
                        <Link href="/menu" className="text-xl font-serif text-background/80 hover:text-white transition-colors hover:translate-x-2 transform duration-300 w-fit">{t('menu')}</Link>
                        <Link href="/locations" className="text-xl font-serif text-background/80 hover:text-white transition-colors hover:translate-x-2 transform duration-300 w-fit">{t('locations')}</Link>
                        <Link href="/about" className="text-xl font-serif text-background/80 hover:text-white transition-colors hover:translate-x-2 transform duration-300 w-fit">{t('about')}</Link>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h4 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">{t('socials')}</h4>
                        <a href="https://instagram.com/gusttimo.uz" target="_blank" rel="noopener noreferrer" className="text-xl font-serif text-background/80 hover:text-white transition-colors hover:translate-x-2 transform duration-300 w-fit">{t('instagram')}</a>
                        <a href="https://www.facebook.com/gusttimouz/" target="_blank" rel="noopener noreferrer" className="text-xl font-serif text-background/80 hover:text-white transition-colors hover:translate-x-2 transform duration-300 w-fit">{t('facebook')}</a>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h4 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">{t('delivery')}</h4>
                        <a href="https://wolt.com" target="_blank" rel="noopener noreferrer" className="text-xl font-serif text-background/80 hover:text-white transition-colors hover:translate-x-2 transform duration-300 w-fit">Wolt</a>
                        <a href="https://yandex.com/delivery" target="_blank" rel="noopener noreferrer" className="text-xl font-serif text-background/80 hover:text-white transition-colors hover:translate-x-2 transform duration-300 w-fit">Yandex Go</a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center text-background/40 text-sm">
                    <p>&copy; {new Date().getFullYear()} Gusttimo. {t('rights')}</p>
                    <p className="mt-2 md:mt-0 italic">{t('designedBy')}</p>
                </div>
            </div>
        </footer>
    );
}

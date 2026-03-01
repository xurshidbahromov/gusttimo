"use client";
import { useTranslations } from 'next-intl';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function CTASection() {
    const t = useTranslations('CTA');

    return (
        <section className="py-32 bg-primary relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                <h2 className="text-6xl md:text-8xl font-serif font-black italic tracking-tighter text-background mb-8 leading-[0.9] pt-4">
                    {t('title')}
                </h2>
                <p className="text-xl md:text-2xl text-background/80 font-medium max-w-2xl mx-auto mb-12">
                    {t('subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <a
                        href="https://wolt.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-5 bg-foreground text-background rounded-full font-bold text-lg hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl w-full sm:w-auto"
                    >
                        <ShoppingBag size={22} />
                        <span>{t('orderWolt')}</span>
                    </a>

                    <Link
                        href="#locations"
                        className="group flex items-center justify-center gap-3 px-8 py-5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-background rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
                    >
                        <span>{t('findNearest')}</span>
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

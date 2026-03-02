"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function ReviewsSection() {
    const t = useTranslations('Reviews');

    const localizedReviews = [
        { id: 1, rating: 5, name: t('items.1.name'), text: t('items.1.text') },
        { id: 2, rating: 5, name: t('items.2.name'), text: t('items.2.text') },
        { id: 3, rating: 5, name: t('items.3.name'), text: t('items.3.text') },
        { id: 4, rating: 5, name: t('items.4.name'), text: t('items.4.text') },
        { id: 5, rating: 5, name: t('items.5.name'), text: t('items.5.text') }
    ];

    // Duplicate for marquee effect
    const marqueeItems = [...localizedReviews, ...localizedReviews];

    return (
        <section className="py-24 bg-foreground text-background overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_80%)] opacity-10" />

            <div className="container mx-auto px-6 md:px-12 mb-12 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-primary">
                    {t('title')}
                </h2>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-6 px-3"
                >
                    {marqueeItems.map((review, idx) => (
                        <div
                            key={`${review.id}-${idx}`}
                            className="w-[350px] md:w-[450px] shrink-0 bg-background/5 border border-background/10 p-8 rounded-3xl backdrop-blur-md hover:bg-background/10 transition-colors"
                        >
                            <div className="flex gap-1 mb-4 text-primary">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-xl md:text-2xl font-medium mb-6 text-balance leading-snug">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    {review.name.charAt(0)}
                                </div>
                                <span className="font-medium text-background/80">{review.name}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

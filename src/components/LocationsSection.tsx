"use client";
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';

const BRANCHES = [
    {
        id: 1,
        name: "Gusttimo Center",
        address: "Uzbekistan Ave 8, Tashkent",
        hours: "8:00 AM – 11:00 PM (Sun 10:00 AM)",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95900.58303773422!2d69.09852274732773!3d41.31118650000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0002e137fd%3A0x6babbe8fd63aef6d!2sGusttimo!5e0!3m2!1sen!2s!4v1772364603653!5m2!1sen!2s"
    },
    {
        id: 2,
        name: "Gusttimo - 9933+JJR",
        address: "9933+JJR, Tashkent, Uzbekistan",
        hours: "8:00 AM – 12:00 AM (Mon-Sun)",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95838.19284836669!2d69.20164099726561!3d41.35358120000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5ba972eea8f%3A0xf14657f8edcf54d!2sGUSTTIMO!5e0!3m2!1sen!2s!4v1772364707463!5m2!1sen!2s"
    },
    {
        id: 3,
        name: "Gusttimo Babur",
        address: "Babur Street 174/8, Tashkent",
        hours: "8:00 AM – 11:00 PM (Default)",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95911.73144121637!2d69.09285599726562!3d41.30360730000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b007f85e03d%3A0x8cf7d25745900499!2sGusttimo!5e0!3m2!1sen!2s!4v1772364764130!5m2!1sen!2s"
    },
];

export default function LocationsSection() {
    const t = useTranslations('Locations');
    const [activeBranch, setActiveBranch] = useState(BRANCHES[0]);

    return (
        <section id="locations" className="relative py-24 bg-background overflow-hidden overflow-x-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,166,35,0.08),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(92,58,33,0.05),transparent_50%)] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-6 md:px-12">
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter text-foreground mb-4 leading-none pt-4">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    {/* Branches List */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {BRANCHES.map((branch, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ delay: idx * 0.1, duration: 0.3 }}
                                viewport={{ once: true }}
                                key={branch.id}
                                onClick={() => setActiveBranch(branch)}
                                className={`group relative p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-start items-start overflow-hidden ${activeBranch.id === branch.id
                                    ? 'bg-primary/5 border-primary shadow-xl shadow-primary/10'
                                    : 'bg-background border-foreground/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5'
                                    }`}
                            >
                                {/* Active Indicator Bar */}
                                <div className={`absolute left-0 top-0 w-1.5 h-full transition-colors duration-300 ${activeBranch.id === branch.id ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/30'}`} />

                                <div className="flex justify-between items-center w-full mb-3 pl-2">
                                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-serif font-black transition-colors ${activeBranch.id === branch.id ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                                        {branch.name}
                                    </h3>
                                </div>
                                <div className="space-y-2 pl-2">
                                    <p className="text-foreground/70 text-sm flex items-center gap-2">
                                        <MapPin size={16} className="shrink-0 text-primary" />
                                        {branch.address}
                                    </p>
                                    <p className="text-foreground/70 text-sm flex items-center gap-2">
                                        <Clock size={16} className="shrink-0 text-primary" />
                                        {branch.hours}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Map Embed Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 h-[400px] sm:h-[500px] lg:h-[700px] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border border-foreground/10 relative"
                    >
                        <iframe
                            key={activeBranch.id}
                            src={activeBranch.mapSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: "contrast(1.05) opacity(0.9) hue-rotate(15deg)" }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 animate-in fade-in"
                        ></iframe>
                        {/* Glass Overlay on borders */}
                        <div className="absolute inset-0 pointer-events-none rounded-[2rem] ring-1 ring-inset ring-white/10 dark:ring-white/5" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

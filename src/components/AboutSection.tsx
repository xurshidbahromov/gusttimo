"use client";
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Award, Map, Heart, ChevronDown } from 'lucide-react';

export default function AboutSection() {
    const t = useTranslations('About');
    const tFeatures = useTranslations('Features');

    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Directly use scrollYProgress (bypassing heavy useSpring physics parsing)
    // Parallax mapping ranges for Hero
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const scale1 = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
    const opacityText = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [1, 0, 0, 0]);

    // Secondary mapping ranges for Content
    const yImage1 = useTransform(scrollYProgress, [0, 1], [50, -80]);
    const yText1 = useTransform(scrollYProgress, [0, 1], [100, -150]);
    const yText2 = useTransform(scrollYProgress, [0, 1], [50, -80]);
    const yImage2 = useTransform(scrollYProgress, [0, 1], [150, -200]);

    const innerImg1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const innerImg2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section ref={containerRef} className="relative min-h-[300vh] bg-background text-foreground overflow-clip">

            {/* Sticky Hero Header Container */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <motion.div
                    style={{ opacity: opacityText }}
                    className="absolute z-20 text-center px-6 flex flex-col items-center"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-primary font-bold tracking-[0.3em] text-sm md:text-base uppercase mb-8"
                    >
                        {t('subtitle')}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-[4.5rem] sm:text-[8rem] md:text-[14rem] lg:text-[18rem] font-serif font-black italic tracking-tighter text-foreground uppercase leading-none opacity-90 text-center"
                    >
                        {t('title').split(' ')[0]}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute -bottom-32 md:-bottom-48 flex flex-col items-center gap-2 text-foreground/50"
                    >
                        <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                            <ChevronDown size={20} />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Parallax Images */}
                <motion.div
                    style={{ y: y1, scale: scale1 }}
                    className="absolute inset-x-0 bottom-[-10%] md:bottom-[-20%] h-[60vh] md:h-[80vh] z-10 mx-auto max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl"
                >
                    <img
                        src="/menu_photos/Mix vafli.jpeg"
                        className="w-full h-full object-cover"
                        alt="Gusttimo Hero Mix Waffle"
                    />
                    <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                </motion.div>

                <motion.div
                    style={{ y: y2 }}
                    className="absolute right-[-5%] md:right-12 top-[20%] w-[50vw] md:w-[35vw] max-w-md aspect-[3/4] rounded-[2rem] overflow-hidden z-0 rotate-6 shadow-2xl shadow-primary/20 border border-white/10"
                >
                    <img
                        src="/menu_photos/Fistashka vafli.jpeg"
                        className="w-full h-full object-cover"
                        alt="Gusttimo Pistachio"
                    />
                    <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                </motion.div>

                <motion.div
                    style={{ y: y1 }}
                    className="absolute left-[-10%] md:left-24 top-[50%] md:top-[40%] w-[45vw] md:w-[25vw] max-w-xs aspect-square rounded-full overflow-hidden z-30 -rotate-12 shadow-2xl shadow-black/50 border border-white/5"
                >
                    <img
                        src="/menu_photos/Qlubnay with banan.jpeg"
                        className="w-full h-full object-cover"
                        alt="Gusttimo Strawberries"
                    />
                    <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10 pointer-events-none" />
            </div>

            {/* Structured Content Overlay */}
            <div className="relative z-30 bg-background pt-32 pb-48 px-6 md:px-12 -mt-10 rounded-t-[4rem] border-t border-foreground/10">
                {/* Background elements for depth */}
                <motion.div style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 45]) }} className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                <motion.div style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -45]) }} className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-foreground/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10">

                    {/* Hero Split Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-40 items-center">
                        {/* Left: Main Image */}
                        <motion.div
                            style={{ y: yImage1 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="lg:col-span-7 aspect-[4/3] rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-white/10 group bg-foreground/5"
                        >
                            <motion.img
                                style={{ y: innerImg1, scale: 1.15 }}
                                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2000" // Premium Gelato Shot
                                alt="Gusttimo Premium Gelato"
                                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[3s] ease-out origin-center"
                            />
                            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Right: Story Details */}
                        <motion.div
                            style={{ y: yText1 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 flex flex-col justify-center relative mt-8 lg:mt-0"
                        >
                            <h3 className="text-3xl md:text-5xl font-serif italic font-black mb-6 text-foreground/90 leading-snug text-center lg:text-left">
                                {t('description1')}
                            </h3>
                            <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-10 font-medium text-center lg:text-left">
                                {t('description2')}
                            </p>

                            <div className="inline-flex items-center gap-5 p-5 rounded-2xl bg-primary/10 border border-primary/20 self-center lg:self-start shadow-xl shadow-primary/5">
                                <Award className="text-primary w-8 h-8 shrink-0" />
                                <p className="font-serif italic text-sm text-foreground/90 font-black uppercase tracking-widest whitespace-nowrap">
                                    Tradition & Modernity
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Secondary Section: Features & process */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left: Features Grid */}
                        <motion.div style={{ y: yText2 }} className="order-2 lg:order-1">
                            <motion.h4
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="text-2xl md:text-3xl font-black tracking-tight mb-8 md:mb-10 font-serif italic text-center lg:text-left"
                            >
                                Why Choose Gusttimo?
                            </motion.h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: Award, label: tFeatures('recipe') },
                                    { icon: Leaf, label: tFeatures('ingredients') },
                                    { icon: Map, label: tFeatures('branches') },
                                    { icon: Heart, label: tFeatures('vibe') }
                                ].map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                                        className="flex items-center gap-4 border border-foreground/10 bg-background/50 backdrop-blur p-5 rounded-2xl hover:bg-foreground/[0.03] hover:border-primary/30 hover:shadow-lg transition-all group"
                                    >
                                        <div className="bg-foreground/5 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                                            <feature.icon size={24} className="text-foreground/70 group-hover:text-primary transition-colors" />
                                        </div>
                                        <span className="text-base font-bold text-foreground/90">
                                            {feature.label}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Secondary Image */}
                        <motion.div
                            style={{ y: yImage2 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="order-1 lg:order-2 aspect-[4/5] md:aspect-square w-full max-w-lg mx-auto rounded-[3rem] overflow-hidden relative group shadow-2xl border border-white/5 bg-foreground/5"
                        >
                            <motion.img
                                style={{ y: innerImg2, scale: 1.15 }}
                                src="/menu_photos/Banan and Nutella.jpeg" // Real Gusttimo Product
                                alt="Gusttimo Craftsmanship"
                                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[4s] ease-out origin-top"
                            />
                            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

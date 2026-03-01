"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const IG_POSTS = [
    { id: 1, image: '/menu_photos/Kombo 2.jpeg', likes: '1.2k', comments: '45' },
    { id: 2, image: '/menu_photos/Banan and Nutella.jpeg', likes: '856', comments: '23' },
    { id: 3, image: '/menu_photos/Fistashka vafli.jpeg', likes: '2.1k', comments: '112' },
    { id: 4, image: '/menu_photos/Qulbnay and banan.jpeg', likes: '945', comments: '38' },
    { id: 5, image: '/menu_photos/Chiskeyk klassik.jpeg', likes: '1.5k', comments: '64' },
    { id: 6, image: '/menu_photos/Latte.jpeg', likes: '3.4k', comments: '189' },
    { id: 7, image: '/menu_photos/Mevali accorti.jpeg', likes: '768', comments: '19' },
];

export default function InstagramSection() {
    const t = useTranslations('Instagram');

    return (
        <section className="py-24 bg-foreground text-background overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--color-primary)_0%,_transparent_60%)] opacity-10" />

            <div className="container mx-auto px-6 md:px-12 text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white mb-8 shadow-2xl shadow-purple-500/20"
                >
                    <Instagram size={40} />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-8xl font-serif font-black italic tracking-tighter mb-4 text-balance"
                >
                    {t('title')}
                </motion.h2>
                <motion.a
                    href="https://instagram.com/gusttimo.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-primary font-medium hover:text-white transition-colors"
                >
                    {t('handle')}
                </motion.a>
            </div>

            {/* Swiper 3D Coverflow */}
            <div className="w-full relative z-10 px-0 md:px-12 lg:px-24">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 20,
                        stretch: 0,
                        depth: 300,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="w-full !pb-16"
                >
                    {IG_POSTS.map((post) => (
                        <SwiperSlide key={post.id} className="!w-[280px] md:!w-[350px] lg:!w-[420px]">
                            <div className="group relative aspect-square rounded-[3rem] overflow-hidden bg-background shadow-2xl shadow-black/50 transform transition-transform duration-500">
                                <img
                                    src={post.image}
                                    alt={`Instagram post ${post.id}`}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                    <div className="flex items-center gap-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2 font-bold text-lg">
                                            <Heart className="fill-current text-primary" size={24} />
                                            <span>{post.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-2 font-bold text-lg">
                                            <MessageCircle className="fill-current text-primary" size={24} />
                                            <span>{post.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.4);
                    width: 10px;
                    height: 10px;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                    background: var(--color-primary);
                    width: 24px;
                    border-radius: 5px;
                }
            `}</style>
        </section>
    );
}

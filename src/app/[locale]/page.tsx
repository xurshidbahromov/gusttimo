import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/HeroSection';
import ReviewsSection from '@/components/ReviewsSection';
import InstagramSection from '@/components/InstagramSection';
import CTASection from '@/components/CTASection';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <HeroSection />
            <ReviewsSection />
            <InstagramSection />
            <CTASection />
        </main>
    );
}

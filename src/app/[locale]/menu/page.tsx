import { setRequestLocale } from 'next-intl/server';
import MenuSection from '@/components/MenuSection';

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="min-h-screen pt-24">
            <MenuSection />
        </main>
    );
}

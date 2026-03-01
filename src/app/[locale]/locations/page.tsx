import { setRequestLocale } from 'next-intl/server';
import LocationsSection from '@/components/LocationsSection';

export default async function LocationsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="min-h-screen pt-24">
            <LocationsSection />
        </main>
    );
}

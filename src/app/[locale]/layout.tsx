import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Playfair_Display, Manrope } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
    title: "Gusttimo | Premium Gelato & Belgian Waffles in Tashkent",
    description: "Experience the authentic taste of Italian Gelato, crispy Belgian Waffles, Fondue, and Premium Coffee at Gusttimo in Uzbekistan.",
    keywords: ["Gelato", "Belgian Waffles", "Desserts", "Coffee", "Fondue", "Gusttimo", "Tashkent", "Ice Cream", "Cafe", "Uzbekistan", "Taste the Italian Wave"],
    icons: {
        icon: '/logo.jpg',
        apple: '/logo.jpg',
    },
    openGraph: {
        title: "Gusttimo - Taste the Italian Wave",
        description: "Original Gelato & Belgian Waffles in Tashkent, Uzbekistan",
        images: ['/logo.jpg'],
        type: 'website',
    },
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} className="lenis lenis-smooth" suppressHydrationWarning>
            <body className={`${manrope.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
                <NextIntlClientProvider messages={messages}>
                    <Preloader />
                    <SmoothScroll>
                        <Navbar />
                        {children}
                        <Footer />
                    </SmoothScroll>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

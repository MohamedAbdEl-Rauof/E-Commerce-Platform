import "./globals.css";
import type {Metadata} from 'next';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from './AuthProvider';
import {ThemeProvider} from '@/context/theme-context';

import {Inter, Roboto_Mono} from 'next/font/google';

export const metadata: Metadata = {
    title: {
        default: '3legant — Modern Furniture & Home Store',
        template: '%s | 3legant',
    },
    description:
        '3legant is a modern furniture and home-goods store. Discover curated living room, bedroom, kitchen, lighting, office and outdoor collections.',
    icons: {
        icon: '/icon.svg',
    },
};

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
});

const RootLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <AuthProvider>
            <ThemeProvider attribute="class">
                <ToastContainer/>
                {children}
            </ThemeProvider>
        </AuthProvider>
        </body>
        </html>
    );
};

export default RootLayout;
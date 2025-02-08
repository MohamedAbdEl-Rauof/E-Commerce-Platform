"use client";

import "./globals.css";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from './AuthProvider';
import {ThemeProvider} from '@/context/theme-context';

import {Inter, Roboto_Mono} from 'next/font/google';

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
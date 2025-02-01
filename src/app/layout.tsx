"use client";

import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from './AuthProvider';
import {ThemeProvider} from '@/context/theme-context';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const RootLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
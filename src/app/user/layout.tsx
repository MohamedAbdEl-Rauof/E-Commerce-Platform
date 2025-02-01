import React from 'react';
import {CartProvider} from "@/context/AddToCartContext";
import {ProductProvider} from "@/context/ProductContext";
import {SliderProvider} from "@/context/SliderContext";
import {CategoriesProvider} from "@/context/CategoriesContext";
import Header from "@/components/common/user/Header/Page";
import Footer from "@/components/common/user/Footer";

// Import these from your root layout or define them here if they're user-specific
import {Geist, Geist_Mono} from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function UserLayout({children}: { children: React.ReactNode }) {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <SliderProvider>
                <CategoriesProvider>
                    <ProductProvider>
                        <CartProvider>
                            <div className="flex flex-col min-h-screen">
                                <Header/>
                                <main className="flex-grow">
                                    {children}
                                </main>
                                <Footer/>
                            </div>
                        </CartProvider>
                    </ProductProvider>
                </CategoriesProvider>
            </SliderProvider>
        </div>
    );
}
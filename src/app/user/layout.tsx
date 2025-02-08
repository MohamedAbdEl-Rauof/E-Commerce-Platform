import React from 'react';
import {CartProvider} from "@/context/AddToCartContext";
import {ProductProvider} from "@/context/ProductContext";
import {SliderProvider} from "@/context/SliderContext";
import {CategoriesProvider} from "@/context/CategoriesContext";
import Header from "@/components/common/user/Header/Page";
import Footer from "@/components/common/user/Footer";

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

export default function UserLayout({children}: { children: React.ReactNode }) {
    return (
        <div className={`${inter.variable} ${robotoMono.variable} antialiased`}>
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
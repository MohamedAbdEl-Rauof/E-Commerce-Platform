import React from 'react';
import {CartProvider} from "@/context/AddToCartContext";
import {ProductProvider} from "@/context/ProductContext";
import Header from "@/components/common/user/Header/Page";
import Footer from "@/components/common/user/Footer";

export default function UserLayout({children}: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <ProductProvider>
                <div className="flex flex-col min-h-screen">
                    <Header/>
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer/>
                </div>
            </ProductProvider>
        </CartProvider>
    );
}
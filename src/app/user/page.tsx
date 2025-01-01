"use client";
import Home from "@/app/user/home/page";
import {CartProvider} from "@/context/AddToCartContext";
import {ProductProvider} from "@/context/ProductContext";
import Header from "@/components/common/user/Header/Page";
import * as React from "react";
import Footer from "@/components/common/user/Footer";

const Page = () => {

    return (
        <div>
            {/* Made CartProvider to listen the state in all project */}
            <CartProvider>
                <ProductProvider>
                    <div className="mb-10">
                        <Header />
                    </div>
                    <Home/>
                    <Footer/>
                </ProductProvider>
            </CartProvider>

        </div>
    );
};

export default Page;
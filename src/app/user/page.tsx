"use client";
import Home from "@/app/user/home/page";
import {CartProvider} from "@/context/AddToCartContext";
import {ProductProvider} from "@/context/ProductContext";
import Header from "@/components/common/user/Header/Page";
import * as React from "react";

const Page = () => {

    return (
        <div>
            {/* Made CartProvider to listen the state in all project */}
            <CartProvider>
                <ProductProvider>
                    <Header/>
                    <Home/>
                </ProductProvider>
            </CartProvider>

        </div>
    );
};

export default Page;
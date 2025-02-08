"use client";

import Page from "./user/page";
import {SliderProvider} from "@/context/SliderContext";
import {CartProvider} from "@/context/AddToCartContext";
import {ProductProvider} from "@/context/ProductContext";
import {CategoriesProvider} from "@/context/CategoriesContext";
import Header from "@/components/common/user/Header/Page";
import React from "react";
import Footer from "@/components/common/user/Footer";

export default function App() {
    return (
        <SliderProvider>
            <CartProvider>
                <ProductProvider>
                    <CategoriesProvider>
                        <div className="">
                            <div>
                                <Header/>
                                <Page/>
                                <Footer/>
                            </div>
                        </div>
                    </CategoriesProvider>
                </ProductProvider>
            </CartProvider>
        </SliderProvider>
    );
}
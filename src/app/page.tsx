"use client";

import Page from "./user/page";
import {SliderProvider} from "@/context/SliderContext";
import {CartProvider} from "@/context/AddToCartContext";
import {ProductProvider} from "@/context/ProductContext";
import {CategoriesProvider} from "@/context/CategoriesContext";

export default function App() {
    return (
        <SliderProvider>
            <CartProvider>
                <ProductProvider>
                    <CategoriesProvider>
                        <div className="">
                            <div>
                                <Page/>
                            </div>
                        </div>
                    </CategoriesProvider>
                </ProductProvider>
            </CartProvider>
        </SliderProvider>
    );
}
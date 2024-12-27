"use client";
import React from "react";
import {SliderProvider} from "@/context/SliderContext";
import SliderImage from "./components/SliderImage";
import TextSection from "./components/TextSection";
import Categories from "./components/Categories";
import {CategoriesProvider} from "@/context/CategoriesContext";
import NewArrivalsProduct from "./components/NewArrivalsProduct";
import {ProductProvider} from "@/context/ProductContext";
import ValuesSection from "@/app/user/home/components/ValuesSection";
import BannerSection from "@/app/user/home/components/BannerSection";
import Newsletter from "@/components/common/user/Newsletter";
import {CartProvider} from "@/context/AddToCartContext";

const HomeContent = () => {

    return (
        <>
            <div className="w-[90%] mx-auto space-y-16">
                <SliderImage/>

                <TextSection/>

                <Categories/>

                <NewArrivalsProduct/>

                <ValuesSection/>
            </div>
            <div>
                <BannerSection/>
            </div>
            <div>
                <Newsletter/>
            </div>
        </>
    );
};

const Home = () => {
    return (
        <SliderProvider>
            <CategoriesProvider>
                <ProductProvider>
                    <CartProvider>
                        <HomeContent/>
                    </CartProvider>
                </ProductProvider>
            </CategoriesProvider>
        </SliderProvider>
    );
};

export default Home;
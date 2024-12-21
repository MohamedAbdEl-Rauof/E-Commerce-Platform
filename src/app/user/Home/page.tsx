"use client";
import React from "react";
import {SliderProvider} from "@/context/SliderContext";
import SliderImage from "./components/SliderImage";
import TextSection from "./components/TextSection";
import Categories from "./components/Categories";
import {CategoriesProvider} from "@/context/CategoriesContext";
import NewArrivalsProduct from "./components/NewArrivalsProduct";
import {ProductProvider} from "@/context/ProductContext";

const HomeContent = () => {

    return (
        <>
            <div className="w-[90%] mx-auto">
                <SliderImage/>
            </div>
            <div className=" mt-10 ml-10">
                <TextSection/>
            </div>
            <div>
                <Categories/>
            </div>
            <div>
                <NewArrivalsProduct/>
            </div>
        </>
    );
};

const Home = () => {
    return (
        <SliderProvider>
            <CategoriesProvider>
                <ProductProvider>
                    <HomeContent/>
                </ProductProvider>
            </CategoriesProvider>
        </SliderProvider>
    );
};

export default Home;
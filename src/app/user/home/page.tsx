"use client";
import React from "react";
import SliderImage from "./components/SliderImage";
import TextSection from "./components/TextSection";
import Categories from "./components/Categories";
import NewArrivalsProduct from "./components/NewArrivalsProduct";
import ValuesSection from "@/app/user/home/components/ValuesSection";
import BannerSection from "@/app/user/home/components/BannerSection";
import Newsletter from "@/components/common/user/Newsletter";

const Home = () => {
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

export default Home;
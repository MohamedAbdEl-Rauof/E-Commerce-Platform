"use client";
import React, {useEffect, useState} from "react";
import dynamic from 'next/dynamic';
import TextSection from "./components/TextSection";
import Categories from "./components/Categories";
import ValuesSection from "@/app/user/home/components/ValuesSection";
import BannerSection from "@/app/user/home/components/BannerSection";

// Dynamically import components that might use browser APIs
const SliderImage = dynamic(() => import("./components/SliderImage"), {ssr: false});
const NewArrivalsProduct = dynamic(() => import("./components/NewArrivalsProduct"), {ssr: false});
const Newsletter = dynamic(() => import("@/components/common/user/Newsletter"), {ssr: false});

const Home = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <div className="w-[90%] mx-auto space-y-16">
                {isClient && <SliderImage/>}
                <TextSection/>
                <Categories/>
                {isClient && <NewArrivalsProduct/>}
                <ValuesSection/>
            </div>
            <div>
                <BannerSection/>
            </div>
            <div>
                {isClient && <Newsletter/>}
            </div>
        </>
    );
};

export default Home;
"use client"
import React, {useEffect, useState} from "react";
import {SliderProvider} from "@/context/SliderContext";
import SliderImage from "./components/SliderImage";
import TextSection from "./components/TextSection";
import Loading from "@/components/common/Loading";

const Home = () => {
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <div className="">
            <div className="w-[90%] mx-auto">
                <SliderProvider>
                    <>
                        <SliderImage/>

                    </>
                </SliderProvider>
            </div>

            <div className="w-full mt-10">
                <TextSection/>
            </div>
        </div>
    );
};

export default Home;
import {FaArrowRight} from "react-icons/fa";
import React from "react";
import Link from "next/link";
import BannerSectionLoading from "@/components/userUiLoading/Home/BannerSectionLoading";
import {useSlider} from "@/context/SliderContext";
import {useCategories} from "@/context/CategoriesContext";
import Image from "next/image";

const BannerSection = () => {
    const {loading: sliderLoading} = useSlider();
    const {loading: categoriesLoading} = useCategories();

    return (
        <div>
            {(sliderLoading && categoriesLoading) ? (
                <BannerSectionLoading/>
            ) : (
                <div
                    className="flex flex-col md:flex-row justify-between mt-20 h-auto min-h-[120px] md:h-[650px] bg-white text-black">
                    <div className="bg-slate-200 flex-1 flex justify-center items-center">
                        <Image
                            src="/images/Paste image.jpg"
                            alt="Sign Up"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Content Section */}
                    <div className="flex-1 p-6 md:p-4 flex flex-col justify-center bg-gray-100">
                        <div className="pl-9 text-center md:text-left mx-auto md:mx-0 md:w-10/12 lg:w-8/12">
                            <p className="mt-6 text-blue-500 font-bold text-lg md:text-xl">
                                SALE UP TO 35% OFF
                            </p>
                            <div className="mt-4 font-bold text-3xl md:text-4xl lg:text-5xl">
                                <h1>HUNDREDS of</h1>
                                <h1>New lower prices!</h1>
                            </div>
                            <p className="mt-6 text-gray-700 text-sm md:text-base">
                                It’s more affordable than ever to give every room in your home a
                                stylish makeover
                            </p>
                            <u className="mt-7 flex justify-center md:justify-start items-center text-black font-bold cursor-pointer hover:underline">
                                <Link href="/pages/Categories">Show More</Link>
                                <FaArrowRight
                                    className="ml-1 transform transition-transform duration-300 hover:translate-x-1"/>
                            </u>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerSection;
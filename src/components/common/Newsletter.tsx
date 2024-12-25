import React from "react";
import Link from "next/link";
import NewsletterLoading from "../userUiLoading/commonUiLoading/NewsletterLoading";
import {useCategories} from "@/context/CategoriesContext";
import {useSlider} from "@/context/SliderContext";
import Image from "next/image";

const Newsletter = () => {
    const {loading: sliderLoading} = useSlider();
    const {loading: categoriesLoading} = useCategories();

    return (
        <div>
            {(sliderLoading && categoriesLoading) ? (
                <NewsletterLoading/>
            ) : (
                <div className="relative bg-white text-black">
                    <Image
                        width={500}
                        height={500}
                        src="/images/Paste image (1).jpg"
                        className="w-full"
                        alt="Join Our Newsletter"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold">Join Our Newsletter</h1>
                        <p className="mt-6 text-center">
                            <Link href="/signup" className="font-bold text-orange-400">
                                <u>Sign up</u>
                            </Link>{" "}
                            for deals, new products, and promotions
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Newsletter;
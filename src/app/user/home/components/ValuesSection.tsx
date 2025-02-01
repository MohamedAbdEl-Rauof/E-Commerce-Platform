import {CiCreditCard2, CiDeliveryTruck, CiLock, CiPhone} from "react-icons/ci";
import React from "react";
import {motion} from "framer-motion";
import ValuesSectionLoading from "@/components/userUiLoading/Home/ValuesSectionLoading";
import {useTheme} from "next-themes"
import {useSlider} from "@/context/SliderContext";
import {useCategories} from "@/context/CategoriesContext";

const ValuesSection = () => {
    const {theme} = useTheme()
    const {loading: sliderLoading} = useSlider();
    const {loading: categoriesLoading} = useCategories();

    return (
        <div className="mb-6">
            {(sliderLoading && categoriesLoading) ? (
                <ValuesSectionLoading/>
            ) : (
                <div className="flex flex-wrap gap-8 justify-center">
                    <motion.div
                        className={`flex flex-col items-center justify-center w-44 h-44 rounded-full p-4 text-center ${
                            theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
                        }`}
                        whileHover={{scale: 1.1}}
                    >
                        <CiDeliveryTruck className="text-5xl mb-2"/>
                        <h1 className="mt-2 font-bold text-base">Free Shipping</h1>
                        <p className="text-sm">Order above $200</p>
                    </motion.div>

                    <motion.div
                        className={`flex flex-col items-center justify-center w-44 h-44 rounded-full p-4 text-center ${
                            theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
                        }`}
                        whileHover={{scale: 1.1}}
                    >
                        <CiCreditCard2 className="text-5xl mb-2"/>
                        <h1 className="mt-2 font-bold text-base">Money-back</h1>
                        <p className="text-sm">30 days guarantee</p>
                    </motion.div>

                    <motion.div
                        className={`flex flex-col items-center justify-center w-44 h-44 rounded-full p-4 text-center ${
                            theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
                        }`}
                        whileHover={{scale: 1.1}}
                    >
                        <CiLock className="text-5xl mb-2"/>
                        <h1 className="mt-2 font-bold text-base">Secure Payments</h1>
                        <p className="text-sm">Secured by Stripe</p>
                    </motion.div>

                    <motion.div
                        className={`flex flex-col items-center justify-center w-44 h-44 rounded-full p-4 text-center ${
                            theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
                        }`}
                        whileHover={{scale: 1.1}}
                    >
                        <CiPhone className="text-5xl mb-2"/>
                        <h1 className="mt-2 font-bold text-base">24/7 Support</h1>
                        <p className="text-sm">Phone and Email support</p>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ValuesSection;
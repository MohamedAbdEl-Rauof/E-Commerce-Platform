import React from "react";
import {useSlider} from "@/context/SliderContext";
import {useCategories} from "@/context/CategoriesContext";
import TextSectionLoading from "@/components/userUiLoading/Home/TextSectionLoading";


const TextSection = () => {
    const {loading: sliderLoading} = useSlider();
    const {loading: categoriesLoading} = useCategories();

    return (
        <div className="flex md:flex-row justify-between">
            {(sliderLoading && categoriesLoading) ? (
                <TextSectionLoading/>
            ) : (
                <div className="md:w-1/2">
                    <h1 className="font-bold text-3xl">Simply Unique / Simply Better</h1>
                    <p className="pt-5">
                        <strong>3legant</strong> is a gift & decorations store based in HCMC,
                        Vietnam. Established since 2019.
                    </p>
                </div>
            )}
        </div>
    );
};

export default TextSection;
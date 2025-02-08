import {FaArrowRight} from "react-icons/fa";

const AboutSection = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between mt-12 md:mt-20 h-auto md:h-96 space-y-6 md:space-y-0">
            <div className="flex-1 bg-slate-200 flex justify-center items-center">
                <img
                    src="/images/Bannar/Paste image.jpg"
                    alt="Sign Up"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 p-4 md:p-6 flex flex-col justify-center bg-gray-100">
                <div className="pl-10 text-center md:text-left mx-auto md:mx-0 w-full sm:w-10/12 lg:w-8/12">
                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
                        About Us
                    </h1>
                    <p className="mt-4 text-gray-700 text-sm md:text-base">
                        3legant is a gift & decorations store based in HCMC, Vietnam.
                        Est since 2019.
                    </p>
                    <p className="mt-1 md:mt-3">
                        Our customer service is always prepared to support you 24/7.
                    </p>
                    <u className="mt-6 flex justify-center md:justify-start items-center text-black font-bold cursor-pointer hover:underline">
                        Shop More
                        <FaArrowRight className="ml-1 transform transition-transform duration-300 hover:translate-x-1"/>
                    </u>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
import React from "react";

const BannerSectionLoading = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between mt-20 h-auto md:h-96">
            <div className="bg-slate-200 flex-1 flex justify-center items-center">
                <div className="w-full h-full bg-gray-300 animate-pulse"></div>
            </div>
            <div className="flex-1 p-6 md:p-4 flex flex-col justify-center bg-gray-100">
                <div className="pl-9 text-center md:text-left mx-auto md:mx-0 md:w-10/12 lg:w-8/12">
                    <div className="h-8 bg-gray-300 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default BannerSectionLoading;
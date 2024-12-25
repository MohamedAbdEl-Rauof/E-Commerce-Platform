import React from "react";

const NewsletterLoading = () => {
    return (
        <div className="mt-24 relative">
            <div className="w-full h-64 bg-gray-300 animate-pulse"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="h-8 bg-gray-300 mb-4 animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-300 animate-pulse w-1/2"></div>
            </div>
        </div>
    );
};

export default NewsletterLoading;
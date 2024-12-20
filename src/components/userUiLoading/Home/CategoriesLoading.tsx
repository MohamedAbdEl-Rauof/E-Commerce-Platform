import {motion} from "framer-motion";
import React from "react";

const CategoriesLoading = () => {
    const fadeInUp = {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: 20},
    };

    return (
        <>
            {Array.from({length: 4}).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{duration: 0.3}}
                    className="mt-14 relative h-[400px] rounded-xl overflow-hidden"
                >
                    <div className="h-20 bg-gray-300 mb-2"></div>
                    <div className="p-4">
                        <div className="h-4 bg-gray-300 mb-2"></div>
                        <div className="h-4 bg-gray-300 mb-2"></div>
                        <div className="h-4 bg-gray-300"></div>
                    </div>
                </motion.div>
            ))}
        </>
    );
};

export default CategoriesLoading;
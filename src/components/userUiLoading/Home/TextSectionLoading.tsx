import {motion} from "framer-motion";
import React from "react";

const TextSectionLoading = () => {
    const fadeInUp = {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{duration: 0.3}}
            className="md:w-1/2 bg-gray-200 rounded-lg p-4"
        >
            <div className="h-8 bg-gray-300 mb-4"></div>
            <div className="h-4 bg-gray-300 mb-2"></div>
            <div className="h-4 bg-gray-300 mb-2"></div>
            <div className="h-4 bg-gray-300"></div>
        </motion.div>
    );
};
export default TextSectionLoading;
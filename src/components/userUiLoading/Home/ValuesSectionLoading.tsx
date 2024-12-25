import React from "react";
import {motion} from "framer-motion";

const ValuesSectionLoading = () => {
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
            className="flex flex-wrap gap-8 justify-center"
        >
            <div className="w-44 h-44 bg-gray-200 rounded-full p-4"></div>
            <div className="w-44 h-44 bg-gray-200 rounded-full p-4"></div>
            <div className="w-44 h-44 bg-gray-200 rounded-full p-4"></div>
            <div className="w-44 h-44 bg-gray-200 rounded-full p-4"></div>
        </motion.div>
    );
};

export default ValuesSectionLoading;
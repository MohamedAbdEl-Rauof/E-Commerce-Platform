import {motion} from "framer-motion";
import React from "react";

const NewArrivalsProductLoading = () => {
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
            className="relative overflow-hidden h-[350px] sm:h-[450px] lg:h-[550px] bg-gray-200 rounded-lg"
            style={{width: "90%"}}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    animate={{rotate: 360}}
                    transition={{repeat: Infinity, duration: 1}}
                    className="w-16 h-16 border-4 border-t-transparent rounded-full"
                />
            </div>
        </motion.div>
    );
};

export default NewArrivalsProductLoading;
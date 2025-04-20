import { motion } from "framer-motion";
import React from "react";
import { Box } from "@mui/material";

const NewArrivalsProductLoading = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                width: "90%",
                height: {
                    xs: "350px",
                    sm: "450px",
                    lg: "550px"
                },
                borderRadius: "8px",
                backgroundColor: "var(--hover)",
                boxShadow: "0 4px 12px var(--shadow)"
            }}
            component={motion.div}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ duration: 0.3 }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        border: "4px solid var(--border)",
                        borderTopColor: "var(--primary)",
                        boxSizing: "border-box"
                    }}
                />
            </Box>
        </Box>
    );
};

export default NewArrivalsProductLoading;
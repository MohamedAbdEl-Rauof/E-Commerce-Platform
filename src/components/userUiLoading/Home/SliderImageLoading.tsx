import { motion } from "framer-motion";
import React from "react";
import { Box, Skeleton } from "@mui/material";

/**
 * Matches the real slider's responsive height (40vh→70vh) so swapping the
 * skeleton for the loaded slider doesn't shift the page.
 */
const SliderImageLoading = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <Box
            sx={{
                width: "100%",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box
                component={motion.div}
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ duration: 0.3 }}
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    width: "100%",
                    height: { xs: "40vh", sm: "50vh", md: "60vh", lg: "70vh" },
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px var(--shadow)",
                }}
            >
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ backgroundColor: "var(--border)" }}
                />
            </Box>
        </Box>
    );
};

export default SliderImageLoading;
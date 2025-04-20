import { motion } from "framer-motion";
import React from "react";
import { Box, Skeleton } from "@mui/material";

const CategoriesLoading = () => {
    return (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{
                        marginTop: "56px",
                        position: "relative",
                        height: "400px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        boxShadow: "0 4px 12px var(--shadow)"
                    }}
                >
                    <Box sx={{ 
                        height: "80px", 
                        mb: 1,
                        backgroundColor: "var(--hover)"
                    }}>
                        <Skeleton 
                            variant="rectangular" 
                            width="100%" 
                            height="100%" 
                            animation="pulse"
                            sx={{ backgroundColor: "var(--border)" }}
                        />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Skeleton 
                            variant="text" 
                            height={16} 
                            width="100%" 
                            animation="pulse"
                            sx={{ mb: 1, backgroundColor: "var(--border)" }}
                        />
                        <Skeleton 
                            variant="text" 
                            height={16} 
                            width="100%" 
                            animation="pulse"
                            sx={{ mb: 1, backgroundColor: "var(--border)" }}
                        />
                        <Skeleton 
                            variant="text" 
                            height={16} 
                            width="80%" 
                            animation="pulse"
                            sx={{ backgroundColor: "var(--border)" }}
                        />
                    </Box>
                </motion.div>
            ))}
        </>
    );
};

export default CategoriesLoading;
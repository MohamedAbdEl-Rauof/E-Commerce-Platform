import { motion } from "framer-motion";
import React from "react";
import { Box, Card, Grid, Skeleton } from "@mui/material";

/**
 * Rendered inside Categories' <Grid container>, so each placeholder is wrapped
 * in a <Grid item> to align with the real columns, and shaped like the real
 * category card: a 240px image with a title + "Shop Now" button near the bottom.
 */
const CategoriesLoading = () => {
    return (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={12} md={3} key={index}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card
                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "4px",
                                boxShadow: "0 4px 12px var(--shadow)",
                            }}
                        >
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={240}
                                sx={{ backgroundColor: "var(--border)" }}
                            />
                            <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
                                <Skeleton variant="text" width={120} height={28} sx={{ backgroundColor: "var(--surface)" }} />
                                <Skeleton variant="text" width={80} height={24} sx={{ backgroundColor: "var(--surface)" }} />
                            </Box>
                        </Card>
                    </motion.div>
                </Grid>
            ))}
        </>
    );
};

export default CategoriesLoading;

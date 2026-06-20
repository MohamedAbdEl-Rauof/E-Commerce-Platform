import React from "react";
import { Box, Skeleton } from "@mui/material";
import ProductCardSkeleton from "@/components/common/ui/ProductCardSkeleton";

/**
 * Mirrors the real NewArrivalsProduct layout: a header row plus a horizontal
 * scrolling row of square product cards.
 */
const NewArrivalsProductLoading = () => {
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Skeleton variant="text" width={220} height={48} sx={{ backgroundColor: "var(--border)" }} />
                <Skeleton variant="text" width={120} height={28} sx={{ backgroundColor: "var(--border)" }} />
            </Box>
            <Box sx={{ mt: 3.5, display: "flex", gap: 3, overflow: "hidden" }}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Box key={index} sx={{ flexShrink: 0, width: 256 }}>
                        <ProductCardSkeleton />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default NewArrivalsProductLoading;

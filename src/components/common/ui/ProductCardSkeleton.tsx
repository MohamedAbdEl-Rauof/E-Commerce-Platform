import React from "react";
import { Box, Card, CardContent, Skeleton } from "@mui/material";

/**
 * Loading placeholder that mirrors the real product card
 * (src/app/user/shop/components/ProductCard.tsx): a 1:1 image area followed by
 * a rating row, a title line, and a price line. Keeping the same footprint as
 * the loaded card avoids the layout "jump" when data arrives.
 */
const ProductCardSkeleton: React.FC = () => {
    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "var(--background)",
                boxShadow: "0 4px 6px var(--shadow)",
            }}
        >
            {/* 1:1 image — same aspect ratio as AppImage in the real card */}
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ backgroundColor: "var(--border)" }}
                />
            </Box>
            <CardContent sx={{ p: 2 }}>
                <Skeleton variant="rounded" width={110} height={18} sx={{ backgroundColor: "var(--border)", mb: 1.5 }} />
                <Skeleton variant="text" width="80%" height={26} sx={{ backgroundColor: "var(--border)" }} />
                <Skeleton variant="text" width="40%" height={26} sx={{ backgroundColor: "var(--border)", mt: 1 }} />
            </CardContent>
        </Card>
    );
};

export default ProductCardSkeleton;

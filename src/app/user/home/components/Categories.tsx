import React from "react";
import { motion } from "framer-motion";
import { useCategories } from "@/context/CategoriesContext";
import Image from "next/image";
import Link from "next/link";
import CategoriesLoading from "@/components/userUiLoading/Home/CategoriesLoading";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
    overflow: "hidden",
    transition: "all 0.3s",
    "&:hover": {
        boxShadow: 10,
        "& .MuiCardMedia-root": {
            transform: "scale(1.1)",
        },
        "& .overlay": {
            opacity: 1,
        },
    },
}));

const StyledCardMedia = styled(CardMedia)({
    height: 240,
    transition: "transform 0.3s",
});

const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    opacity: 0,
    transition: "opacity 0.3s",
});

const Categories = () => {
    const { categories, loading, error } = useCategories();

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <Box sx={{ }}>
            <Grid container spacing={2}>
                {loading ? (
                    <CategoriesLoading />
                ) : (
                    categories.map((category, index) => (
                        <Grid item xs={12} md={categories.length <= 3 ? 4 : 3} key={category._id || index}>
                            <motion.div
                                initial="initial"
                                animate="animate"
                                variants={fadeInUp}
                                transition={{ duration: 0.3 }}
                            >
                                <StyledCard>
                                    <Box sx={{ position: "relative" }}>
                                        <StyledCardMedia
                                            sx={{
                                                position: "relative",
                                                height: 240,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundImage: `url(${category.image})`,
                                            }}
                                        />
                                        <Overlay className="overlay" />
                                        <CardContent
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                color: "white",
                                            }}
                                        >
                                            <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                                                {category.name}
                                            </Typography>
                                            <Button
                                                component={Link}
                                                href="/user/shop"
                                                sx={{
                                                    color: "var(--foreground)",
                                                    fontWeight: "bold",
                                                    "&:hover": {
                                                        textDecoration: "underline",
                                                    },
                                                }}
                                            >
                                                Shop Now
                                            </Button>
                                        </CardContent>
                                    </Box>
                                </StyledCard>
                            </motion.div>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default Categories;
import React from "react";
import { useSlider } from "@/context/SliderContext";
import { useCategories } from "@/context/CategoriesContext";
import TextSectionLoading from "@/components/userUiLoading/Home/TextSectionLoading";
import { Box, Typography, useTheme } from "@mui/material";

const TextSection = () => {
    const { loading: sliderLoading } = useSlider();
    const { loading: categoriesLoading } = useCategories();
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            color: 'var(--text)',
        }}>
            {(sliderLoading && categoriesLoading) ? (
                <TextSectionLoading />
            ) : (
                <Box sx={{ width: { md: '50%' } }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            color: 'var(--text)',
                            mb: 2,
                        }}
                    >
                        Simply Unique / Simply Better
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'var(--text)',
                            '& strong': {
                                color: 'var(--focus)',
                            }
                        }}
                    >
                        <strong>3legant</strong> is a gift & decorations store based in HCMC,
                        Vietnam. Established since 2019.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default TextSection;
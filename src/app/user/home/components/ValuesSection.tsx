import React from "react";
import { CiCreditCard2, CiDeliveryTruck, CiLock, CiPhone } from "react-icons/ci";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import ValuesSectionLoading from "@/components/userUiLoading/Home/ValuesSectionLoading";
import { useTheme } from "next-themes";
import { useSlider } from "@/context/SliderContext";
import { useCategories } from "@/context/CategoriesContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '11rem',
    height: '11rem',
    borderRadius: '50%',
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: 'var(--value-section-bg)',
    color: 'var(--value-section-text)',
}));

const MotionBox = motion(Box);

const ValuesSection = () => {
    const { theme } = useTheme();
    const { loading: sliderLoading } = useSlider();
    const { loading: categoriesLoading } = useCategories();

    const valueItems = [
        { Icon: CiDeliveryTruck, title: "Free Shipping", description: "Order above $200" },
        { Icon: CiCreditCard2, title: "Money-back", description: "30 days guarantee" },
        { Icon: CiLock, title: "Secure Payments", description: "Secured by Stripe" },
        { Icon: CiPhone, title: "24/7 Support", description: "Phone and Email support" },
    ];

    return (
        <Box>
            {(sliderLoading && categoriesLoading) ? (
                <ValuesSectionLoading />
            ) : (
                <Grid container spacing={3} justifyContent="center">
                    {valueItems.map(({ Icon, title, description }, index) => (
                        <Grid item key={index}>
                            <MotionBox whileHover={{ scale: 1.1 }} >
                                <StyledPaper elevation={3} sx={{backgroundColor:"var(--muted)"}}>
                                    <Icon style={{ fontSize: '3rem', marginBottom: '0.5rem' }} />
                                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                                        {title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {description}
                                    </Typography>
                                </StyledPaper>
                            </MotionBox>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ValuesSection;
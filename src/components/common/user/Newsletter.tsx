import React from "react";
import Link from "next/link";
import NewsletterLoading from "../../userUiLoading/commonUiLoading/NewsletterLoading";
import { useCategories } from "@/context/CategoriesContext";
import { useSlider } from "@/context/SliderContext";
import Image from "next/image";
import { Box, Typography, Button, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    backgroundColor: 'var(--light)',
    color: 'var(--foreground)',
}));

const StyledOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledLink = styled(Link)(({ theme }) => ({
    fontWeight: 'bold',
    color: 'var(--focus)',
    textDecoration: 'underline',
}));

const Newsletter = () => {
    const { loading: sliderLoading } = useSlider();
    const { loading: categoriesLoading } = useCategories();

    return (
        <Box>
            {(sliderLoading && categoriesLoading) ? (
                <NewsletterLoading />
            ) : (
                <StyledBox>
                    <Image
                        width={500}
                        height={500}
                        src="/images/Paste image (1).jpg"
                        style={{ width: '100%', height: 'auto' }}
                        alt="Join Our Newsletter"
                    />
                    <StyledOverlay>
                        <Typography variant="h4" component="h1" fontWeight="bold" color="var(--foreground)">
                            Join Our Newsletter
                        </Typography>
                        <Typography variant="body1" mt={2} textAlign="center" color="var(--foreground)">
                            <StyledLink href="/signup" >
                                Sign up
                            </StyledLink>
                            {" "}
                            for deals, new products, and promotions
                        </Typography>
                    </StyledOverlay>
                </StyledBox>
            )}
        </Box>
    );
};

export default Newsletter;
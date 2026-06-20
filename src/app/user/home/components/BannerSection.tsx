import React from "react";
import Link from "next/link";
import Image from "next/image";
import {FaArrowRight} from "react-icons/fa";
import {Box, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import BannerSectionLoading from "@/components/userUiLoading/Home/BannerSectionLoading";
import {useSlider} from "@/context/SliderContext";
import {useCategories} from "@/context/CategoriesContext";

const StyledBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: theme.spacing(2.5),
    height: "auto",
    minHeight: 120,
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        height: 650,
    },
}));

const ImageContainer = styled(Box)(({theme}) => ({
    flex: 1,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 320,
    backgroundColor: "var(--surface)",
    [theme.breakpoints.up("md")]: {
        height: "auto",
    },
}));

const ContentContainer = styled(Box)(({theme}) => ({
    flex: 1,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "var(--background)",
    [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2),
    },
}));

const StyledTypography = styled(Typography)({
    color: "var(--primary)",
});

const StyledLink = styled(Link)({
    color: "var(--foreground)",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
    display: "flex",
    alignItems: "center",
    "&:hover": {
        color: "var(--primary)",
    },
});

const BannerSection = () => {
    const {loading: sliderLoading} = useSlider();
    const {loading: categoriesLoading} = useCategories();

    if (sliderLoading && categoriesLoading) {
        return <BannerSectionLoading/>;
    }

    return (
        <StyledBox>
            <ImageContainer>
                <Image
                    src="/images/Paste image.jpg"
                    alt="Promotional banner"
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{objectFit: 'cover'}}
                />
            </ImageContainer>

            <ContentContainer>
                <Box sx={{
                    pl: 2,
                    textAlign: {xs: 'center', md: 'left'},
                    mx: {xs: 'auto', md: 0},
                    width: {md: '83.33%', lg: '66.67%'}
                }}>
                    <StyledTypography variant="h5" fontWeight="bold" mt={3}>
                        SALE UP TO 35% OFF
                    </StyledTypography>
                    <Typography variant="h3" fontWeight="bold" mt={2}>
                        HUNDREDS of
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                        New lower prices!
                    </Typography>
                    <Typography variant="body1" mt={3} color="var(--foreground)">
                        It's more affordable than ever to give every room in your home a stylish makeover
                    </Typography>
                    <Box mt={3}>
                        <StyledLink href="/user/categories">
                            Show More
                            <FaArrowRight style={{marginLeft: 8, transition: 'transform 0.3s'}}/>
                        </StyledLink>
                    </Box>
                </Box>
            </ContentContainer>
        </StyledBox>
    );
};

export default BannerSection;
import React, {useEffect, useState} from "react";
import {useSlider} from "@/context/SliderContext";
import Image from "next/image";
import SliderImageLoading from "@/components/userUiLoading/Home/SliderImageLoading";
import {Box, IconButton, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SliderContainer = styled(Box)(({theme}) => ({
    position: 'relative',
    overflow: 'hidden',
    height: 350,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        height: 450,
    },
    [theme.breakpoints.up('lg')]: {
        height: 550,
    },
}));

const StyledImage = styled(Image)({
    borderRadius: '8px',
});

const NavigationButton = styled(IconButton)(({theme}) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'var(--background)',
    color: 'var(--text)',
    '&:hover': {
        backgroundColor: 'var(--background-light)',
    },
}));

const SliderImage = React.memo(() => {
    const {images, loading, error} = useSlider();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 8000);
            return () => clearInterval(intervalId);
        }
    }, [images]);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
            aignItems: "center",
        }}>
            {loading ? (
                <SliderImageLoading/>
            ) : (
                <SliderContainer>
                    {images.length > 0 && (
                        <StyledImage
                            src={images[currentIndex].url}
                            alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
                            layout="fill"
                            objectFit="cover"
                            priority
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={100}
                        />
                    )}

                    <NavigationButton
                        onClick={prevImage}
                        sx={{left: 16}}
                        aria-label="Previous Image"
                    >
                        <ArrowBackIosNewIcon/>
                    </NavigationButton>

                    <NavigationButton
                        onClick={nextImage}
                        sx={{right: 16}}
                        aria-label="Next Image"
                    >
                        <ArrowForwardIosIcon/>
                    </NavigationButton>
                </SliderContainer>
            )}
        </Box>
    );
});

SliderImage.displayName = "SliderImage";

export default SliderImage;
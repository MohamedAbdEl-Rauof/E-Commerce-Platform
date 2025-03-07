import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {FaArrowRight} from 'react-icons/fa';
import {useTheme} from 'next-themes';

const AboutSection = () => {
    const {theme} = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <Box
            display="flex"
            flexDirection={{xs: 'column', md: 'row'}}
            justifyContent="space-between"
            mt={{xs: 6, md: 10}}
            height={{md: '24rem'}}
        >
            <Box
                flex={1}
                bgcolor={isDarkTheme ? 'var(--background)' : 'grey.200'}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    component="img"
                    src="/images/Paste image.jpg"
                    alt="Sign Up"
                    sx={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
            </Box>

            <Box
                flex={1}
                p={{xs: 2, md: 3}}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                bgcolor={isDarkTheme ? 'var(--background)' : 'grey.100'}
            >
                <Box
                    pl={5}
                    textAlign={{xs: 'center', md: 'left'}}
                    mx={{xs: 'auto', md: 0}}
                    width={{xs: '100%', sm: '83.33%', lg: '66.67%'}}
                >
                    <Typography variant="h4" component="h2" fontWeight="bold" color="var(--foreground)">
                        About Us
                    </Typography>
                    <Typography variant="body1" mt={2} color="var(--foreground)" sx={{opacity: 0.7}}>
                        3legant is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
                    </Typography>
                    <Typography variant="body1" mt={1} color="var(--foreground)">
                        Our customer service is always prepared to support you 24/7.
                    </Typography>
                    <Button
                        endIcon={<FaArrowRight/>}
                        sx={{
                            mt: 3,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            color: 'var(--primary)',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                '& .MuiSvgIcon-root': {
                                    transform: 'translateX(4px)',
                                },
                            },
                        }}
                    >
                        Shop More
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AboutSection;
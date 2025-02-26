"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Box, Container, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextSection from "./components/TextSection";
import Categories from "./components/Categories";
import ValuesSection from "@/app/user/home/components/ValuesSection";
import BannerSection from "@/app/user/home/components/BannerSection";

const SliderImage = dynamic(() => import("./components/SliderImage"), { ssr: false });
const NewArrivalsProduct = dynamic(() => import("./components/NewArrivalsProduct"), { ssr: false });
const Newsletter = dynamic(() => import("@/components/common/user/Newsletter"), { ssr: false });


const Home = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Box>
            <Container maxWidth={false} sx={{ maxWidth: '1800px' }}>
                <Stack spacing={8}>
                    {isClient && <SliderImage />}
                    <TextSection />
                    <Categories />
                    {isClient && <NewArrivalsProduct />}
                    <ValuesSection />
                </Stack>
            </Container>
            <Box sx={{ paddingTop:"5rem"}}>
                <BannerSection />
                {isClient && <Newsletter />}
            </Box>
        </Box>
    );
};

export default Home;
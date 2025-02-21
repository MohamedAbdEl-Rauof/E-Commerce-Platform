import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
        <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            quality={100}
        />
    </Box>
);

export default ProductImage;
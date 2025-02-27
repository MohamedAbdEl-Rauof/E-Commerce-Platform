import React from 'react';
import Link from 'next/link';
import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

const StyledTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
    cursor: 'pointer',
    color: 'var(--foreground)',
    fontFamily: 'cursive, Arial, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const Logo = () => (
    <Link href="/user" passHref>
        <StyledTypography variant="h1" component="h1">
            3𝓵𝓮𝓰𝓪𝓷𝓽
        </StyledTypography>
    </Link>
);

export default Logo;
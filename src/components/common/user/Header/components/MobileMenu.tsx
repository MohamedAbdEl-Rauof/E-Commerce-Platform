import React from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';
import Link from 'next/link';
import { Box, IconButton, Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';
import DarkModeSwitch  from '@/components/common/user/DarkMoodSwitch';

interface MobileMenuProps {
    toggleSidebar: (open: boolean) => () => void;
    openCart: () => void;
}

const RightSideContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: 'var(--foreground)',
    '&:hover': {
        color: 'var(--primary)',
    },
}));

const StyledTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
    cursor: 'pointer',
    color: 'var(--foreground)',
    fontFamily: 'cursive, Arial, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block',
    },
}));

const MobileMenu: React.FC<MobileMenuProps> = ({ toggleSidebar, openCart }) => (
    <StyledBox>
        <Box display="flex" alignItems="center" gap={2}>
            <StyledIconButton onClick={toggleSidebar(true)}>
                <CiMenuBurger />
            </StyledIconButton>
            <Link href="/user" passHref>
                <StyledTypography component="h1" variant="h5">
                    3𝓵𝓮𝓰𝓪𝓷𝓽
                </StyledTypography>
            </Link>
        </Box>
        <RightSideContainer>
            <DarkModeSwitch />
            <StyledIconButton onClick={openCart}>
                <IoCartOutline />
            </StyledIconButton>
        </RightSideContainer>
    </StyledBox>
);

export default MobileMenu;
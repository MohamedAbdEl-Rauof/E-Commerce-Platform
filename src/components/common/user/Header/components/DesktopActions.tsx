"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiSearch } from 'react-icons/ci';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoCartOutline } from 'react-icons/io5';
import { Badge, Button, Drawer, Menu, MenuItem, TextField, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { signOut } from 'next-auth/react';
import Swal from 'sweetalert2';
import CartDrawer from './cart/page';
import DarkMoodSwitch from "@/components/common/user/DarkMoodSwitch";
import { Session } from 'next-auth';
import { CartItem } from '@/context/AddToCartContext';

interface DesktopActionsProps {
    session: Session | null;
    cart: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: 'var(--foreground)',
    '&:hover': {
        color: 'var(--primary)',
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: 'var(--primary)',
        color: 'var(--light)',
    },
}));

const DesktopActions: React.FC<DesktopActionsProps> = ({session, cart, isOpen, openCart, closeCart}) => {
    const router = useRouter();
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (session) {
            setAnchorEl(event.currentTarget);
        } else {
            router.push('/signin');
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMyAccount = () => {
        router.push('/user/useraccount');
        handleClose();
    };

    const handleLogout = async () => {
        await signOut({redirect: false});
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged Out Done',
            showConfirmButton: false,
            timer: 1500,
        });
        router.push('/user');
        handleClose();

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const toggleInputVisibility = () => {
        setIsInputVisible(!isInputVisible);
    };

    return (
        <StyledBox>
            <Box position="relative" display="flex" alignItems="center">
                <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    size="small"
                    sx={{
                        width: isInputVisible ? 160 : 0,
                        opacity: isInputVisible ? 1 : 0,
                        transition: 'all 0.3s',
                        position: 'absolute',
                        right: 40,
                        pointerEvents: isInputVisible ? 'auto' : 'none',
                    }}
                />
                <StyledIconButton onClick={toggleInputVisibility}>
                    <CiSearch />
                </StyledIconButton>
            </Box>

            <DarkMoodSwitch />

            <StyledIconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <FaRegCircleUser />
            </StyledIconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {session && (
                    <>
                        <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </>
                )}
            </Menu>

            <StyledIconButton onClick={openCart}>
                <StyledBadge badgeContent={totalItems}>
                    <IoCartOutline />
                </StyledBadge>
            </StyledIconButton>
            <Drawer anchor="right" open={isOpen} onClose={closeCart}>
                <CartDrawer />
            </Drawer>
        </StyledBox>
    );
};

export default DesktopActions;
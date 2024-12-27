"use client";

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {CiSearch} from 'react-icons/ci';
import {FaRegCircleUser} from 'react-icons/fa6';
import {IoCartOutline} from 'react-icons/io5';
import {Badge, Button, Drawer, Menu, MenuItem, TextField,} from '@mui/material';
import {signOut} from 'next-auth/react';
import Swal from 'sweetalert2';
import CartDrawer from './cart/page';

interface DesktopActionsProps {
    session: any;
    cart: any[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

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
            router.push('/Signin');
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMyAccount = () => {
        router.push('/pages/UserAccount');
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
        router.push('/pages/Home');
        handleClose();

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const toggleInputVisibility = () => {
        setIsInputVisible(!isInputVisible);
    };

    return (
        <div className="hidden md:flex items-center space-x-7 mt-4">
            <div className="relative flex items-center">
                <div
                    className={`absolute top-0 right-10 transition-all duration-300 ${
                        isInputVisible ? 'w-40 opacity-100' : 'w-0 opacity-0'
                    }`}
                    style={{pointerEvents: isInputVisible ? 'auto' : 'none'}}
                >
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        size="small"
                        className="h-8"
                    />
                </div>
                <CiSearch
                    className="cursor-pointer text-2xl hover:text-gray-800 transition-colors duration-200"
                    onClick={toggleInputVisibility}
                />
            </div>

            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <FaRegCircleUser
                        className="text-gray-800 cursor-pointer text-2xl hover:text-gray-800 transition-colors duration-200"
                    />
                </Button>
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
            </div>

            <div>
                <Button onClick={openCart} className="text-black">
                    <Badge badgeContent={totalItems} color="primary">
                        <IoCartOutline
                            className="cursor-pointer text-2xl hover:text-gray-800 transition-colors duration-200"
                        />
                    </Badge>
                </Button>
                <Drawer anchor="right" open={isOpen} onClose={closeCart}>
                    <CartDrawer/>
                </Drawer>
            </div>
        </div>
    );
};

export default DesktopActions;
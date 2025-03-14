"use client";

import React, {useEffect, useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import PeopleIcon from '@mui/icons-material/People';
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import AdminDropdown from "@/components/common/admin/AdminDropdown";
import {useSession} from "next-auth/react";

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const menuItems = [
    {text: 'Dashboard', icon: <DashboardIcon/>, path: '/admin/home'},
    {text: 'Categories', icon: <CategoryIcon/>, path: '/admin/categories'},
    {text: 'Orders', icon: <ShoppingCartIcon/>, path: '/admin/orders'},
    {text: 'Products', icon: <InventoryIcon/>, path: '/admin/products'},
    {text: 'Slider Section', icon: <ViewCarouselIcon/>, path: '/admin/slider-section'},
    {text: 'Users', icon: <PeopleIcon/>, path: '/admin/users'},
];

export default function AdminDashboardLayout({children}: { children: React.ReactNode }) {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const {data: session} = useSession();

    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const settings = {
        skin: 'default' as 'default' | 'bordered'
    };

    useEffect(() => {
        const drawerState = localStorage.getItem('drawerOpen');
        setOpen(drawerState === null ? true : JSON.parse(drawerState));
    }, []);

    useEffect(() => {
        if (!session) {
            router.push('/signin');
        }
    }, [session, router]);

    if (!session) {
        return null;
    }

    const handleDrawerOpen = () => {
        setOpen(true);
        localStorage.setItem('drawerOpen', JSON.stringify(true));
    };

    const handleDrawerClose = () => {
        setOpen(false);
        localStorage.setItem('drawerOpen', JSON.stringify(false));
    };

    const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setDropdownOpen(true);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
        setDropdownOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{mr: 2, ...(open && {display: 'none'})}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Admin Dashboard
                        </Typography>
                    </Box>
                    <Box sx={{position: 'relative'}}>
                        <IconButton
                            color="inherit"
                            onClick={handleDropdownOpen}
                            size="small"
                            sx={{ml: 2}}
                        >
                            <Typography variant="body2">Admin</Typography>
                        </IconButton>
                        <AdminDropdown
                            anchorEl={anchorEl}
                            open={dropdownOpen}
                            handleDropdownClose={handleDropdownClose}
                            settings={settings}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <Link href={item.path} passHref
                                  style={{textDecoration: 'none', color: 'inherit', width: '100%'}}>
                                <ListItemButton selected={pathname === item.path}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                {children}
            </Main>
        </Box>
    );
}
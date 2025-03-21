"use client";
import React, {useEffect, useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import AdminDropdown from '@/components/common/admin/AdminDropdown';
import CircularProgress from "@mui/material/CircularProgress";
import {Avatar} from "@mui/material";
import DarkMoodSwitch from "@/components/common/user/DarkMoodSwitch";

const drawerWidth = 260;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
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
    backgroundColor: 'var(--background)',
    minHeight: '100vh',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    margin: '8px',
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
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    margin: '8px',
    ...(open && {
        width: `calc(100% - ${drawerWidth}px - 16px)`,
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
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    backgroundColor: 'var(--primary)',
    color: 'var(--light)',
    borderTopRightRadius: '8px',
}));

const StyledListItemButton = styled(ListItemButton)(({}) => ({
    borderRadius: '8px',
    margin: '4px 8px',
    '&.Mui-selected': {
        backgroundColor: 'var(--primary)',
        color: 'var(--light)',
        '& .MuiListItemIcon-root': {
            color: 'var(--light)',
        },
    },
    '&:hover': {
        backgroundColor: 'var(--hover)',
    },
    '& .MuiListItemIcon-root': {
        color: 'var(--foreground)',
    },
}));

const menuItems = [
    {text: 'Dashboard', icon: <DashboardIcon/>, path: '/admin/home'},
    {text: 'Categories', icon: <CategoryIcon/>, path: '/admin/categories'},
    {text: 'Products', icon: <InventoryIcon/>, path: '/admin/products'},
    {text: 'Orders', icon: <ShoppingCartIcon/>, path: '/admin/orders'},
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
        const timer = setTimeout(() => {
            if (!session) {
                router.push('/signin');
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [session, router]);

    if (!session) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Typography variant="h6">Loading Admin Dashboard...</Typography>
                <CircularProgress/>
            </Box>
        );
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
            <AppBar position="fixed" open={open}
                    sx={{backgroundColor: 'var(--background)', color: 'var(--foreground)'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton
                            sx={{
                                mr: 2,
                                ...(open && {display: 'none'}),
                                color: 'var(--foreground)'
                            }}
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" fontWeight="bold" color="var(--foreground)">
                            Admin Dashboard
                        </Typography>
                    </Box>
                    <Box sx={{position: 'relative'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Box>
                                <DarkMoodSwitch/>
                            </Box>
                            <Box>
                                <IconButton
                                    onClick={handleDropdownOpen}
                                    size="small"
                                    sx={{color: 'var(--foreground)'}}
                                >
                                    <Avatar src="/broken-image.jpg"/>
                                </IconButton>
                                <AdminDropdown
                                    anchorEl={anchorEl}
                                    open={dropdownOpen}
                                    handleDropdownClose={handleDropdownClose}
                                    settings={settings}
                                />
                            </Box>
                        </Box>
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
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: '1px solid var(--border)',
                        borderRadius: '0 8px 8px 0',
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        margin: '8px 0 8px 8px',
                        height: 'calc(100% - 16px)',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Typography variant="h6" fontWeight="bold">E-Commerce</Typography>
                    <IconButton onClick={handleDrawerClose} sx={{color: 'inherit'}}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <Box sx={{p: 2}}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{mb: 1}}>
                                <Link href={item.path} passHref
                                      style={{textDecoration: 'none', color: 'inherit', width: '100%'}}>
                                    <StyledListItemButton selected={pathname === item.path}>
                                        <ListItemIcon sx={{minWidth: '40px'}}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text}/>
                                    </StyledListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Main open={open}>
                <Box sx={{pt: 5}}>
                    {children}
                </Box>
            </Main>
        </Box>
    );
}
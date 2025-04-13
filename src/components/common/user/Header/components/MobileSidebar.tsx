import React from 'react';
import {
    Box,
    Button,
    Drawer,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
} from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import SearchIcon from '@mui/icons-material/Search';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { NavItem } from "./Navigation";
import Swal from "sweetalert2";

interface MobileSidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: (open: boolean) => () => void;
    NAV_ITEMS: readonly NavItem[];
    handleItemClick: (item: NavItem) => void;
    session: Session | null;
    router: ReturnType<typeof useRouter>;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
                                                         isSidebarOpen,
                                                         toggleSidebar,
                                                         NAV_ITEMS,
                                                         handleItemClick,
                                                         session,
                                                         router
                                                     }) => {
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

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Drawer
                anchor="left"
                open={isSidebarOpen}
                onClose={toggleSidebar(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                    }
                }}
            >
                <Box sx={{ width: 250, height: '100%', backgroundColor: 'var(--background)' }} role="presentation">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleSidebar(false)}>
                                <ListItemText primary="3𝓵𝓮𝓰𝓪𝓷𝓽" />
                                <IoMdClose style={{ fontSize: '1.25rem', marginLeft: '0.5rem', color: 'var(--muted)' }} />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <Paper
                        component="form"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: 230,
                            m: '0 10px',
                            backgroundColor: 'var(--search-bar-bg)',
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: 'var(--search-bar-text)' }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton type="button" sx={{ p: '1px', color: 'var(--search-bar-text)' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>

                    <List>
                        {NAV_ITEMS.map((item) => (
                            <ListItem key={item} disablePadding>
                                <ListItemButton
                                    onClick={() => handleItemClick(item)}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'var(--hover)',
                                        },
                                    }}
                                >
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ position: 'fixed', bottom: 20, width: 250 }}>
                        {session?.user?.id ? (
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
                                <Button
                                    sx={{
                                        width: '45%',
                                        height: '40px',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem',
                                        backgroundColor: 'var(--primary)',
                                        color: 'var(--text-on-image)',
                                        '&:hover': {
                                            backgroundColor: 'var(--hover)',
                                        },
                                    }}
                                    variant="contained"
                                    onClick={() => router.push('/user/useraccount')}
                                >
                                    My Account
                                </Button>
                                <Button
                                    sx={{
                                        width: '45%',
                                        height: '40px',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem',
                                        backgroundColor: 'var(--danger)',
                                        color: 'var(--text-on-image)',
                                        '&:hover': {
                                            backgroundColor: 'var(--danger)',
                                            opacity: 0.9,
                                        },
                                    }}
                                    variant="contained"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </Box>
                        ) : (
                            <Button
                                sx={{
                                    width: '90%',
                                    mx: '5%',
                                    height: '40px',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    backgroundColor: 'var(--primary)',
                                    color: 'var(--text-on-image)',
                                    '&:hover': {
                                        backgroundColor: 'var(--hover)',
                                    },
                                }}
                                variant="contained"
                                onClick={() => router.push('/signin')}
                            >
                                Sign in
                            </Button>
                        )}
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default MobileSidebar;
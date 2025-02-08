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
    Paper
} from '@mui/material';
import {IoMdClose} from 'react-icons/io';
import SearchIcon from '@mui/icons-material/Search';
import {Session} from 'next-auth';
import {useRouter} from 'next/navigation';
import {signOut} from 'next-auth/react';
import {NavItem} from "./Navigation";
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
        router.push('/pages/Home');

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="relative md:hidden">
            <Drawer
                anchor="left"
                open={isSidebarOpen}
                onClose={toggleSidebar(false)}
            >
                <Box sx={{width: 250}} role="presentation">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleSidebar(false)}>
                                <ListItemText primary="3𝓵𝓮𝓰𝓪𝓷𝓽"/>
                                <IoMdClose className="text-xl ml-2 text-gray-500"/>
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
                        }}
                    >
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Search"
                            inputProps={{'aria-label': 'search'}}
                        />
                        <IconButton type="button" sx={{p: '1px'}} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    </Paper>

                    <List>
                        {NAV_ITEMS.map((item) => (
                            <ListItem key={item} disablePadding>
                                <ListItemButton onClick={() => handleItemClick(item)}>
                                    <ListItemText primary={item}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{position: 'fixed', bottom: 20, width: 250}}>
                        {session?.user?.id ? (
                            <div className="flex items-center space-x-4 p-2">
                                <Button
                                    sx={{
                                        width: '150px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem',
                                    }}
                                    variant="contained"
                                    className="bg-black hover:bg-gray-800"
                                    onClick={() => router.push('/user/useraccount')}
                                >
                                    My Account
                                </Button>
                                <Button
                                    sx={{
                                        width: '150px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem',
                                    }}
                                    variant="contained"
                                    className="bg-red-500 hover:bg-red-700"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Button
                                sx={{width: '90%', mx: '5%'}}
                                variant="contained"
                                className="bg-black hover:bg-gray-800"
                                onClick={() => router.push('/Signin')}
                            >
                                Sign in
                            </Button>
                        )}
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
};

export default MobileSidebar;
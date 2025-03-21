import React, {MouseEvent, TouchEvent} from 'react';
import {useRouter} from 'next/navigation';
import {signOut, useSession} from 'next-auth/react';
import {
    Avatar,
    Box,
    Button,
    ClickAwayListener,
    Divider,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography
} from '@mui/material';

export interface AdminDropdownProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleDropdownClose: () => void;
    settings: {
        skin: 'default' | 'bordered';
    };
}

const AdminDropdown = ({anchorEl, open, handleDropdownClose, settings}: AdminDropdownProps) => {
    const router = useRouter();
    const {data: session} = useSession();

    const handleUserLogout = async () => {
        await signOut({redirect: false});
        handleDropdownClose();
        router.push('/signin');
    };

    const handleMenuItemClick = (e: MouseEvent | TouchEvent, path: string) => {
        handleDropdownClose();
        router.push(path);
    };

    if (!open) return null;

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
            style={{zIndex: 1300}}
        >
            <Paper
                className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}
                sx={{width: 200}}
            >
                <ClickAwayListener onClickAway={handleDropdownClose}>
                    <MenuList sx={{width: '100%'}}>
                        <div className='flex items-center plb-2 pli-6 gap-2' tabIndex={-1}>
                            <Box sx={{pl: 2}}>
                                <Avatar alt={session?.user?.name || ''} src={session?.user?.image || ''}/>
                            </Box>
                            <div className='flex items-start flex-col'>
                                <Typography className='font-medium' color='text.primary'>
                                    Admin
                                </Typography>
                                <Typography variant='caption'>{session?.user?.email || ''}</Typography>
                            </div>
                        </div>
                        <Divider className='m-3'/>
                        <MenuItem className='mli-2 gap-3' onClick={e => handleMenuItemClick(e, '/pages/user-profile')}>
                            <i className='tabler-user'/>
                            <Typography color='text.primary'>My Profile</Typography>
                        </MenuItem>
                        <MenuItem className='mli-2 gap-3'
                                  onClick={e => handleMenuItemClick(e, '/pages/account-settings')}>
                            <i className='tabler-settings'/>
                            <Typography color='text.primary'>Settings</Typography>
                        </MenuItem>
                        <MenuItem className='mli-2 gap-3' onClick={e => handleMenuItemClick(e, '/pages/pricing')}>
                            <i className='tabler-currency-dollar'/>
                            <Typography color='text.primary'>Pricing</Typography>
                        </MenuItem>
                        <MenuItem className='mli-2 gap-3' onClick={e => handleMenuItemClick(e, '/pages/faq')}>
                            <i className='tabler-help-circle'/>
                            <Typography color='text.primary'>FAQ</Typography>
                        </MenuItem>
                        <div className='flex items-center plb-2 pli-3'>
                            <Button
                                fullWidth
                                variant='contained'
                                color='error'
                                size='small'
                                endIcon={<i className='tabler-logout'/>}
                                onClick={handleUserLogout}
                                sx={{'& .MuiButton-endIcon': {marginInlineStart: 1.5}}}
                            >
                                Logout
                            </Button>
                        </div>
                    </MenuList>
                </ClickAwayListener>
            </Paper>
        </Popper>
    );
};

export default AdminDropdown;
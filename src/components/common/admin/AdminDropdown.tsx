import React, { MouseEvent, TouchEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
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

const AdminDropdown = ({ anchorEl, open, handleDropdownClose, settings }: AdminDropdownProps) => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleUserLogout = async () => {
        await signOut({ redirect: false });
        handleDropdownClose();
        router.push('/signin');
    };

    if (!open) return null;

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
            style={{ zIndex: 1300 }}
        >
            <Paper
                className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}
                sx={{ 
                    width: 200,
                    backgroundColor: 'var(--light)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 10px var(--shadow)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}
            >
                <ClickAwayListener onClickAway={handleDropdownClose}>
                    <MenuList sx={{ width: '100%', padding: '0.5rem 0' }}>
                        <div className='flex items-center plb-2 pli-6 gap-2' tabIndex={-1} style={{ padding: '0.75rem 1rem' }}>
                            <Box>
                                <Avatar 
                                    alt={session?.user?.name || ''} 
                                    src={session?.user?.image || ''} 
                                    sx={{ 
                                        border: '2px solid var(--primary)',
                                        boxShadow: '0 2px 5px var(--shadow)'
                                    }}
                                />
                            </Box>
                            <div className='flex items-start flex-col'>
                                <Typography 
                                    className='font-medium' 
                                    sx={{ 
                                        color: 'var(--foreground)',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Admin
                                </Typography>
                                <Typography 
                                    variant='caption'
                                    sx={{ color: 'var(--muted)' }}
                                >
                                    {session?.user?.email || ''}
                                </Typography>
                            </div>
                        </div>
                        <Divider sx={{ margin: '0.5rem 0', backgroundColor: 'var(--border)' }} />
                        <MenuItem 
                            className='mli-2 gap-3'
                            sx={{ 
                                padding: '0.5rem 1rem',
                                '&:hover': { backgroundColor: 'var(--hover)' }
                            }}
                        >
                            <i className='tabler-user' style={{ color: 'var(--primary)' }} />
                            <Typography sx={{ color: 'var(--foreground)' }}>My Profile</Typography>
                        </MenuItem>
                        <MenuItem 
                            className='mli-2 gap-3'
                            sx={{ 
                                padding: '0.5rem 1rem',
                                '&:hover': { backgroundColor: 'var(--hover)' }
                            }}
                        >
                            <i className='tabler-settings' style={{ color: 'var(--info)' }} />
                            <Typography sx={{ color: 'var(--foreground)' }}>Settings</Typography>
                        </MenuItem>
                        <MenuItem 
                            className='mli-2 gap-3'
                            sx={{ 
                                padding: '0.5rem 1rem',
                                '&:hover': { backgroundColor: 'var(--hover)' }
                            }}
                        >
                            <i className='tabler-currency-dollar' style={{ color: 'var(--success)' }} />
                            <Typography sx={{ color: 'var(--foreground)' }}>Pricing</Typography>
                        </MenuItem>
                        <MenuItem 
                            className='mli-2 gap-3'
                            sx={{ 
                                padding: '0.5rem 1rem',
                                '&:hover': { backgroundColor: 'var(--hover)' }
                            }}
                        >
                            <i className='tabler-help-circle' style={{ color: 'var(--warning)' }} />
                            <Typography sx={{ color: 'var(--foreground)' }}>FAQ</Typography>
                        </MenuItem>
                        <div className='flex items-center plb-2 pli-3' style={{ padding: '0.75rem 1rem' }}>
                            <Button
                                fullWidth
                                variant='contained'
                                size='small'
                                endIcon={<i className='tabler-logout' />}
                                onClick={handleUserLogout}
                                sx={{ 
                                    backgroundColor: 'var(--danger)',
                                    color: 'white',
                                    '&:hover': { 
                                        backgroundColor: 'var(--danger)',
                                        opacity: 0.9
                                    },
                                    '& .MuiButton-endIcon': { 
                                        marginInlineStart: 1.5 
                                    }
                                }}
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
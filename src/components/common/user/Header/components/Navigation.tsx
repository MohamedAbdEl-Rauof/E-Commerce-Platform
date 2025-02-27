import React from 'react';
import { useTheme } from 'next-themes';
import { Box, Button, styled } from '@mui/material';

type NavItem = 'Home' | 'Shop' | 'Categories' | 'Contact Us';

export type { NavItem };

interface NavigationProps {
    NAV_ITEMS: readonly NavItem[];
    activeItem: NavItem;
    handleItemClick: (item: NavItem) => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 'normal',
    fontSize: '1rem',
    padding: '6px 12px',
    marginRight: '2rem',
    color: 'var(--foreground)',
    '&:hover': {
        backgroundColor: 'var(--hover)',
        color: 'var(--primary)',
    },
    '&.active': {
        fontWeight: 'bold',
        color: 'var(--primary)',
    },
}));

const Navigation: React.FC<NavigationProps> = ({ NAV_ITEMS, activeItem, handleItemClick }) => {
    const { theme } = useTheme();

    return (
        <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {NAV_ITEMS.map((item) => (
                <StyledButton
                    key={item}
                    onClick={() => handleItemClick(item)}
                    className={activeItem === item ? 'active' : ''}
                >
                    {item}
                </StyledButton>
            ))}
        </Box>
    );
};

export default Navigation;
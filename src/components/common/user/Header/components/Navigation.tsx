import React from 'react';
import { useTheme } from 'next-themes';

type NavItem = 'Home' | 'Shop' | 'Categories' | 'Contact Us';

export type { NavItem };

interface NavigationProps {
    NAV_ITEMS: readonly NavItem[];
    activeItem: NavItem;
    handleItemClick: (item: NavItem) => void;
}

const Navigation: React.FC<NavigationProps> = ({ NAV_ITEMS, activeItem, handleItemClick }) => {
    const { theme } = useTheme();

    return (
        <nav className="hidden md:flex">
            <ul className="flex space-x-9">
                {NAV_ITEMS.map((item) => (
                    <li
                        key={item}
                        onClick={() => handleItemClick(item)}
                        className={`cursor-pointer transition-colors duration-200 md:text-base ${
                            theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-black'
                        } ${activeItem === item ? (theme === 'dark' ? 'text-white font-medium' : 'text-black font-medium') : ''}`}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
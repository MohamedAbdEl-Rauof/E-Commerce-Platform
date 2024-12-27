import React from 'react';

type NavItem = 'Home' | 'Shop' | 'Categories' | 'Contact Us';

interface NavigationProps {
    NAV_ITEMS: readonly NavItem[];
    activeItem: NavItem;
    handleItemClick: (item: NavItem) => void;
}

const Navigation: React.FC<NavigationProps> = ({NAV_ITEMS, activeItem, handleItemClick}) => (
    <nav className="hidden md:flex">
        <ul className="flex space-x-9 text-gray-600">
            {NAV_ITEMS.map((item) => (
                <li
                    key={item}
                    onClick={() => handleItemClick(item)}
                    className={`cursor-pointer transition-colors duration-200 hover:text-black md:text-base
                    ${activeItem === item ? 'text-black font-medium' : ''}`}
                >
                    {item}
                </li>
            ))}
        </ul>
    </nav>
);

export default Navigation;
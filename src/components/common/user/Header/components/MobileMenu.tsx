import React from 'react';
import {CiMenuBurger} from 'react-icons/ci';
import {IoCartOutline} from 'react-icons/io5';
import Link from 'next/link';

interface MobileMenuProps {
    toggleSidebar: (open: boolean) => () => void;
    openCart: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({toggleSidebar, openCart}) => (
    <div className="flex items-center justify-between w-full md:hidden mt-4">
        <div className="flex items-center space-x-4">
            <button
                className="text-gray-600 focus:outline-none hover:text-black transition-colors duration-200"
                onClick={toggleSidebar(true)}
            >
                <CiMenuBurger/>
            </button>
            <Link href="/E-Commerce-Platform/public">
                <h1 className="cursor-pointer hidden md:block">3𝓵𝓮𝓰𝓪𝓷𝓽</h1>
            </Link>
        </div>
        <IoCartOutline
            className="cursor-pointer text-2xl hover:text-gray-800 transition-colors duration-200"
            onClick={openCart}
        />
    </div>
);

export default MobileMenu;
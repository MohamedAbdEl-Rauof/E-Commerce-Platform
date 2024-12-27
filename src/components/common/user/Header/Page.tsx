"use client";
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {useCart} from '@/context/AddToCartContext';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import MobileMenu from './components/MobileMenu';
import MobileSidebar from './components/MobileSidebar';
import DesktopActions from './components/DesktopActions';

const NAV_ITEMS = ['Home', 'Shop', 'Categories', 'Contact Us'] as const;
type NavItem = (typeof NAV_ITEMS)[number];

const ROUTES: Record<NavItem, string> = {
    Home: '/',
    Shop: '/pages/Shop',
    Categories: '/pages/Categories',
    'Contact Us': '/pages/ContactUs',
};

const Header = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const {cart, isOpen, openCart, closeCart} = useCart();
    const [activeItem, setActiveItem] = useState<NavItem>('Home');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleItemClick = (item: NavItem) => {
        setActiveItem(item);
        router.push(ROUTES[item]);
        setSidebarOpen(false);
    };

    const toggleSidebar = (open: boolean) => () => {
        setSidebarOpen(open);
    };

    return (
        <header className="flex flex-col md:flex-row justify-between items-center w-[90%] mx-auto mt-11 text-3xl">
            <Logo/>
            <Navigation
                NAV_ITEMS={NAV_ITEMS}
                activeItem={activeItem}
                handleItemClick={handleItemClick}
            />
            <MobileMenu
                toggleSidebar={toggleSidebar}
                openCart={openCart}
            />
            <MobileSidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                NAV_ITEMS={NAV_ITEMS}
                handleItemClick={handleItemClick}
                session={session}
                router={router}
            />
            <DesktopActions
                session={session}
                cart={cart}
                isOpen={isOpen}
                openCart={openCart}
                closeCart={closeCart}
            />
        </header>
    );
};

export default Header;
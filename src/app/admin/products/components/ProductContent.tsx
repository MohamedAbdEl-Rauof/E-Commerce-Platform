'use client'
import React, {ReactElement, useEffect, useMemo, useState} from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useTheme} from '@mui/material/styles'
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import {useRouter} from "next/navigation";
// Import Tabler icons
import {TbPlus, TbShoppingCart} from "react-icons/tb";
import ViewProduct from "@/app/admin/products/components/ViewProduct";

// Add this after your imports
const fakeProducts = [
    {
        id: '1',
        name: 'Product 1',
        price: 99.99,
        description: 'Description for product 1',
        category: 'Electronics',
        stock: 10,
        image: '/broken-image.jpg'
    },
    {
        id: '2',
        name: 'Product 2',
        price: 49.99,
        description: 'Description for product 2',
        category: 'Clothing',
        stock: 20,
        image: '/broken-image.jpg'
    },
    {
        id: '3',
        name: 'Product 3',
        price: 29.99,
        description: 'Description for product 3',
        category: 'Home',
        stock: 15,
        image: '/broken-image.jpg'
    },
    {
        id: '4',
        name: 'Product 4',
        price: 199.99,
        description: 'Description for product 4',
        category: 'Electronics',
        stock: 5,
        image: '/broken-image.jpg'
    },
    {
        id: '5',
        name: 'Product 5',
        price: 9.99,
        description: 'Description for product 5',
        category: 'Books',
        stock: 50,
        image: '/broken-image.jpg'
    },
];

const ProductContent = ({productId: initialProductId, editOrView}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const router = useRouter();

    // Add state for active tab
    const [activeTab, setActiveTab] = useState('myProducts');
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    // Add state for product ID
    const [selectedProductId, setSelectedProductId] = useState<string | null>(initialProductId || null);

    useEffect(() => {
        if (editOrView === "edit") {
            setIsEditMode(true);
            setIsViewMode(false);
            setActiveTab('editProduct');
        } else if (editOrView === "view") {
            setIsEditMode(false);
            setIsViewMode(true);
            setActiveTab('viewProduct');
        }
    }, [editOrView]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        if (newValue === 'myProducts') {
            setIsEditMode(false);
            setIsViewMode(false);
        }
        setActiveTab(newValue);
    };

    // Fix the tabs definition with proper syntax
    const tabs = useMemo(() => [
        {label: "My Products", icon: <TbShoppingCart/>, value: 'myProducts'},
        {
            label: (() => {
                if (editOrView === "edit") return "Edit Product";
                else if (editOrView === "view") return "View Product";
                else return "Create New Product";
            })(),
            icon: <TbPlus/>,
            value: (() => {
                if (isEditMode) return 'editProduct';
                else if (isViewMode) return 'viewProduct';
                else return 'createNewProduct';
            })()
        },
    ], [isEditMode, isViewMode, editOrView]);

    const HandleEdit = (id: string) => {
        console.log("Edit Product", id);
        setSelectedProductId(id); // Use the renamed state setter
        setIsEditMode(true);
        setActiveTab('editProduct');
        router.push(`/admin/products/edit/${id}`);
    }

    const HandleView = (id: string) => {
        console.log("view Product", id);
        setSelectedProductId(id); // Use the renamed state setter
        setIsViewMode(true);
        setActiveTab('viewProduct');
        router.push(`/admin/products/view/${id}`);
    }

    const HandleBack = () => {
        setIsEditMode(false);
        setIsViewMode(false);
        setActiveTab('myProducts');
        router.push('/admin/products');
    }

    // Define tab content with conditional rendering based on isEditMode and isViewMode
    const tabContentList: { [key: string]: ReactElement } = {
        myProducts: <div><ProductList products={fakeProducts} onEdit={HandleEdit} onView={HandleView}/></div>,
        createNewProduct: <div><CreateProduct/></div>,
        editProduct: <div><EditProduct productId={selectedProductId} onBack={HandleBack}/></div>,
        viewProduct: <div><ViewProduct productId={selectedProductId} isViewOnly={true} onBack={HandleBack}/></div>,
    };

    return (
        <TabContext value={activeTab}>
            <Box sx={{width: '100%'}}>
                <Box sx={{justifyContent: 'center', display: 'flex', width: '100%'}}>
                    <Tabs
                        onChange={handleChange}
                        value={activeTab}
                        variant={isMobile ? 'fullWidth' : 'scrollable'}
                        orientation={isMobile ? 'vertical' : 'horizontal'}
                        sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            '& .MuiTabs-flexContainer': {
                                flexDirection: isMobile ? 'column' : 'row',
                                justifyContent: isMobile ? 'flex-start' : 'center',
                                width: '100%',
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none',
                            },
                            '& .MuiTabs-scroller': {
                                overflow: 'auto !important',
                            },
                        }}
                    >
                        {tabs.map((tab) => (
                            <Tab
                                key={tab.value}
                                label={tab.label}
                                icon={tab.icon}
                                iconPosition='start'
                                value={tab.value}
                                sx={{
                                    minHeight: isMobile ? '60px' : '50px',
                                    padding: '8px',
                                    backgroundColor: 'var(--light)',
                                    color: 'var(--foreground)',
                                    borderRadius: '5px',
                                    fontWeight: 500,
                                    textTransform: 'capitalize',
                                    fontSize: isMobile ? '0.9rem' : '1rem',
                                    justifyContent: 'flex-start',
                                    width: isMobile ? '100%' : (isTablet ? '170px' : '300px'),
                                    maxWidth: 'none',
                                    '& .MuiTab-iconWrapper': {
                                        marginRight: '12px',
                                        fontSize: '1.2rem',
                                        color: 'var(--primary)',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'var(--primary)',
                                        color: 'var(--light)',
                                        '& .MuiTab-iconWrapper': {
                                            color: 'var(--light)',
                                        }
                                    },
                                    '&:hover': {
                                        backgroundColor: 'var(--focus)',
                                        transition: 'background-color 0.3s ease',
                                    },
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>
                <>
                    {Object.entries(tabContentList).map(([key, content]) => (
                        <TabPanel key={key} value={key} sx={{p: {xs: 1, sm: 2, md: 3}}}>
                            {content}
                        </TabPanel>
                    ))}
                </>
            </Box>
        </TabContext>
    )
}

export default ProductContent
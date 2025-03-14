'use client'
import React, {ReactElement, useEffect, useMemo, useState} from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useTheme} from '@mui/material/styles'
import CategoryList from "./CategorytList";
import CreateCateory from "./CreateCateory";
import EditCategory from "./EditCategory";
import {useRouter} from "next/navigation";
import {TbPlus, TbShoppingCart} from "react-icons/tb";
import ViewCategory from "./ViewCategory";

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

const CategoriesContent = ({
                               productId: initialProductId,
                               editOrView
                           }: {
    productId?: string | null;
    editOrView?: 'edit' | 'view' | null;
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('myCategory');
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(initialProductId || null);

    useEffect(() => {
        if (editOrView === "edit") {
            setIsEditMode(true);
            setIsViewMode(false);
            setActiveTab('editCategory');
        } else if (editOrView === "view") {
            setIsEditMode(false);
            setIsViewMode(true);
            setActiveTab('viewCategory');
        }
    }, [editOrView]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        if (newValue === 'myCategory') {
            setIsEditMode(false);
            setIsViewMode(false);
        }
        setActiveTab(newValue);
    };

    const tabs = useMemo(() => [
        {label: "My Category", icon: <TbShoppingCart/>, value: 'myCategory'},
        {
            label: (() => {
                if (editOrView === "edit") return "Edit Category";
                else if (editOrView === "view") return "View Category";
                else return "Create New Category";
            })(),
            icon: <TbPlus/>,
            value: (() => {
                if (isEditMode) return 'editCategory';
                else if (isViewMode) return 'viewCategory';
                else return 'createNewProduct';
            })()
        },
    ], [isEditMode, isViewMode, editOrView]);

    const HandleEdit = (id: string) => {
        console.log("Edit Product", id);
        setSelectedProductId(id);
        setIsEditMode(true);
        setActiveTab('editCategory');
        router.push(`/admin/categories/edit/${id}`);
    }

    const HandleView = (id: string) => {
        console.log("view Product", id);
        setSelectedProductId(id);
        setIsViewMode(true);
        setActiveTab('viewCategory');
        router.push(`/admin/categories/view/${id}`);
    }

    const HandleBack = () => {
        setIsEditMode(false);
        setIsViewMode(false);
        setActiveTab('myCategory');
        router.push('/admin/categories');
    }

    const tabContentList: { [key: string]: ReactElement } = {
        myCategory: <div><CategoryList products={fakeProducts} onEdit={HandleEdit} onView={HandleView}/></div>,
        createNewProduct: <div><CreateCateory/></div>,
        editCategory: <div><EditCategory productId={selectedProductId} onBack={HandleBack}/></div>,
        viewCategory: <div><ViewCategory productId={selectedProductId} onBack={HandleBack}/></div>,
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

export default CategoriesContent
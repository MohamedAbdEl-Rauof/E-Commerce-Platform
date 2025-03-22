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
import {TbPlus, TbShoppingCart} from "react-icons/tb";
import ViewProduct from "@/app/admin/products/components/ViewProduct";
import {toast} from "react-toastify";
import {useProduct} from "@/context/ProductContext";
import {useCategories} from '@/context/CategoriesContext';


const ProductContent = ({
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

    const {products, updateProduct} = useProduct();
    const [activeTab, setActiveTab] = useState('myProducts');
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(initialProductId || null);
    const {categories} = useCategories();

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
        setSelectedProductId(id);
        setIsEditMode(true);
        setActiveTab('editProduct');
        router.push(`/admin/products/edit/${id}`);
    }

    const HandleView = (id: string) => {
        setSelectedProductId(id);
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


    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/categories?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const deletedCategory = await response.json();
                toast.success('Category deleted successfully');
                updateProduct({
                    ...deletedCategory,
                    _id: id,
                });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
        }
    };


    const tabContentList: { [key: string]: ReactElement } = {
        myProducts: <div><ProductList products={products} onEdit={HandleEdit} onView={HandleView}
                                      onDelete={handleDelete} categories={categories}/></div>,
        createNewProduct: <div><CreateProduct products={products} onUpdate={updateProduct} categories={categories}/>
        </div>,
        editProduct: <div><EditProduct productId={selectedProductId} onBack={HandleBack} products={products}
                                       categories={categories} onUpdate={updateProduct}/></div>,
        viewProduct: <div><ViewProduct productId={selectedProductId} onBack={HandleBack} products={products}/></div>,
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
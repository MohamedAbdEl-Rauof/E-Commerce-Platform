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
import {useCategories} from '@/context/CategoriesContext';
import {toast} from 'react-toastify'

type UpdatedCategory = {
    _id: string;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    productCount: number;
    error: string | null;
};

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
    const {categories, updateCategory} = useCategories();

    const [activeTab, setActiveTab] = useState('myCategory');
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(initialProductId || undefined);
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
        setSelectedCategoryId(id);
        setIsEditMode(true);
        setActiveTab('editCategory');
        router.push(`/admin/categories/edit/${id}`);
    }

    const HandleView = (id: string) => {
        setSelectedCategoryId(id);
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

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/categories?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const deletedCategory = await response.json();
                toast.success('Category deleted successfully');
                updateCategory({
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
        myCategory: <div><CategoryList categories={categories} onEdit={HandleEdit} onView={HandleView}
                                       onDelete={handleDelete}
        /></div>,
        createNewProduct: <div><CreateCateory categories={categories} onUpdate={updateCategory}
        /></div>,
        editCategory: <div><EditCategory
            categoryId={selectedCategoryId}
            onBack={HandleBack}
            categories={categories}
            onUpdate={updateCategory}
        /></div>,
        viewCategory: <div><ViewCategory
            categoryId={selectedCategoryId}
            onBack={HandleBack}
            categories={categories}
        /></div>,
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
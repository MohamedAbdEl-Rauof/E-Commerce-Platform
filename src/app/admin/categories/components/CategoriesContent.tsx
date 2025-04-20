'use client'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import CategoryList from "./CategorytList";
import CreateCateory from "./CreateCateory";
import EditCategory from "./EditCategory";
import { useRouter } from "next/navigation";
import { TbPlus, TbShoppingCart } from "react-icons/tb";
import ViewCategory from "./ViewCategory";
import { useCategories } from '@/context/CategoriesContext';

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
    const { categories, updateCategory, handleDelete } = useCategories();

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
            router.push('/admin/categories');
        }
        setActiveTab(newValue);
    };

    const tabs = useMemo(() => {
        const tabsArray = [
            { label: "My Category", icon: <TbShoppingCart />, value: 'myCategory' }
        ];
        
        if (isEditMode) {
            tabsArray.push({ 
                label: "Edit Category", 
                icon: <TbPlus />, 
                value: 'editCategory' 
            });
        } else if (isViewMode) {
            tabsArray.push({ 
                label: "View Category", 
                icon: <TbPlus />, 
                value: 'viewCategory' 
            });
        } else {
            tabsArray.push({ 
                label: "Create New Category", 
                icon: <TbPlus />, 
                value: 'createNewProduct' 
            });
        }
        
        return tabsArray;
    }, [isEditMode, isViewMode]);

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
            <Box sx={{ width: '100%' }}>
                <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
                    <Tabs
                        onChange={handleChange}
                        value={activeTab}
                        variant={isMobile ? 'fullWidth' : 'scrollable'}
                        orientation={isMobile ? 'vertical' : 'horizontal'}
                        sx={{
                            width: '100%',
                            backgroundColor: 'var(--background)',
                            borderRadius: '8px',
                            padding: '8px',
                            boxShadow: '0 2px 8px var(--shadow)',
                            '& .MuiTabs-flexContainer': {
                                flexDirection: isMobile ? 'column' : 'row',
                                justifyContent: isMobile ? 'flex-start' : 'center',
                                width: '100%',
                                gap: '10px'
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none',
                            },
                            '& .MuiTabs-scroller': {
                                overflow: 'auto !important',
                            },
                        }}
                        className="scroll-container"
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
                                    padding: '8px 16px',
                                    backgroundColor: 'var(--light)',
                                    color: 'var(--foreground)',
                                    borderRadius: '8px',
                                    fontWeight: 500,
                                    textTransform: 'capitalize',
                                    fontSize: isMobile ? '0.9rem' : '1rem',
                                    justifyContent: 'flex-start',
                                    width: isMobile ? '100%' : (isTablet ? '170px' : '300px'),
                                    maxWidth: 'none',
                                    border: '1px solid var(--border)',
                                    transition: 'all 0.2s ease',
                                    '& .MuiTab-iconWrapper': {
                                        marginRight: '12px',
                                        fontSize: '1.2rem',
                                        color: 'var(--primary)',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'var(--primary)',
                                        color: 'var(--text-on-image)',
                                        boxShadow: '0 4px 8px var(--shadow)',
                                        '& .MuiTab-iconWrapper': {
                                            color: 'var(--text-on-image)',
                                        }
                                    },
                                    '&:hover': {
                                        backgroundColor: 'var(--hover)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px var(--shadow)',
                                        '&.Mui-selected': {
                                            backgroundColor: 'var(--primary)',
                                        }
                                    },
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>
                <>
                    {Object.entries(tabContentList).map(([key, content]) => (
                        <TabPanel
                            key={key}
                            value={key}
                            sx={{
                                p: { xs: 1, sm: 2, md: 3 },
                                backgroundColor: 'var(--light)',
                                borderRadius: '8px',
                                mt: 2,
                                boxShadow: '0 2px 8px var(--shadow)',
                                border: '1px solid var(--border)'
                            }}
                        >
                            {content}
                        </TabPanel>
                    ))}
                </>
            </Box>
        </TabContext>
    )
}

export default CategoriesContent
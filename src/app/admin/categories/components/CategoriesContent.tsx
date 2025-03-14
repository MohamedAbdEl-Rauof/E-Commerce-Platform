'use client'
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useMediaQuery, useTheme} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import {CategoriesContentProps, Category} from '../types';
import {styled} from '@mui/material/styles';

// Custom styled TabList component
const CustomTabList = styled(TabList)(({theme}) => ({
    borderBottom: 'none',
    '& .MuiTabs-flexContainer': {
        gap: theme.spacing(2),
    },
}));

const CategoriesContent: React.FC<CategoriesContentProps> = ({
                                                                 mode = 'list',
                                                                 categoryId
                                                             }) => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const [activeTab, setActiveTab] = useState(mode === 'list' ? '1' : '2');
    const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>(
        mode === 'edit' ? 'edit' : mode === 'view' ? 'view' : 'create'
    );
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(categoryId);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        if (newValue === '1') {
            // Reset to list view
            setFormMode('create');
            setSelectedCategoryId(undefined);
        }
        setActiveTab(newValue);
    };

    const handleView = (id: string) => {
        router.push(`/admin/categories/view/${id}`);
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/categories/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        // Delete logic handled in CategoryList component
        console.log('Category deleted:', id);
    };

    const handleSave = (category: Category) => {
        // After save, go back to list
        router.push('/admin/categories');
    };

    const handleCancel = () => {
        // Go back to list
        router.push('/admin/categories');
    };

    // Define tabs
    const tabs = [
        {label: "Category List", value: "1", icon: null},
        {label: "Create Category", value: "2", icon: null}
    ];

    // Define tab content
    const tabContentList = {
        "1": <CategoryList onView={handleView} onEdit={handleEdit} onDelete={handleDelete}/>,
        "2": <CategoryForm mode="create" onSave={handleSave} onCancel={() => setActiveTab('1')}/>
    };

    // If we're in edit or view mode, show the form directly
    if (mode === 'edit' || mode === 'view') {
        return (
            <Paper sx={{p: 3}}>
                <CategoryForm
                    mode={mode === 'edit' ? 'edit' : 'view'}
                    categoryId={categoryId}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </Paper>
        );
    }

    return (
        <Box sx={{width: '100%'}}>
            <TabContext value={activeTab}>
                <Box sx={{width: '100%'}}>
                    <Paper
                        elevation={1}
                        sx={{
                            justifyContent: 'center',
                            display: 'flex',
                            width: '100%',
                            borderRadius: '8px 8px 0 0',
                            mb: 0
                        }}
                    >
                        <CustomTabList
                            onChange={handleTabChange}
                            variant={isMobile ? 'fullWidth' : 'scrollable'}
                            orientation={isMobile ? 'vertical' : 'horizontal'}
                            sx={{
                                width: '100%',
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
                                        fontSize: isMobile ? '0.9rem' : '1rem',
                                        justifyContent: 'flex-start',
                                        width: isMobile ? '100%' : (isTablet ? '170px' : '300px'),
                                        maxWidth: 'none',
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.primary.light,
                                            color: theme.palette.primary.contrastText,
                                            borderRadius: '4px',
                                        },
                                        '& .MuiTab-iconWrapper': {
                                            marginRight: '8px',
                                        },
                                    }}
                                />
                            ))}
                        </CustomTabList>
                    </Paper>

                    {/* Content area with different background */}
                    <Paper
                        elevation={2}
                        sx={{
                            borderRadius: '0 0 8px 8px',
                            backgroundColor: theme.palette.background.paper,
                            mt: 0
                        }}
                    >
                        {Object.entries(tabContentList).map(([key, content]) => (
                            <TabPanel key={key} value={key} sx={{p: {xs: 2, sm: 3, md: 4}}}>
                                {content}
                            </TabPanel>
                        ))}
                    </Paper>
                </Box>
            </TabContext>
        </Box>
    );
};

export default CategoriesContent;
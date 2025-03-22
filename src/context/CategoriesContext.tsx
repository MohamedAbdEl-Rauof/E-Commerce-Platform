"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

export interface Category {
    _id: string;
    image: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    productCount: number;
}

interface CategoriesContextType {
    categories: Category[];
    loading: boolean;
    error: string | null;
    updateCategory: (updatedCategory: Category) => void;
    handleDelete: (categoryId: string) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }
    return context;
};

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/categories");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data);
            setError(null);
        } catch (error) {
            setError("Error fetching categories");
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const updateCategory = (updatedCategory: Category) => {
        setCategories(prevCategories =>
            prevCategories.map(category =>
                category._id === updatedCategory._id ? updatedCategory : category
            )
        );
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/categories?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Category deleted successfully');
                setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
        }
    };
    
    return (
        <CategoriesContext.Provider value={{categories, loading, error, updateCategory, handleDelete}}>
            {children}
        </CategoriesContext.Provider>
    );
};
import React, {createContext, useContext, useEffect, useState} from "react";

interface Category {
    id: string;
    image: string;
    name: string;
}

interface CategoriesContextType {
    categories: Category[];
    loading: boolean;
    error: string | null;
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError("Error fetching categories");
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{categories, loading, error}}>
            {children}
        </CategoriesContext.Provider>
    );
};
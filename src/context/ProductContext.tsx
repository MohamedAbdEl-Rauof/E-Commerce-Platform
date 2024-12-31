import React, {createContext, useContext, useEffect, useState} from "react";

export interface Product {
    _id: string;
    image: string;
    name: string;
    price: number;
    PriceBeforeDiscount: string;
    createdAt: Date;
}

interface ProductContextType {
    products: Product[];
    setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
    loading: boolean;
    error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
}

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError("Error fetching products");
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{products, loading, error}}>
            {children}
        </ProductContext.Provider>
    );
}
"use client"
import React, {createContext, useContext, useEffect, useState} from "react";

interface Image {
    url: string;
    alt?: string;
}

interface SliderContextType {
    images: Image[];
    loading: boolean;
    error: string | null;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

export const useSlider = () => {
    const context = useContext(SliderContext);
    if (!context) {
        throw new Error("useSlider must be used within a SliderProvider");
    }
    return context;
};

export const SliderProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/slidersection");
                const data = await response.json();
                setImages(data[0]?.images || []);
            } catch (error) {
                setError("Error fetching images");
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    return (
        <SliderContext.Provider value={{images, loading, error}}>
            {children}
        </SliderContext.Provider>
    );
};
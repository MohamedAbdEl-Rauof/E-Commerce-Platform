"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export interface User {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role?: string;
    phone?: string;
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    error: null,
    refreshUser: async () => { },
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    const fetchUser = async () => {

        if (!session?.user?.id) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/user?id=${session.user.id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            console.log("Fetched user data:", userData);
            setUser(userData);
        } catch (err) {
            console.error('Error fetching user:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            
            if (session?.user) {
                setUser({
                    _id: session.user.id,
                    name: session.user.name || 'Anonymous User',
                    email: session.user.email || '',
                    role: session.user.role || 'user'
                });
            } else {
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        await fetchUser();
    };

    useEffect(() => {
        console.log("Session status:", status);
        console.log("Session data:", session);
        
        if (status === 'authenticated') {
            fetchUser();
        } else if (status === 'unauthenticated') {
            setUser(null);
            setLoading(false);
        }
    }, [status, session]);

    const value = {
        user,
        loading,
        error,
        refreshUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
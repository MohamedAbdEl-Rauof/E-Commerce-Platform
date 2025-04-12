"use client";
import AdminDashboardLayout from './AdminDashboardLayout';
import {CategoriesProvider} from "@/context/CategoriesContext";
import {ProductProvider} from "@/context/ProductContext";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

const queryClient = new QueryClient();

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <AdminDashboardLayout>
            <CategoriesProvider>
                <ProductProvider>
                    <QueryClientProvider client={queryClient}>
                        {children}
                        <ReactQueryDevtools initialIsOpen={false}/>
                    </QueryClientProvider>
                </ProductProvider>
            </CategoriesProvider>
        </AdminDashboardLayout>
    );

}
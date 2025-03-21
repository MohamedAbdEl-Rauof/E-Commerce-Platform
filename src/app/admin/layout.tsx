import AdminDashboardLayout from './AdminDashboardLayout';
import {CategoriesProvider} from "@/context/CategoriesContext";
import {ProductProvider} from "@/context/ProductContext";

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <AdminDashboardLayout>
            <CategoriesProvider>
                <ProductProvider>
                    {children}
                </ProductProvider>
            </CategoriesProvider>
        </AdminDashboardLayout>
    );

}
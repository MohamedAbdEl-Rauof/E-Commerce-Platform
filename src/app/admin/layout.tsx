import AdminDashboardLayout from './AdminDashboardLayout';
import {CategoriesProvider} from "@/context/CategoriesContext";

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <AdminDashboardLayout>
            <CategoriesProvider>
                {children}
            </CategoriesProvider>
        </AdminDashboardLayout>
    );

}
export interface Category {
    id: string;
    name: string;
    description: string;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
}

export type CategoryFormMode = 'create' | 'edit' | 'view';

export interface CategoryFormProps {
    mode: CategoryFormMode;
    categoryId?: string;
    onSave?: (category: Category) => void;
    onCancel?: () => void;
}

export interface CategoryListProps {
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export interface CategoryItemProps {
    category: Category;
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export interface CategoriesContentProps {
    mode?: 'list' | 'create' | 'edit' | 'view';
    categoryId?: string;
}
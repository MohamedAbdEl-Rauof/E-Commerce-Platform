import {useEffect} from "react";

interface EditCategoryProps {
    onBack: () => void
    productId: string | null;
}

const EditCategory: React.FC<EditCategoryProps> = ({productId, onBack}) => {
    useEffect(() => {
        if (productId) {
            // Fetch product data here
            console.log("Fetching data for product:", productId);
        }
    }, [productId]);

    return (
        <div>
            <h1>Edit Product {productId}</h1>
            <button onClick={onBack}>Back</button>
        </div>
    );
}

EditCategory.displayName = 'EditCategory';

export default EditCategory;
import {useEffect} from "react";

interface EditProductProps {
    onBack: () => void
    productId: string
}

const EditProduct: React.FC<EditProductProps> = ({productId, onBack}) => {
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

EditProduct.displayName = 'EditProduct';

export default EditProduct;
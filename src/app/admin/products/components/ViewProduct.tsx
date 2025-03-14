import {useEffect} from "react";

interface ViewProductProps {
    productId: string;
    onBack: () => void;
}

const ViewProduct: React.FC<ViewProductProps> = ({productId, onBack}) => {

    useEffect(() => {
        if (productId) {
            // Fetch product data here
            console.log("Fetching data for viewing product:", productId);
        }
    }, [productId]);

    return (
        <div>
            <h1>View Product {productId}</h1>
            <button onClick={onBack}>Back</button>
        </div>
    );
}


ViewProduct.displayName = 'ViewProduct';
export default ViewProduct;



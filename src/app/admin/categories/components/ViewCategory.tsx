import {useEffect} from "react";

interface ViewProductProps {
    productId: string | null;
    onBack: () => void;
}

const ViewCategory: React.FC<ViewProductProps> = ({productId, onBack}) => {

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


ViewCategory.displayName = 'ViewCategory';
export default ViewCategory;



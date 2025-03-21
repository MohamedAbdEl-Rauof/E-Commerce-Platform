import ProductContent from "./components/ProductContent";

export const metadata = {
    title: 'Products Management',
    description: 'Manage product categories',
};

const Produts = () => {
    return (
        <div>
            <ProductContent productId="" editOrView={null}/>
        </div>
    );
}
export default Produts;
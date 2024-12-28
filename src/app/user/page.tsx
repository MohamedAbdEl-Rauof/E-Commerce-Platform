"use client";
import Navbar from "@/components/common/user/Navbar";
import Home from "@/app/user/home/page";
import {CartProvider} from "@/context/AddToCartContext";
import {ProductProvider} from "@/context/ProductContext";

const Page = () => {

    return (
        <div>
            {/* Made CartProvider to listen the state in all project */}
            <CartProvider>
                <ProductProvider>
                    <Navbar/>
                    <h1>Hi Hi Captain (User)</h1>
                    <Home/>
                </ProductProvider>
            </CartProvider>

        </div>
    );
};

export default Page;
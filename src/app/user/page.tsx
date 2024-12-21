"use client";
import Navbar from "@/components/common/Navbar";
import Home from "@/app/user/Home/page";
import {CartProvider} from "@/context/AddToCartContext";

const Page = () => {

    return (
        <div>
            {/* Made CartProvider to listen the state in all project */}
            <CartProvider>
                <Navbar/>
                <h1>Hi Hi Captain (User)</h1>
                <Home/>
            </CartProvider>


        </div>
    );
};

export default Page;
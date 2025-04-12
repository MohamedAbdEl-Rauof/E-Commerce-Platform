"use client";

import {useParams} from "next/navigation";
import ViewOrder from "@/app/admin/orders/components/ViewOrder";

const Page = () => {
    const params = useParams();
    const userId = params ? params.id as string : '';

    return (
        <ViewOrder userId={userId}/>

    );
}
export default Page;
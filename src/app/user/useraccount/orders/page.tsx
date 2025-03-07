// pages/UserAccount/orders/page.tsx

import OrdersList from "./components/OrdersList";
import Box from "@mui/material/Box";

export default function OrdersPage() {
    return (
        <Box style={{maxWidth: 1200, margin: '2rem auto', padding: '0 1rem'}}>
            <OrdersList/>
        </Box>
    );
}
// pages/UserAccount/orders/page.tsx

import OrdersList from "../components/OrdersList";

export default function OrdersPage() {
    return (
        <div style={{maxWidth: 1200, margin: '2rem auto', padding: '0 1rem'}}>
            <OrdersList/>
        </div>
    );
}
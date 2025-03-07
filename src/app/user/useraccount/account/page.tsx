// pages/UserAccount/orders/page.tsx

import AccountDetails from "./components/AccountDetails";
import Box from "@mui/material/Box";

export default function AccountPage() {
    return (
        <Box style={{maxWidth: 1200, margin: '2rem auto', padding: '0 1rem'}}>
            <AccountDetails/>
        </Box>
    );
}
import React from "react";
import {Box, Checkbox, ListItemButton, ListItemText, Typography} from "@mui/material";
import {Control, FieldErrors} from "react-hook-form";
import {UserData} from "../../types/type";
import {CheckCircle, CreditCard, RadioButtonUnchecked} from "@mui/icons-material";

interface ShippingAddressProps {
    control: Control<UserData, any>;
    errors: FieldErrors<UserData>;
    handleSelect: (method: string) => void;
}

const PaymentMethod: React.FC<ShippingAddressProps> = ({control, errors, handleSelect}) => {
    // const {paymentMethod} = useWatch(control);

    return (
        <Box
            sx={{
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#fff",
            }}
        >
            <Typography variant="h6" sx={{fontWeight: "bold", mb: 2}}>
                Payment Method
            </Typography>
            <Box sx={{mt: 4, borderBottom: "1px solid #e0e0e0", pb: 1}}>
                {/* Credit Card Option */}
                <ListItemButton
                    sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        padding: "8px",
                    }}
                    onClick={() => handleSelect("credit-card")}
                >
                    <Checkbox
                        icon={<RadioButtonUnchecked/>}
                        checkedIcon={<CheckCircle/>}
                        // checked={paymentMethod === "credit-card"}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <ListItemText primary="Pay By Card Credit"/>
                        <CreditCard style={{fontSize: 24}}/>
                    </Box>
                </ListItemButton>

                {/* PayPal Option */}
                <ListItemButton
                    sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        padding: "8px",
                    }}
                    onClick={() => handleSelect("paypal")}
                >
                    <Checkbox
                        icon={<RadioButtonUnchecked/>}
                        checkedIcon={<CheckCircle/>}
                        // checked={paymentMethod === "paypal"}
                    />
                    <ListItemText primary="PayPal"/>
                </ListItemButton>
            </Box>
        </Box>
    );
};

export default PaymentMethod;
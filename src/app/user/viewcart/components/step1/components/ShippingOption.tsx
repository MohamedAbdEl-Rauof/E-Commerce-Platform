import React from 'react';
import {Box, Checkbox, ListItemButton, ListItemText} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface ShippingOptionProps {
    id: number;
    label: string;
    price: string;
    selectedShipping: number;
    handleSelectShipping: (id: number) => void;
}

const ShippingOption: React.FC<ShippingOptionProps> = ({
                                                           id,
                                                           label,
                                                           price,
                                                           selectedShipping,
                                                           handleSelectShipping,
                                                       }) => {
    return (
        <Box sx={{borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1}}>
            <ListItemButton onClick={() => handleSelectShipping(id)}>
                <Checkbox
                    checked={selectedShipping === id}
                    icon={<RadioButtonUncheckedIcon/>}
                    checkedIcon={<CheckCircleIcon/>}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <ListItemText primary={label}/>
                    <ListItemText primary={price} sx={{textAlign: "right"}}/>
                </Box>
            </ListItemButton>
        </Box>
    );
};

export default ShippingOption;
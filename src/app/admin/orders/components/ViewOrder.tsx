import React from 'react';
import {
    Box,
    Chip,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

interface Props {
    userId: string;
}

const ViewOrder: React.FC<Props> = ({userId}) => {
    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>Order Summary</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{p: 2, height: '100%'}}>
                        <Typography variant="h6" gutterBottom>Order Details</Typography>
                        <Typography><strong>Order Code:</strong> 123456</Typography>
                        <Typography><strong>Date:</strong> 01/01/2023</Typography>
                        <Typography><strong>Total Amount:</strong> $100.00</Typography>
                        <Typography><strong>Status:</strong> <Chip label="Shipped" color="success"
                                                                   size="small"/></Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{p: 2, height: '100%'}}>
                        <Typography variant="h6" gutterBottom>Customer Information</Typography>
                        <Typography><strong>Name:</strong> John Doe</Typography>
                        <Typography><strong>Email:</strong> johndoe@example.com</Typography>
                        <Typography><strong>Phone:</strong> (123) 456-7890</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} sx={{p: 2}}>
                        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
                        <Typography>123 Main St</Typography>
                        <Typography>Cityville, ST 12345</Typography>
                        <Typography>Country: USA</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} sx={{p: 2}}>
                        <Typography variant="h6" gutterBottom>Items Ordered</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>PROD1</TableCell>
                                        <TableCell>Product 1 - Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit.</TableCell>
                                        <TableCell align="right">$10.00</TableCell>
                                        <TableCell align="right">2</TableCell>
                                        <TableCell align="right">$20.00</TableCell>
                                    </TableRow>
                                    {/* Add more rows as needed */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} sx={{p: 2}}>
                        <Typography variant="h6" gutterBottom>Payment Information</Typography>
                        <Typography><strong>Payment Method:</strong> Credit Card</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ViewOrder;
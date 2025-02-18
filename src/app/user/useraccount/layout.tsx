"use client";

import {Box, Container, Grid, Typography} from "@mui/material";
import AccountSidebar from "./components/AccountSidebar";

export default function AccountLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Box >
                <Container maxWidth="lg" sx={{py: 8}}>
                    <Typography variant="h2" align="center" gutterBottom sx={{mb: 6}}>
                        My Account
                    </Typography>

                    <Grid container spacing={4} sx={{maxWidth: 1200, mx: "auto"}}>
                        <Grid item xs={12} md={4}>
                            <AccountSidebar/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}

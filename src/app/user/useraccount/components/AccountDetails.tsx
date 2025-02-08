// /pages/UserAccount/components/AccountDetails.tsx

"use client";

import {useEffect, useState} from "react";
import {Box, Button, Card, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useSession} from "next-auth/react";

interface UserData {
    name: string;
    username: string;
    email: string;
    phone: string;
}

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
    },
});

export default function AccountDetails() {
    const {data: session} = useSession();
    const userId = session?.user?.id || "";
    const [userData, setUserData] = useState<UserData | null>(null);

    // Initialize formData with empty strings
    const [formData, setFormData] = useState({
        firstName: "",
        username: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/users?id=${userId}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.name,
                username: userData.username,
                email: userData.email,
                phone: userData.phone,
            });
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        window.location.reload(); // Reload the page to reflect changes

        // Log the data to be sent
        console.log("Form submitted:", formData);

        try {
            // Send the PUT request to the backend with the form data in the body, NOT in the URL
            const response = await fetch("/api/users", {
                method: "PUT", // Method should be PUT for updating
                headers: {
                    "Content-Type": "application/json", // Specify JSON content type
                },
                body: JSON.stringify({
                    id: userId, // Include user ID to identify the user
                    ...formData, // Spread the form data into the request body
                }),
            });

            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                console.log("User updated:", data);
                // Optionally refresh or redirect after a successful update
                window.location.reload(); // Reload the page to reflect changes
            } else {
                const errorData = await response.json();
                console.error("Error updating user:", errorData.message);
                // Optionally show an error message to the user
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Card sx={{p: 4}}>
            <form onSubmit={handleSubmit}>
                <Box sx={{display: "flex", flexDirection: "column", gap: 4}}>
                    <div>
                        <Typography variant="h5" sx={{mb: 3}}>
                            Account Details
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                            <StyledTextField
                                label="Your Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                fullWidth
                            />

                            <StyledTextField
                                label="UserName"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                fullWidth
                            />

                            <Box>
                                <StyledTextField
                                    label="EMAIL"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Box>
                            <StyledTextField
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: {xs: "100%", md: "auto"},
                            alignSelf: {md: "flex-start"},
                        }}
                    >
                        Save changes
                    </Button>
                </Box>
            </form>
        </Card>
    );
}

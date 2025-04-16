"use client";
import {useEffect, useState} from "react";
import {Box, Button, Card, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {storage} from '@/utils/firebase';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {toast} from "react-toastify";

type UserData = {
    _id: string;
    name: string;
    username: string;
    image: string;
    email: string;
    phone: string;
    password: string;
};

interface AccountDetailsProps {
    userData: UserData | null;
    selectedFile: File | null;
    onFileUpload: (newAvatarUrl: string) => void;
}

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "var(--search-bar-bg)",
        color: "var(--search-bar-text)",
        "& fieldset": {
            borderColor: "var(--border)",
        },
        "&:hover fieldset": {
            borderColor: "var(--primary)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "var(--focus)",
        },
    },
    "& .MuiInputLabel-root": {
        color: "var(--muted)",
    },
});

export default function AccountDetails({userData, selectedFile, onFileUpload}: AccountDetailsProps) {
    const [formData, setFormData] = useState({
        name: userData?.name || "",
        username: userData?.username || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name,
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
        e.preventDefault();

        let avatarUrl = userData?.image || '';

        if (selectedFile) {
            const storageRef = ref(storage, `avatars/${userData?._id}_${selectedFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            try {
                await new Promise<void>((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log("Upload is " + progress + "% done");
                        },
                        (error) => {
                            console.error("Error uploading file:", error);
                            reject(error);
                        },
                        async () => {
                            try {
                                avatarUrl = await getDownloadURL(uploadTask.snapshot.ref);
                                console.log("File available at", avatarUrl);
                                onFileUpload(avatarUrl); // Update the avatar in the parent component
                                resolve();
                            } catch (error) {
                                console.error("Error getting download URL:", error);
                                reject(error);
                            }
                        }
                    );
                });
            } catch (error) {
                console.error("Error uploading file:", error);
                toast.error("Error uploading file. Please try again.");
                return;
            }
        }

        try {
            const response = await fetch(`/api/user?userId=${userData?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userData?._id,
                    name: formData.name,
                    username: formData.username,
                    email: formData.email,
                    phone: formData.phone,
                    image: avatarUrl,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User updated:", data);
                toast.success("User information updated successfully!");
                // Optionally update the local state or context with the new user data
                // updateUserData(data.user);
            } else {
                const errorData = await response.json();
                console.error("Error updating user:", errorData.error);
                toast.error(`Error updating user: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Card sx={{p: 4}}>
            <form onSubmit={handleSubmit}>
                <Box sx={{display: "flex", flexDirection: "column", gap: 4}}>
                    <Box>
                        <Typography variant="h5" sx={{mb: 3, color: "var(--foreground)"}}>
                            Account Details
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                            <StyledTextField
                                label="Name"
                                name="name"
                                value={formData.name}
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
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: {xs: "100%", md: "auto"},
                            alignSelf: {md: "flex-start"},
                            bgcolor: "var(--primary)",
                            color: "var(--light)",
                            '&:hover': {
                                bgcolor: "var(--accent)",
                            },
                        }}
                    >
                        Save changes
                    </Button>
                </Box>
            </form>
        </Card>
    );
}
"use client";
import { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/context/UserContext";

const accountSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone must contain only numbers")
});

type AccountFormValues = z.infer<typeof accountSchema>;

type UserData = {
    _id: string;
    name: string;
    username: string;
    image?: string;
    email: string;
    phone: string;
    password: string;
};

interface AccountDetailsProps {
    userData: UserData | null;
    selectedFile: File | null;
    onFileUpload: (newAvatarUrl: string) => void;
}

const inputStyle = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'var(--border)',
        },
        '&:hover fieldset': {
            borderColor: 'var(--hover)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--focus)',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'var(--muted)',
    },
    '& .MuiInputBase-input': {
        color: 'var(--foreground)',
    },
    '& .MuiFormHelperText-root': {
        color: 'var(--error,#d32f2f)',
    },
}; 

export default function AccountDetails({ userData, selectedFile, onFileUpload }: AccountDetailsProps) {
    const { control, handleSubmit, formState: { errors }, reset, trigger } = useForm<AccountFormValues>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: userData?.name || "",
            username: userData?.username || "",
            email: userData?.email || "",
            phone: userData?.phone || "",
        }
    });

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { refreshUser } = useUser();

    // Update form data when userData changes
    useEffect(() => {
        if (userData) {
            reset({
                name: userData.name || "",
                username: userData.username || "",
                email: userData.email || "",
                phone: userData.phone || "",
            });
            
            if (userData.image) {
                setImageUrl(userData.image);
            }
        }
    }, [userData , reset]);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Function to upload image to Cloudinary
    const uploadImageToCloudinary = async (base64Image: string): Promise<string> => {
        try {
            const uploadRes = await fetch('/api/uploadImage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: base64Image }),
            });

            if (!uploadRes.ok) {
                throw new Error('Failed to upload image');
            }

            const uploadData = await uploadRes.json();
            return uploadData.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const onSubmit = async (data: AccountFormValues) => {
        setLoading(true);
    
        try {
            let finalImageUrl: string | null = imageUrl;
            
            if (!finalImageUrl && userData?.image) {
                finalImageUrl = userData.image;
            }
    
            // If there's a selected file, upload it first
            if (selectedFile) {
                const base64Image = await convertToBase64(selectedFile);
                const uploadedUrl = await uploadImageToCloudinary(base64Image);
                
                // Set the final image URL to the uploaded one
                finalImageUrl = uploadedUrl;
                
                // Update parent component with new image URL
                onFileUpload(uploadedUrl);
            }
    
            const imageUrlForApi = finalImageUrl || null;
            
            const response = await fetch(`/api/user?id=${userData?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userData?._id,
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    image: imageUrlForApi,
                }),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                toast.success('User information updated successfully!');
                refreshUser();
                
                if (finalImageUrl) {
                    setImageUrl(finalImageUrl);
                }
            } else {
                const errorData = await response.json();
                console.error('Error updating user:', errorData.error);
                toast.error(`Error updating user: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ p: 4, backgroundColor: "var(--background)", border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Box>
                    <Typography variant="h5" sx={{ mb: 3, color: "var(--foreground)" }}>
                        Account Details
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    sx={inputStyle}
                                    onBlur={() => trigger("name")}
                                />
                            )}
                        />

                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Username"
                                    fullWidth
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                    sx={inputStyle}
                                    onBlur={() => trigger("username")}
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    sx={inputStyle}
                                    onBlur={() => trigger("email")}
                                />
                            )}
                        />
                        
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone Number"
                                    fullWidth
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                    sx={inputStyle}
                                    onBlur={() => trigger("phone")}
                                />
                            )}
                        />
                    </Box>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    sx={{
                        width: { xs: "100%", md: "auto" },
                        alignSelf: { md: "flex-start" },
                        bgcolor: "var(--primary)",
                        color: "var(--light)",
                        '&:hover': {
                            bgcolor: "var(--accent)",
                        },
                    }}
                >
                    {loading ? 'Saving...' : 'Save changes'}
                </Button>
            </Box>
        </form>
    </Card>
    );
}
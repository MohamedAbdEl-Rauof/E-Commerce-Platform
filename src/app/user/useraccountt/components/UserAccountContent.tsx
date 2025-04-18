"use client";
import React, { useEffect, useRef, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    CircularProgress
} from '@mui/material';
import { FaMapMarkerAlt, FaPencilAlt, FaShoppingBag, FaSignOutAlt, FaUser } from 'react-icons/fa';
import AccountDetails from './AccountDetails';
import AddressDetails from './AddressDetails';
import OrderDetails from './OrderDetails';

type UserData = {
    _id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    image?: string;
};

type ComponentProps = {
    userData: UserData | null;
    selectedFile?: File | null;
    onFileUpload?: (newAvatarUrl: string) => void;
};

const menuItems = [
    {
        label: 'Account',
        icon: FaUser,
        component: (props: ComponentProps) => <AccountDetails
            userData={props.userData}
            selectedFile={props.selectedFile || null}
            onFileUpload={props.onFileUpload || (() => { })}
        />
    },
    { label: 'Address', icon: FaMapMarkerAlt, component: AddressDetails },
    { label: 'Orders', icon: FaShoppingBag, component: OrderDetails },
];

function UserAccountContent() {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const [userData, setUserData] = useState<UserData | null>(null);
    const [avatarSrc, setAvatarSrc] = useState<string>("");
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [activeTab, setActiveTab] = useState('Account');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/user?id=${userId}`);
                const data = await response.json();
                setUserData(data);
                // If user has an image, set it as avatar source
                if (data && data.image) {
                    setAvatarSrc(data.image);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [userId]);

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const base64Image = fileReader.result as string;
                setAvatarSrc(base64Image);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleLogout = async () => {
        await signOut({ redirect: false });
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Logged Out Done",
            showConfirmButton: false,
            timer: 1500,
        });
        router.push("/user/home");
    };

    const ActiveComponent = menuItems.find(item => item.label === activeTab)?.component || null;

    return (
        <Box>
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
                    My Account
                </Typography>

                {isLoading ?
                    (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '50vh'
                        }}>
                            <CircularProgress size={60} sx={{ color: 'var(--primary)' }} />
                            <Typography sx={{ mt: 3, color: 'var(--muted)' }}>
                                Loading your account information...
                            </Typography>
                        </Box>
                    ) : (<Grid container spacing={4} sx={{ maxWidth: 1200, mx: "auto" }}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{
                                p: 3,
                                bgcolor: "var(--background)",
                                border: '1px solid var(--border)',
                                boxShadow: 'var(--shadow)'
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    mb: 4,
                                }}>
                                    <Box sx={{ position: "relative" }}>
                                        <Avatar src={avatarSrc} alt="Avatar" sx={{ width: 96, height: 96 }} />
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                right: 0,
                                                bgcolor: "var(--primary)",
                                                color: "var(--light)",
                                                boxShadow: "var(--shadow)",
                                                '&:hover': {
                                                    bgcolor: "var(--accent)",
                                                },
                                            }}
                                            onClick={handleIconClick}
                                        >
                                            <FaPencilAlt size={14} />
                                        </IconButton>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleFileChange}
                                        />
                                    </Box>
                                    <Typography variant="h6" sx={{ mt: 2, color: "var(--foreground)" }}>
                                        {userData ? userData.name : "Loading..."}
                                    </Typography>
                                </Box>

                                <List sx={{ p: 0, mt: 3 }}>
                                    {menuItems.map((item) => (
                                        <ListItem
                                            key={item.label}
                                            button
                                            onClick={() => setActiveTab(item.label)}
                                            sx={{
                                                borderRadius: 2,
                                                mb: 1,
                                                bgcolor: activeTab === item.label
                                                    ? 'var(--hover)'
                                                    : 'transparent',
                                                color: activeTab === item.label
                                                    ? 'var(--primary)'
                                                    : 'var(--foreground)',
                                                '&:hover': {
                                                    bgcolor: 'var(--hover)',
                                                },
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    color: activeTab === item.label
                                                        ? 'var(--primary)'
                                                        : 'var(--muted)',
                                                    minWidth: '40px'
                                                }}
                                            >
                                                <item.icon size={20} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.label}
                                                primaryTypographyProps={{
                                                    fontWeight: activeTab === item.label ? 600 : 400
                                                }}
                                            />
                                        </ListItem>
                                    ))}

                                    <Button
                                        startIcon={<FaSignOutAlt />}
                                        fullWidth
                                        onClick={handleLogout}
                                        sx={{
                                            justifyContent: "flex-start",
                                            pl: 2,
                                            mt: 2,
                                            py: 1,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            fontWeight: 500,
                                            bgcolor: "var(--danger-light)",
                                            color: "var(--danger)",
                                            '&:hover': {
                                                bgcolor: "var(--danger)",
                                                color: "var(--light)",
                                            },
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        Log Out
                                    </Button>
                                </List>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Card >
                                {ActiveComponent &&
                                    <ActiveComponent
                                        userData={userData}
                                        selectedFile={selectedFile}
                                        onFileUpload={(newAvatarUrl: string) => {
                                            setAvatarSrc(newAvatarUrl);
                                            setSelectedFile(null);
                                        }}
                                    />
                                }
                            </Card>
                        </Grid>
                    </Grid>
                    )
                }
            </Container>
        </Box>
    );
}

export default UserAccountContent;
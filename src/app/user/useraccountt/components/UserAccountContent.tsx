"use client";
import React, {useEffect, useRef, useState} from 'react';
import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
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
    Typography
} from '@mui/material';
import {FaMapMarkerAlt, FaPencilAlt, FaShoppingBag, FaSignOutAlt, FaUser} from 'react-icons/fa';
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

};

type ComponentProps = {
    userData: UserData | null;
};

const menuItems = [
    {
        label: 'Account',
        icon: FaUser,
        component: (props: ComponentProps) => <AccountDetails userData={props.userData} file={props.file}/>
    },
    {label: 'Address', icon: FaMapMarkerAlt, component: AddressDetails},
    {label: 'Orders', icon: FaShoppingBag, component: OrderDetails},
];

function UserAccountContent() {
    const {data: session} = useSession();
    const userId = session?.user?.id || "";
    const [userData, setUserData] = useState<UserData | null>(null);
    const [avatarSrc, setAvatarSrc] = useState<string>("");
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [activeTab, setActiveTab] = useState('Account');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/user?id=${userId}`);
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
        if (typeof window !== "undefined") {
            const savedAvatar = localStorage.getItem("avatar");
            if (savedAvatar) {
                setAvatarSrc(savedAvatar);
            }
        }
    }, []);

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
                localStorage.setItem("avatar", base64Image);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleLogout = async () => {
        await signOut({redirect: false});
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
            <Container maxWidth="lg" sx={{py: 8}}>
                <Typography variant="h2" align="center" gutterBottom sx={{mb: 6}}>
                    My Account
                </Typography>

                <Grid container spacing={4} sx={{maxWidth: 1200, mx: "auto"}}>
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
                                <Box sx={{position: "relative"}}>
                                    <Avatar src={avatarSrc} alt="Avatar" sx={{width: 96, height: 96}}/>
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
                                        <FaPencilAlt size={14}/>
                                    </IconButton>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        style={{display: "none"}}
                                        onChange={handleFileChange}
                                    />
                                </Box>
                                <Typography variant="h6" sx={{mt: 2, color: "var(--foreground)"}}>
                                    {userData ? userData.name : "Loading..."}
                                </Typography>
                            </Box>

                            <List sx={{p: 0}}>
                                {menuItems.map((item) => (
                                    <ListItem
                                        key={item.label}
                                        button
                                        onClick={() => setActiveTab(item.label)}
                                        sx={{
                                            borderRadius: 2,
                                            mb: 1,
                                            bgcolor: activeTab === item.label ? 'var(--hover)' : 'transparent',
                                            color: activeTab === item.label ? 'var(--primary)' : 'inherit',
                                            '&:hover': {
                                                bgcolor: 'var(--hover)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{color: 'inherit'}}>
                                            <item.icon size={20}/>
                                        </ListItemIcon>
                                        <ListItemText primary={item.label}/>
                                    </ListItem>
                                ))}

                                <Button
                                    startIcon={<FaSignOutAlt/>}
                                    color="error"
                                    fullWidth
                                    onClick={handleLogout}
                                    sx={{
                                        justifyContent: "flex-start",
                                        pl: 2,
                                        mt: 1,
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontWeight: 500,
                                        bgcolor: "var(--danger)",
                                        color: "var(--light)",
                                        '&:hover': {
                                            bgcolor: "var(--danger)",
                                            opacity: 0.9,
                                        },
                                    }}
                                >
                                    Log Out
                                </Button>
                            </List>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card sx={{
                            p: 3,
                            bgcolor: "var(--background)",
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow)'
                        }}>
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
            </Container>
        </Box>
    );
}

export default UserAccountContent;
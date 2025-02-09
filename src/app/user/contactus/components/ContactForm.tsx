"use client";
import React, {useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import {useTheme} from 'next-themes';

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const {theme} = useTheme();
    const isDarkTheme = theme === 'dark';

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !message) {
            toast.warning("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.warning("Please enter a valid email address.");
            return;
        }

        const templateParams = {
            to_name: "3legant Website Owner",
            from_name: name,
            from_email: email,
            message: message,
        };

        emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID
            )
            .then(
                (result) => {
                    console.log(result.text);
                    toast.success("Email sent successfully! We will contact you soon.");
                },
                (error) => {
                    console.log(error.text);
                    toast.error("Failed to send email. Please try again later.");
                }
            );

        setName("");
        setEmail("");
        setMessage("");
    };

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'var(--foreground)',
            },
            '&:hover fieldset': {
                borderColor: 'var(--primary)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--primary)',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--foreground)',
        },
        '& .MuiInputBase-input': {
            color: 'var(--foreground)',
        },
    };

    return (
        <Box component="form" onSubmit={sendEmail} display="flex" flexDirection="column" gap={3}>
            <TextField
                id="outlined-name"
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={inputStyles}
            />
            <TextField
                id="outlined-email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={inputStyles}
            />
            <TextField
                id="outlined-message"
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={inputStyles}
            />
            <Button
                variant="contained"
                sx={{
                    bgcolor: 'var(--primary)',
                    color: 'var(--text-on-image)',
                    width: '11rem',
                    borderRadius: 2,
                    '&:hover': {
                        bgcolor: 'var(--secondary)',
                    },
                    transition: 'background-color 0.3s ease',
                }}
                type="submit"
            >
                Send Message
            </Button>
            <ToastContainer position="top-right" theme={isDarkTheme ? 'dark' : 'light'}/>
        </Box>
    );
}

export default ContactForm;
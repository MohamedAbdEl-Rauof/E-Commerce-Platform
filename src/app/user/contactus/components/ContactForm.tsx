import {Button, TextField} from "@mui/material";
import {useState} from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !message) {
            Swal.fire({
                title: "Validation Error",
                text: "Please fill in all fields.",
                icon: "warning",
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                title: "Invalid Email",
                text: "Please enter a valid email address.",
                icon: "warning",
            });
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
                "service_epqgw1w",
                "template_2fuqx7u",
                templateParams,
                "aDEejrGXwbo4CekBo"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    Swal.fire({
                        title: "Email sent successfully!",
                        text: "We will contact you soon.",
                        icon: "success",
                    });
                },
                (error) => {
                    console.log(error.text);
                    Swal.fire({
                        title: "Failed to send email",
                        text: "Please try again later.",
                        icon: "error",
                    });
                }
            );

        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <form onSubmit={sendEmail} className="flex flex-col gap-4">
            <TextField
                id="outlined-name"
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                id="outlined-email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            />
            <Button
                variant="contained"
                className="!bg-black !text-white w-44 hover:bg-gray-800"
                type="submit"
            >
                Send Message
            </Button>
        </form>
    );
};

export default ContactForm;
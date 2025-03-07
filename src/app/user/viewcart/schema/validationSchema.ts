import {custom, object, pipe, string} from "valibot";

export const schema = object({
    firstName: pipe(
        string(),
        custom(
            (value) => (value as string).trim() !== "",
            "First Name is required",
        ),
        custom(
            (value) => /^[A-Za-z\s]+$/.test(value as string),
            "First Name must not contain numbers or special characters",
        ),
    ),
    lastName: pipe(
        string(),
        custom((value) => (value as string).trim() !== "", "Last Name is required"),
        custom(
            (value) => /^[A-Za-z\s]+$/.test(value as string),
            "Last Name must not contain numbers or special characters",
        ),
    ),
    phoneNumber: pipe(
        string(),
        custom(
            (value) => (value as string).trim() !== "",
            "Phone Number is required",
        ),
        custom(
            (value) => /^\+?[0-9]{10,14}$/.test(value as string),
            "Please enter a valid phone number",
        ),
    ),
    emailAddress: pipe(
        string(),
        custom((value) => (value as string).trim() !== "", "Email is required"),
        custom(
            (value) =>
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value as string),
            "Please enter a valid email address",
        ),
    ),
    streetAddress: pipe(
        string(),
        custom(
            (value) => (value as string).trim() !== "",
            "Street Address is required",
        ),
    ),
    country: pipe(
        string(),
        custom((value) => (value as string).trim() !== "", "Country is required"),
    ),
    city: pipe(
        string(),
        custom((value) => (value as string).trim() !== "", "City is required"),
    ),
    state: pipe(
        string(),
        custom((value) => (value as string).trim() !== "", "State is required"),
    ),
    zipCode: pipe(
        string(),
        custom((value) => (value as string).trim() !== "", "Zip Code is required"),
    ),
    cardNumber: pipe(
        string(),
        custom(
            (value) => /^\d{16}$/.test(value as string),
            "Invalid card number - must be 16 digits",
        ),
    ),
    expirationDate: pipe(
        string(),
        custom(
            (value) => (value as string).trim() !== "",
            "Expiration Date is required",
        ),
    ),
    cvc: pipe(
        string(),
        custom(
            (value) => /^\d{3}$/.test(value as string),
            "Invalid CVC - must be 3 digits",
        ),
    ),
});

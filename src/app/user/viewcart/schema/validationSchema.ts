import { z } from "zod";

// Define the schema
export const schema = z.object({
    firstName: z.string()
        .min(2, "First name must be at least 2 characters")
        .max(10, "First name cannot exceed 10 characters")
        .regex(/^[A-Za-z\s]+$/, "First name should only contain letters"),

    lastName: z.string()
        .min(2, "Last name must be at least 2 characters")
        .max(10, "Last name cannot exceed 10 characters")
        .regex(/^[A-Za-z\s]+$/, "Last name should only contain letters"),

    phoneNumber: z.string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits")
        .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),

    emailAddress: z.string()
        .email("Please enter a valid email address")
        .max(30, "Email address cannot exceed 30 characters")
        .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i, "Please enter a valid email address"),

    streetAddress: z.string()
        .min(5, "Street address must be at least 5 characters")
        .max(20, "Street address cannot exceed 20 characters"),

    country: z.string()
        .min(2, "Country must be at least 2 characters")
        .max(20, "Country cannot exceed 20 characters"),

    city: z.string()
        .min(2, "City must be at least 2 characters")
        .max(20, "City cannot exceed 20 characters"),

    state: z.string()
        .min(2, "State must be at least 2 characters")
        .max(20, "State cannot exceed 20 characters"),

    zipCode: z.string()
        .min(4, "Zip code must be at least 4 characters")
        .max(10, "Zip code cannot exceed 10 characters")
        .regex(/^[0-9A-Za-z\s-]+$/, "Please enter a valid zip code"),

    paymentMethod: z.string()
        .min(1, "Please select a payment method"),

    cardNumber: z.string().optional(),
    expirationDate: z.string().optional(),
    cvc: z.string().optional(),
}).superRefine((data, ctx) => {

    if (data.paymentMethod === 'credit-card') {
        // Validate card number
        if (!data.cardNumber || data.cardNumber.trim() === '') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Card number is required for credit card payment",
                path: ['cardNumber']
            });
        } else if (data.cardNumber.length > 14) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Card number cannot exceed 14 digits",
                path: ['cardNumber']
            });
        } else if (!/^[0-9\s]+$/.test(data.cardNumber)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Card number should only contain digits",
                path: ['cardNumber']
            });
        }

        // Validate expiration date
        if (!data.expirationDate || data.expirationDate.trim() === '') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Expiration date is required for credit card payment",
                path: ['expirationDate']
            });
        } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(data.expirationDate)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Expiration date should be in MM/YY format",
                path: ['expirationDate']
            });
        }

        // Validate CVC
        if (!data.cvc || data.cvc.trim() === '') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "CVC is required for credit card payment",
                path: ['cvc']
            });
        } else if (data.cvc.length > 4) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "CVC cannot exceed 4 digits",
                path: ['cvc']
            });
        } else if (!/^[0-9]+$/.test(data.cvc)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "CVC should only contain digits",
                path: ['cvc']
            });
        }
    }
});

export type FormData = z.infer<typeof schema>;
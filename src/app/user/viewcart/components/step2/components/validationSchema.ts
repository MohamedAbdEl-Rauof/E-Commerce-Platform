import {email, maxLength, minLength, object, optional, string} from 'valibot';

export const schema = object({
    // Contact Information
    firstName: string([minLength(2, 'First name must be at least 2 characters'), maxLength(50, 'First name must not exceed 50 characters')]),
    lastName: string([minLength(2, 'Last name must be at least 2 characters'), maxLength(50, 'Last name must not exceed 50 characters')]),
    phoneNumber: string([minLength(10, 'Phone number must be at least 10 digits'), maxLength(15, 'Phone number must not exceed 15 digits')]),
    emailAddress: string([email('Please enter a valid email address')]),

    // Shipping Address
    streetAddress: string([minLength(5, 'Street address must be at least 5 characters'), maxLength(100, 'Street address must not exceed 100 characters')]),
    country: string([minLength(2, 'Country must be at least 2 characters'), maxLength(50, 'Country must not exceed 50 characters')]),
    city: string([minLength(2, 'City must be at least 2 characters'), maxLength(50, 'City must not exceed 50 characters')]),
    postalCode: string([minLength(4, 'Postal code must be at least 4 characters'), maxLength(10, 'Postal code must not exceed 10 characters')]),

    // Payment Method
    paymentMethod: string([minLength(1, 'Please select a payment method')]),
    cardNumber: optional(string([minLength(16, 'Card number must be 16 digits'), maxLength(16, 'Card number must be 16 digits')])),
    expirationDate: optional(string([minLength(5, 'Expiration date must be in MM/YY format'), maxLength(5, 'Expiration date must be in MM/YY format')])),
    cvc: optional(string([minLength(3, 'CVC must be 3 digits'), maxLength(4, 'CVC must not exceed 4 digits')])),
});
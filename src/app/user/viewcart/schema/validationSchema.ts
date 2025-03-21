import {object, string} from "valibot";

export const schema = object({
    firstName: string(),
    lastName: string(),
    phoneNumber: string(),
    emailAddress: string(),
    streetAddress: string(),
    country: string(),
    city: string(),
    state: string(),
    zipCode: string(),
    cardNumber: string(),
    expirationDate: string(),
    cvc: string(),
    paymentMethod: string(),
});
export interface UserData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    streetAddress: string;
    country: string;
    city: string;
    state: string; // Add this line
    zipCode: string; // Add this line
    postalCode: string;
    cardNumber?: string;
    expirationDate?: string;
    cvc?: string;
}
import React from 'react';
import Step3 from './components/Step3';
import { CartItem } from '../types';

interface Step3PageProps {
    cartItems: CartItem[];
}

const Step3Page: React.FC<Step3PageProps> = ({ cartItems }) => {
    return <Step3 cartItems={cartItems} />;
};

export default Step3Page;
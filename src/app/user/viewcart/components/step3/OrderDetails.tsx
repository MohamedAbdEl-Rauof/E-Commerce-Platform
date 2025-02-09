import React from 'react';

interface OrderDetailsProps {
    order: {
        orderCode: string;
        createdAt: string;
        shoppingandTotal: {
            Total: string;
        };
        paymentMethod: {
            method: string;
        };
    };
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => (
    <div className="mt-10 mb-10 justify-center flex space-x-24">
        <div className="text-left font-bold">
            <h1 className="text-gray-500 text-xl">Order Code:</h1>
            <h1 className="text-gray-500 text-xl">Date:</h1>
            <h1 className="text-gray-500 text-xl">Total:</h1>
            <h1 className="text-gray-500 text-xl">Payment Method:</h1>
        </div>
        <div className="text-left">
            <h1 className="text-xl font-semibold text-gray-800">
                {order.orderCode}
            </h1>
            <h1 className="text-xl font-semibold text-gray-800">
                {new Date(order.createdAt).toLocaleDateString()}
            </h1>
            <h1 className="text-xl font-semibold text-gray-800">
                {order.shoppingandTotal.Total}
            </h1>
            <h1 className="text-xl font-semibold text-gray-800">
                {order.paymentMethod.method}
            </h1>
        </div>
    </div>
);

export default OrderDetails;
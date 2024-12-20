import {
  CiCreditCard2,
  CiDeliveryTruck,
  CiLock,
  CiPhone,
} from "react-icons/ci";
import React from "react";

const ValuesSection = () => {
  return (
    <div className="mb-6 w-[90%] mx-auto">
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="flex flex-col items-center justify-center bg-[#F3F5F7] w-44 h-44 rounded-full p-4 text-center">
          <CiDeliveryTruck className="text-5xl text-gray-700 mb-2" />
          <h1 className="mt-2 font-bold text-base">Free Shipping</h1>
          <p className="text-sm text-gray-500">Order above $200</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#F3F5F7] w-44 h-44 rounded-full p-4 text-center">
          <CiCreditCard2 className="text-5xl text-gray-700 mb-2" />
          <h1 className="mt-2 font-bold text-base">Money-back</h1>
          <p className="text-sm text-gray-500">30 days guarantee</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#F3F5F7] w-44 h-44 rounded-full p-4 text-center">
          <CiLock className="text-5xl text-gray-700 mb-2" />
          <h1 className="mt-2 font-bold text-base">Secure Payments</h1>
          <p className="text-sm text-gray-500">Secured by Stripe</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#F3F5F7] w-44 h-44 rounded-full p-4 text-center">
          <CiPhone className="text-5xl text-gray-700 mb-2" />
          <h1 className="mt-2 font-bold text-base">24/7 Support</h1>
          <p className="text-sm text-gray-500">Phone and Email support</p>
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;

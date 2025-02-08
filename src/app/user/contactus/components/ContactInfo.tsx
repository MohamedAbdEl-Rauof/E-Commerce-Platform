import {FaRegAddressCard} from "react-icons/fa6";
import {CiPhone} from "react-icons/ci";
import {MdOutlineEmail} from "react-icons/md";

const ContactInfo = () => {
    return (
        <div
            className="flex flex-col md:flex-row mt-10 space-y-8 md:space-y-0 md:space-x-8 justify-center items-center w-full">
            <div className="bg-gray-100 w-64 h-48 p-6 rounded-lg flex flex-col items-center text-center space-y-3">
                <FaRegAddressCard className="text-4xl text-black"/>
                <h2 className="text-xl font-semibold">ADDRESS</h2>
                <p className="text-gray-600 text-sm md:text-base">
                    234 Arish Haram, Giza, Egypt
                </p>
            </div>

            <div className="bg-gray-100 w-64 h-48 p-6 rounded-lg flex flex-col items-center text-center space-y-3">
                <CiPhone className="text-4xl text-black"/>
                <h1 className="text-xl font-semibold">Contact Us</h1>
                <p className="text-gray-600 text-sm md:text-base">
                    +20 15 538 59825
                </p>
            </div>

            <div className="bg-gray-100 w-64 h-48 p-6 rounded-lg flex flex-col items-center text-center space-y-3">
                <MdOutlineEmail className="text-4xl text-black"/>
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="text-gray-600 text-sm md:text-sm lg:text-sm">
                    mohamedabdelrauof112@gmail.com
                </p>
            </div>
        </div>
    );
};

export default ContactInfo;
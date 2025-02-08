"use client";
import {Suspense} from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import AboutSection from "./components/AboutSection";

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import('./components/Map/index'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">Loading Map...</div>
});

const ContactUs = () => {
    return (
        <div>
            <div className="w-[90%] mx-auto">
                {/* Breadcrumb Section */}
                <div className="mt-6 md:mt-14 flex space-x-2 font-bold text-gray-400 text-lg md:text-xl">
                    <Link href="/user/home">
                        <span>Home</span>
                    </Link>
                    <span>{">"}</span>
                    <span className="text-gray-600">Contact US</span>
                </div>

                {/* Intro Section */}
                <div className="mt-10 md:mt-14">
                    <div className="md:w-[70%] space-y-6 md:space-y-9">
                        <h1 className="font-bold text-xl sm:text-5xl md:text-2xl lg:text-4xl">
                            We believe in sustainable decor. We&#39;re passionate about life at home.
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600">
                            Our features timeless furniture, with natural fabrics, curved
                            lines, plenty of mirrors and classic design, which can be
                            incorporated into any decor project. The pieces enchant for their
                            sobriety, to last for generations, faithful to the shapes of each
                            period, with a touch of the present.
                        </p>
                    </div>
                </div>

                <AboutSection/>

                <div className="mt-14">
                    <div className="flex justify-center">
                        <h1 className="text-5xl md:text-4xl font-bold text-center">
                            Contact Us
                        </h1>
                    </div>

                    <ContactInfo/>

                    <div className="mt-20 flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
                        <div className="flex-1">
                            <ContactForm/>
                        </div>

                        <div className="flex-1">
                            <Suspense fallback={<div
                                className="h-[400px] w-full bg-gray-100 flex items-center justify-center">Loading
                                Map...</div>}>
                                <Map/>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
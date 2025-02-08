import React from "react";
import {Footer as FlowbiteFooter} from "flowbite-react";
import {BsFacebook, BsGithub, BsLinkedin} from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
    return (
        <FlowbiteFooter container className="w-full p-0 ">
            <div className="w-full pt-20 pb-16 bg-black text-white px-6 sm:px-16 md:px-24">
                <div
                    className="flex flex-col sm:flex-row w-full sm:justify-between md:grid-cols-1 space-y-8 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-4 text-white">
                        <h1 className="text-3xl">3𝓵𝓮𝓰𝓪𝓷𝓽</h1>

                        <div className="hidden sm:block border-l-2 border-gray-300 h-6"></div>
                        <p>Gift & Decoration Store</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-white text-center sm:text-left">
                        <Link href="/pages/Home" passHref>
                            <FlowbiteFooter.Title
                                title="Home"
                                className="text-white cursor-pointer sm:pt-8"
                            />
                        </Link>
                        <Link href="/pages/Shop" passHref>
                            <FlowbiteFooter.Title
                                title="Shop"
                                className="text-white cursor-pointer sm:pt-8"
                            />
                        </Link>
                        <Link href="/pages/Categories" passHref>
                            <FlowbiteFooter.Title
                                title="Categories"
                                className="text-white cursor-pointer sm:pt-8"
                            />
                        </Link>
                        <Link href="/pages/ContactUs" passHref>
                            <FlowbiteFooter.Title
                                title="Contact Us"
                                className="text-white cursor-pointer sm:pt-8"
                            />
                        </Link>
                    </div>
                </div>

                <hr className="my-4 border-gray-300 mt-16"/>

                <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-white space-y-4 sm:space-y-0 mt-10">
                    {/* Left Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h1 className="sm:text-base md:text-base">
                            Copyright © 2025 3legant. All rights reserved
                        </h1>
                        <div className="flex space-x-5">
                            <a href="#" className="text-white font-extrabold">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-white font-extrabold">
                                Terms of Use
                            </a>
                        </div>
                    </div>

                    {/* Right Section with Social Media Links */}
                    <div className="flex w-full sm:w-auto justify-end space-x-6 text-white text-2xl">
                        <FlowbiteFooter.Icon
                            href="https://github.com/MohamedAbdEl-Rauof"
                            icon={BsGithub}
                            target="_blank"
                            className="cursor-pointer"
                        />
                        <FlowbiteFooter.Icon
                            href="https://linkedin.com/in/mohamed-abd-el-raouf-6b5b3b235"
                            icon={BsLinkedin}
                            target="_blank"
                            className="cursor-pointer"
                        />
                        <FlowbiteFooter.Icon
                            href="https://www.facebook.com/p/mohamed-abd-el-raouf-100040578035349/"
                            icon={BsFacebook}
                            target="_blank"
                            className="cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </FlowbiteFooter>
    );
};

export default Footer;

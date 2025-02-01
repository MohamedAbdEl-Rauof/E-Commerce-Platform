import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Banner: React.FC = () => {
    return (
        <section className="mt-14 relative h-[400px] rounded-xl overflow-hidden" aria-labelledby="banner-title">
            <Image
                src="/images/Paste Image (1).jpg"
                alt="Elegant interior design showcasing a modern living room"
                layout="fill"
                objectFit="cover"
                priority
                className="transform hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 flex flex-col items-center justify-center text-center"
            >
                <nav aria-label="Breadcrumb" className="mb-4">
                    <ol className="flex items-center space-x-2 text-white">
                        <li>
                            <Link href="/user" className="hover:text-gray-200 transition">
                                Home
                            </Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li aria-current="page" className="text-gray-300">Shop</li>
                    </ol>
                </nav>
                <h1 id="banner-title" className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Shop Page
                </h1>
                <p className="text-gray-200 max-w-2xl px-4">
                    Let&#39;s design the place you always imagined.
                </p>
            </div>
        </section>
    );
};

export default Banner;
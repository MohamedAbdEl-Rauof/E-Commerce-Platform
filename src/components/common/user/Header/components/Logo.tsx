import React from 'react';
import Link from 'next/link';

const Logo = () => (
    <Link href="/user">
        <h1 className="cursor-pointer hidden md:block">3𝓵𝓮𝓰𝓪𝓷𝓽</h1>
    </Link>
);

export default Logo;
'use client';

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/home');
    }, [router]);

    return <div>Redirecting to dashboard...</div>;
}
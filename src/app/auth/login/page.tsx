import LoginForm from '@/components/LoginForm';
import Image from 'next/image';
import React from 'react';

export default function Login() {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 border border-[var(--mkp-primary)] w-80">
            <Image
                src="/markiphy-logo.svg"
                alt="markiphy-logo"
                width={210}
                height={66}
                className="mb-6 mx-auto"
            />
            <LoginForm />
        </div>
    );
}

import Menu from '@/components/Menu';
import Image from 'next/image';
import React from 'react';

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const list = [
        {
            id: 1,
            icon: '/rabbit-icon.svg',
            label: 'Quick Action',
            href: '/dashboard/quick-action',
        },
        {
            id: 2,
            icon: '/shapes.svg',
            label: 'Control Panel',
            href: '#',
        },
    ];

    return (
        <>
            <header className="px-6 h-[86px]  flex justify-between">
                <Image
                    src="/markiphy-logo.svg"
                    alt="markiphy-logo"
                    width={210}
                    height={66}
                />

                <div className="flex items-center gap-3">
                    <Image
                        src="/profile-avatar.svg"
                        alt="profile-avatar"
                        width={36}
                        height={36}
                    />

                    <div>
                        <h1 className="text-[var(--mkp-text-primary)] ">
                            Saad Ziaul Hasan
                        </h1>
                        <span className="text-[var(--mkp-text-secondary)]">
                            Teacher
                        </span>
                    </div>
                </div>
            </header>
            <section className="flex">
                <aside className="bg-[var(--mkp-primary)] w-[260px] h-[calc(100dvh-86px)]">
                    <Menu list={list} />
                </aside>
                <main className="bg-[var(--mkp-background)] flex-1 pt-14">
                    <div className="max-w-[800px] mx-auto px-6">{children}</div>
                </main>
            </section>
        </>
    );
}

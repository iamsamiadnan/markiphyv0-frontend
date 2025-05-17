'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface List {
    id: number;
    icon: string;
    label: string;
    href: string;
}

export default function Menu({ list }: { list: List[] }) {
    const pathname = usePathname();

    console.log(pathname);
    return (
        <ul>
            {list.map((li) => (
                <li key={li.id}>
                    <Link
                        href="#"
                        className={`flex items-center gap-2 transition-colors text-white pl-[40px] h-16 hover:bg-[#6346b9] ${
                            li.href === pathname && 'bg-[#6346b9]'
                        }`}
                    >
                        <Image
                            src={li.icon}
                            width={24}
                            height={24}
                            alt={li.icon
                                .replace(/^\//, '')
                                .replace(/\.svg$/, '')}
                        />
                        <span>{li.label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

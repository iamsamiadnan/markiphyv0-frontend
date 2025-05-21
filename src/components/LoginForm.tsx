'use client';
import React from 'react';
import { Input } from './ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { Button } from './ui/button';
import Link from 'next/link';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
});

export default function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[var(--mkp-text-primary)]">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-none border-[var(--mkp-primary)]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                </div>

                <div className="mb-1">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[var(--mkp-text-primary)]">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-none border-[var(--mkp-primary)]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                </div>

                <Link
                    href="#"
                    className="text-[12px] text-[var(--mkp-text-accent)] mb-4 block text-right"
                >
                    Forget password?
                </Link>

                <Button
                    type="submit"
                    className="rounded-none bg-[var(--mkp-primary)] hover:bg-[var(--mkp-accent)] w-full mb-4"
                >
                    Login
                </Button>

                <Link
                    href="#"
                    className="text-[12px] text-[var(--mkp-text-accent)] block text-center"
                >
                    New to Markiphy? Register
                </Link>
            </form>
        </Form>
    );
}

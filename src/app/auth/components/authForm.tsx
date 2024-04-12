"use client"
import React, { FormEvent, useState } from 'react';
import axios from 'axios';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createCookie } from '../../cookieLib';
const authFormSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(4).max(50)
})


const AuthForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof authFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const email = values.email;
        const password = values.password;

        const config = {
            method: 'post',
            url: 'http://localhost:8888/auth/signin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                email,
                password,
            }),
        };

        try {
            const response = await axios.request(config);
            console.log(response.data);
            createCookie("token", response.data.token);
        } catch (error) {
            console.error(error);
        }

        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input placeholder="user emaill" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default AuthForm;

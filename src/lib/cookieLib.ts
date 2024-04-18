'use server'

import { cookies } from 'next/headers'

export async function createCookie(name: string, value: any) {
    cookies().set(name, value);
}
export async function getCookie(name: string) {
    const cookieStore = cookies()
    const token = cookieStore.get(name);
    console.log(token);
}
export async function deleteCookie(name: string) {
    const cookieStore = cookies()
    const token = cookieStore.delete("token");
    console.log(token);
}
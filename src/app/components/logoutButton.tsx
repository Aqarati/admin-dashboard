"use client"
import { deleteCookie } from '@/lib/cookieLib'
import React from 'react'

const LogoutButton = () => {
    return (
        <button onClick={() => deleteCookie("token")}>logout</button>
    )
}

export default LogoutButton
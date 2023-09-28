"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SecurityPage() {

    const router = useRouter();

    const [email, setEmail] = useState('');

    const changePassword = async() => {
        try {
            const res = await axios.post('/api/users/security', {email});
            router.push('/verifyemail')
        } catch (error:any) {
            console.log('Failed!', error.message);
        }
    }


    return(
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <h2 className="font-bold mb-3 text-xl">Forgot Password</h2>

            <label htmlFor="email">Enter your email</label>
            <input  className="p-1 text-sm rounded-md text-black"
                id="email" type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"/>

            <button className="text-sm bg-gray-400 font-bold text-lime-900 p-1 rounded-lg"
                onClick={changePassword}
            >
                Change password
            </button>
        </div>
    )
}
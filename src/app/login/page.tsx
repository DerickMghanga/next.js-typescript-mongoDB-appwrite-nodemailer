"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";  //correct  Import for useRouter
import axios from "axios";
import { useState } from "react";

export default function LogInPage() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });


    const onLogIn = async () => {

    }

    return (
        <div className=" bg-gray-900 flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-xl">Login</h1>
            <hr/>

            <label htmlFor="email" className="mt-2">Email</label>
            <input id="email" type="text" value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email" className="m-2 p-1 rounded-lg text-sm border text-black"
            />
        
            <label htmlFor="password" className="mt-2">Password</label>
            <input id="password" type="password" value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password" className="m-2 p-1 rounded-lg text-sm border text-black"
            />

            <button onClick={onLogIn} className="py-1 px-3 mt-2 bg-sky-700 rounded-lg">
                Login
            </button>

            <div className="flex gap-3 mt-7">
                <p>Not yet Registered?  </p>
                <Link href="/signup" className="text-blue-500 rounded-sm">Signup</Link>
            </div>
            

        </div>
    )
}
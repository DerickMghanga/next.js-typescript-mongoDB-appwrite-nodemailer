"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";  //correct  Import for useRouter
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const logInFailed = () => toast.error("Login failed! Enter email and Password!");

export default function LogInPage() {

    const [logInDisabled, setLogInDisabled] = useState(true); //disable login by default

    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const logIn = async () => {
        try {
            // add a Loading Spinner
            const response = await axios.post('/api/users/login', user);
            console.log("Login Success!", response.data);
            toast.success("Login successful!");
            router.push('/profile');
        } catch (error: any) {
            console.log("Login failed!", error.message);
            toast.error("Login Falied!");
        }
    }

    //Enable Login after all the details are entered
    useEffect(()=> {
        if(user.email.length > 0 && user.password.length > 0)  {
            setLogInDisabled(false);
        }
    }, [user]);

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

            <button onClick={logInDisabled ? logInFailed : logIn} className="py-1 px-3 mt-2 bg-sky-700 rounded-lg">
                Login
                <Toaster />
            </button>

            <div className="flex gap-3 mt-7">
                <p>Not yet Registered?  </p>
                <Link href="/signup" className="text-blue-500 rounded-sm">Signup</Link>
            </div>
            
            <div className="flex gap-3 mt-7">
                <p>Forgot password?  </p>
                <Link href="/security" className="text-blue-500 rounded-sm">Click here!</Link>
            </div>
            

        </div>
    )
}
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";  //correct  Import for useRouter
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

 // Toast Alert if No details are filled
const signUpFailed = () => toast.error("Signup failed! Fill in all your details");

export default function SignUpPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [signUpDisabled, setSignUpDisabled] = useState(true);  //Signup disabled by default

    const signUp = async () => {
        try {
            // add a Loading Spinner
            const response = await axios.post("/api/users/signup", user);
            // console.log("Signup success", response.data);

            toast.success(response.data.message);
            router.push('/login');  //push user to login page

        } catch (error:any) {
            console.log("Signup failed!", error.message);
            toast.error("Signup failed!");
        }
    }

    //Enable SignUp after all the details are entered
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setSignUpDisabled(false);
        }
    }, [user]);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-xl">Signup</h1>
            <hr/>

          
            <label htmlFor="username" className="mt-2">Username</label>
            <input id="username" type="text" value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username" className="m-2 p-1 rounded-lg text-sm border text-black"
            />

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

            <button onClick={signUpDisabled ? signUpFailed : signUp} className='py-1 px-3 mt-2 bg-sky-700 rounded-lg'>
                Signup
               <Toaster />
            </button>

            <div className="flex gap-3 mt-7">
                <p>Already registered? </p>
                <Link href="/login" className="text-blue-500 rounded-sm">Login</Link>
            </div>
            

        </div>
    )
}
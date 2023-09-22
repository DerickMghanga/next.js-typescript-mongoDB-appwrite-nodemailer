"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";  //correct  Import for useRouter
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function SignUpPage() {

    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const SignUp = async () => {
        try {
            
        } catch (error:any) {
            toast.error(error.message)
        } finally {
            //add a spinner loading
        }
    }

    //Alert if No details are filled
    function noSignUp() {
        alert("Make sure to fill all your details!");
    }

    //Enable button click after all details are entered
    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
      }

    }, [user])
    
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

            <button onClick={buttonDisabled ? noSignUp : SignUp} className={buttonDisabled ? 'py-1 px-3 mt-2 text-gray-400 bg-gray-600 rounded-lg': 'py-1 px-3 mt-2 bg-sky-700 rounded-lg'}>
               Signup
            </button>

            <div className="flex gap-3 mt-7">
                <p>Already registered? </p>
                <Link href="/login" className="text-blue-500 rounded-sm">Login</Link>
            </div>
            

        </div>
    )
}
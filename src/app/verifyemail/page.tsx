"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async() => {
        try {
            const res = await axios.post('/api/users/verifyemail', {token});
            toast.success(res.data.message);
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    //get Token from url
    useEffect(()=> {
        const urlToken = window.location.search.split("=")[1]; 
        setToken(urlToken);
    }, []);

    //if the token has been retrieved then run function 'verifyUserEmail()'
    useEffect(()=> {
        if (token?.length > 0) {  
            verifyUserEmail();
        }
    }, [token]);
 
    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen p-2">
            <h1 className="text-xl font-bold">Verify your email</h1>
            <Toaster />
            <h3 className="text-lime-400">{token ? `token confirmed!`: "We sent a verification link to your email. Kindly check"}</h3> 
            {/* Add a feature instead ie Spinner */}

            {verified && (
                <div>
                    <h2 className="m-3">Email Verified!</h2>

                    <Link href="/login" className="text-blue-600 rounded-md bg-white p-1 m-3">
                        Login
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2>Error! </h2>
                </div>
            )}
        </div>
    )
}
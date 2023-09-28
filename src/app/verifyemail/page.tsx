"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async() => {
        try {
            await axios.post('/api/users/verifyemail', {token});
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
        if (token.length > 0) {  
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div>
            
        </div>
    )
}
"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import {useState, useEffect} from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function ChangePasswordPage() {

    const router = useRouter();

    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const confirmPassword = async () => {
        try {
            const res = await axios.post('/api/users/changepassword', {token, password});
            toast.success(res.data.message);
            router.push('/login');
        } catch (error:any) {
            // console.log(error.response.data);
        }
    }

    //get token from url
    useEffect(()=> {
        const urlToken = window.location.search.split("=")[1]; 
        setToken(urlToken);
        // console.log(token);
    }, []);

    return(
        <div className="flex flex-col gap-3 items-center justify-center h-screen">
            <h1 className='text-xl font-bold'>Change Password</h1>

            <label htmlFor="password">Enter New Password</label>
            <input  className="p-1 text-sm rounded-md text-black"
                id="password" type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"/>

            <button className="text-sm bg-green-500 font-bold text-gray-900 p-1 rounded-lg"
                onClick={confirmPassword}
            >
                Change password
                <Toaster />
            </button>
        </div>
    )
}
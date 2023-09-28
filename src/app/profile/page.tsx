"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState} from "react";

import { Toaster, toast } from "react-hot-toast";

export default function ProfilePage() {

    const router = useRouter();

    const [userId, setUserId] = useState("");

    const logOut = async () => {
        try {
            const response = await axios.get('/api/users/logout');
            // console.log(response.data);

            toast.success(response.data.message);
            router.push('/login');   //got to Login once Logged out

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/userInfo'); //fetch user details from cookies(token)
        // console.log(res.data.userInfo);

        toast.success(res.data.message);
        setUserId(res.data.userInfo._id);
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>

            <p>Profile page </p>

            <h2 className="my-5">

                {userId === "" ? "No User Info!" :
                    <Link href={`/profile/${userId}`} className="underline">
                        User Info, Click here!
                    </Link>}

            </h2>

            <hr/>

            <button onClick={getUserDetails} className="bg-gray-400 text-black m-10 rounded-lg p-1 text-sm">
                Get User Details
                <Toaster />
            </button>
            <button onClick={logOut} className="bg-red-600 m-10 rounded-lg p-1 text-sm">
                Logout
                <Toaster />
            </button>
        </div>
    )
}
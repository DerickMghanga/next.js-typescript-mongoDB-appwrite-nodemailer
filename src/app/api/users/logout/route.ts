//Clears the Token of the user
import { NextResponse } from "next/server";

export async function GET(){

    try {
        // Create a Response that clears the cookies in the client
        const response = NextResponse.json({
            message: "Logout Successfull !",
            success: true,
        })

        response.cookies.set(
            "token",
            "",     // Set cookie token as empty
            {httpOnly: true, expires: new Date(0)},
        )

        return response;
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
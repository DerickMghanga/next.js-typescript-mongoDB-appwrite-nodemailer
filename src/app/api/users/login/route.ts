import {connect} from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";  //form next.js server
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        //check if the user exists or find the user
        const user = await User.findOne({email});
        if(!user) {   //If the user doesn't exist
            return NextResponse.json(
                {error: "User doesn't exist!"},
                {status: 400},
            );
        }

        // Check if the User Login password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {  //if password doesn't match
            return NextResponse.json({error: "Invalid Password"}, {status: 400});
        }

        //create data for User's token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        //create the token for the User
        const token = await jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!, // TypeScript compiler ignores the possibility of it being undefined
            {expiresIn: "1d"}
        );
        
        //set token to the User's cookie
        const response = NextResponse.json({   // NextResponse interacts with the cookies.
            message: "Login successfull!",     // Next.js documentation
            success: true,
        });
        response.cookies.set(
            "token",   //naming
            token,
            {httpOnly: true}
        );

        //Send to client
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
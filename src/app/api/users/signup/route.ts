import {connect} from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";  //form next.js server
import bcryptjs from "bcryptjs";  
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) { //handle the request

    try {
        const reqBody = await request.json();

        const {username, email, password} = reqBody;
        // console.log(reqBody);

        //Check if the user already exists
        const user = await User.findOne({email});
        if (user) {  // if the user exists
            return NextResponse.json({error: "Username already exists!"}, {status: 400});
        }

        //hash password(encrypt password)
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create a User in the database
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // console.log(newUser._id);

        //send verification email >> @helpers/mailer.ts
        await sendEmail({email, emailType: "VERIFY", userId: newUser._id})

        //send response to client
        return NextResponse.json({
            message: "User created successfully !",
            success: true,
            // newUser,
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
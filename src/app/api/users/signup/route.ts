import { mongooseConnect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";  //form next.js server
const bcryptjs = require('bcryptjs');   //correct way to import bcrypt

export async function POST(request: NextRequest, response: NextResponse) { //handle the request

    await mongooseConnect();  //connect to Db first

    try {
        const reqBody = await request.json();

        const {username, email, password} = reqBody;
        console.log(reqBody);

        //Check if the user already exists
        const user = await User.findOne({email});

        if (user) {  // if the user exists
            return NextResponse.json({error: "User already exists!"}, {status: 400});
        }

        //hash password(encrypt password)
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create a User in the database
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
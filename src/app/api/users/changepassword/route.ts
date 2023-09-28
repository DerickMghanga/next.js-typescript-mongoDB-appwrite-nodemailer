import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"; 

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        // console.log(reqBody);
    
        const {token, password} = reqBody;

        //Find the user using the token
        const user = await User.findOne({forgotPasswordToken:token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "User not found!"}, {status: 400});
        }

        // console.log(user);

        // Encrypt the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //update user info in the DB
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        //save to DB
        await user.save();

        //send to client
        return NextResponse.json({message: 'Password updated Successfully!', success: true});


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500});
    }
}
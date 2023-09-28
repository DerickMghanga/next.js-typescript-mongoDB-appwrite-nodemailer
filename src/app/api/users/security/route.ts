import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect(); //connect to DB

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();

        const {email} = reqBody;
        //console.log(reqBody);

        const user = await User.findOne({email});

        //if the user doesn't exist
        if (!user) {
            return NextResponse.json({error: 'User does not exist!'}, {status: 400})
        }

        //console.log(user._id);

        //send verification email >> @helpers/mailer.ts
        await sendEmail({email, emailType: "RESET", userId:user._id});

        //send to client
        return NextResponse.json({
            message: 'Email sent Successfully!',
            success: true,
        });

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500});
    }

}
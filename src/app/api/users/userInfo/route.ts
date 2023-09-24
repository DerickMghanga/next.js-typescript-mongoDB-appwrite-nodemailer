// Route to get user info from DB using the token in the request

import { getTokenData } from "@/helpers/getTokenData"; //use a helper (getTokenData.ts)
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect(); //connect to DB

export async function GET(request: NextRequest) {

    try {
        const userId = await getTokenData(request);

        const userInfo = await User.findOne({ _id:userId }).select("-password");  //select the fields you want.
                                                                                 // '-' removes the ones you dont want

        return NextResponse.json({
            message: "User found!",
            userInfo,
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});  // Bad Request
    }
}
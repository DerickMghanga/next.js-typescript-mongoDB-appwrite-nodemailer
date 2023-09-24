// Extract user Info from token
import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
    try {
        //get encoded token from the cookies
        const encodedToken = request.cookies.get('token')?.value || "";

        //decode the encoded token with users Info
        const decodedToken :any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
        // console.log(decodedToken);
        
        return decodedToken.id; // minor error Typescript compiler isn't sure if
                                // the id will be availble, added 'any' on decodedToken

    } catch (error:any) {
        throw new Error(error.message);
    }
}
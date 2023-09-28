import nodemailer from 'nodemailer';
import { User } from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { connect } from '@/dbConfig/dbConfig';

connect();  //connect to DB

//sends email either to Verify email(signup) or reset Password
export const sendEmail = async({email, emailType, userId}:any) => {

    try {
        //create a hashed token
        const hashedtoken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedtoken,
                verifyTokenExpiry: Date.now() + 3600000},
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedtoken,
                forgotPasswordTokenExpiry: Date.now() + 3600000},
            )
        }

        //create a transporter
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASSWORD
            }
        });

        //create mail options
        const mailOptions = {
            from: 'derickmghanga3329@gmail.com', //sender email(website email)
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your Password"}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}

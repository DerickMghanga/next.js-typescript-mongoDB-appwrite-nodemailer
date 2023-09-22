import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    usermame: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,  //by default the user is not verified.
    },
    isAdmin: {  //you can use 'role' word instead
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifiedToken: String,
    verifiedTokenExpiry: Date,
})

export const User = mongoose.models?.users || mongoose.model('User', userSchema);
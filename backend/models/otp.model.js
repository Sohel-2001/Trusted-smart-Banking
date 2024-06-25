import mongoose from "mongoose";


const otpStorageSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    pan: { type: String, required: true },
    age: { type: Number, required: true },
    address : {
        type : String,
        required : true
    },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },
    avatar: { type: String, required: true },
    verified: {
        type: Boolean,
        default: false,
    },
    resendAttempts: {
        type: Number,
        required: true,
        default: 0,
    },
    // expiresAt: { type: Date, required: true } // Automatically remove after 1 minute
    expiresAt: { type: Date, required: true, default: Date.now, index: { expires: '1m' } } // Automatically remove after 1 minute
});

export const OtpStorage = mongoose.model("OtpStorage",otpStorageSchema)
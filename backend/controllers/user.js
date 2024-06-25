import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { calculateAge, sendVerifyMail, sendcookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import { HomeLoan } from "../models/homeLoan.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {generateOTP,storeOTP,verifyOTP} from "../utils/otp.js"
import { OtpStorage } from "../models/otp.model.js";



export const getAllUsers = async(req,res) =>{

    const users = await User.find({});

    const only_users = users.filter(user => user.role == "user");

    res.json({
        only_users,
    })
}

export const login = async(req,res) =>{

    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({
            success : false,
            message : "Invalid email or password",
        })
    }


    const ismatch = await bcrypt.compare(password,user.password);
    // console.log(ismatch);

    if(!ismatch){
        return res.status(401).json({
            success : false,
            message : "Password not matched",
        })
    }

    sendcookie(user,res,201,`welcome back ${user.name}`);

}

export const register = async (req, res) => {
    const { name, email, password, phone,address, pan, birthDate, gender } = req.body;

    try {
        // Check if the user already exists in the main user database
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User email already exists",
            });
        }

        existingUser = await User.findOne({ phone });
        if(existingUser){

            return res.status(401).json({
                success: false,
                message: "User phone already exists",
            });
        }

        existingUser = await User.findOne({ pan });
        if(existingUser){

            return res.status(401).json({
                success: false,
                message: "User pan already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle avatar upload (assuming this is done in req.files)
        const avatarLocalPath = req.files?.avatar[0]?.path;
        if (!avatarLocalPath) {
            return res.status(401).json({
                success: false,
                message: "No avatarLocalPath found, please check again",
            });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
            return res.status(401).json({
                success: false,
                message: "No avatar found, please check again",
            });
        }

        // Generate OTP
        const otp = generateOTP();

        const age = calculateAge(birthDate);

        if (age < 18) {
            return res.status(401).json({
                success: false,
                message: "User must be at least 18 years old to register",
            });
        }

        // Store OTP and user data in otpStorage
        const otpStorageData = new OtpStorage({
            email,
            otp,
            name,
            password: hashedPassword, // Store hashed password
            phone,
            pan,
            address,
            age,
            birthDate,
            gender,
            avatar: avatar.url,
            resendAttempts : 0,
            expiresAt: Date.now() + 60 * 1000 // Set expiration time (1 minute)
        });

        await otpStorageData.save();

        // Send the OTP to the user's email
        await sendVerifyMail(name, email, otp);

        res.status(201).json({
            success: true,
            message: "OTP sent to email, please verify",
        });
    } catch (error) {
        console.error('Error during registration', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



export const verifyOTPController = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Fetch user data from OTP storage
        const otpStorageData = await OtpStorage.findOne({ email, otp });
        if (!otpStorageData) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP or OTP expired",
            });
        }

          // Check if the OTP has expired
          if (Date.now() > otpStorageData.expiresAt) {
            // console.log("otp expired");
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        // Hash the password (assuming it's stored in plain text in otpStorage, which should be improved)
        const hashedPassword = await bcrypt.hash(otpStorageData.password, 10);

        // Create the user in the main user database
        const userData = await User.create({
            name: otpStorageData.name,
            email: otpStorageData.email,
            password: otpStorageData.password,
            phone: otpStorageData.phone,
            avatar: otpStorageData.avatar,
            address : otpStorageData.address,
            pan: otpStorageData.pan,
            age: otpStorageData.age,
            birthDate: otpStorageData.birthDate,
            gender: otpStorageData.gender
        });

        // Remove the entry from otpStorage
        await OtpStorage.deleteOne({ email });

        // Send cookie with response
        sendcookie(userData, res, 201, "User registered successfully");

    } catch (error) {
        console.error('Error verifying OTP', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}



export const resendOTP = async(req,res) => {


    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        // Fetch user data from OTP storage
        const userData = await OtpStorage.findOne({ email });

        if (!userData) {
            return res.status(404).json({ success: false, message: 'OTP request not found or expired' });
        }

        if (userData.resendAttempts >= 5) {
            await OtpStorage.deleteOne({ email });
            return res.status(403).json({
                success: false,
                message: 'Maximum resend attempts reached. Please register again.',
            });
        }

        const otp = generateOTP();

        // Update the OTP in otpStorage
        userData.otp = otp;
        userData.expiresAt = Date.now() + 60 * 1000; // Reset expiry time
        userData.resendAttempts += 1;
        await userData.save();

        // Send the OTP to the user's email
        await sendVerifyMail(userData.name, email, otp);

        res.json({ success: true, message: 'OTP resent successfully' });
    } catch (error) {
        console.error('Error resending OTP', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }


}



export const getMyProfile = async(req,res) =>{

    const user = req.user;


    if(!user){
        res.status(401).json({
            success : false,
            message : "Login Now"
        })
    }

    if(user){

        
    if(user.balance <= 3000){
        user.CIBIL_score = 0
    }
    

    if(user.balance >= 3000 && user.balance <= 7000){
        user.CIBIL_score = 100
    }


    if(user.balance > 7000 && user.balance <= 17000){
        user.CIBIL_score = 250
    }

    if(user.balance > 17000 && user.balance <= 32000){
        user.CIBIL_score = 400
    }

    if(user.balance > 32000 && user.balance <= 45000){
        user.CIBIL_score = 450
    }

    if(user.balance > 45000 && user.balance <= 75000){
        user.CIBIL_score = 600
    }

    if(user.balance > 75000 && user.balance <= 100000){
        user.CIBIL_score = 800
    }

    if(user.balance > 100000){
        user.CIBIL_score = 900
    }

    await user.save();


    res.status(200).json({
        success : true,
        user : req.user
    })

    }

}


export const logout = (req,res) =>{

    res.status(200).cookie("token","",{
        expires : new Date(Date.now())
    })
    .json({
        succes : true
    })
}


export const addmoney = async(req,res) =>{

   const user = req.user;
//    console.log(user);

    const { money } = req.body;

    user.balance += Number(money);

    user.transfer_Hist.push(`Rs. ${money} credited by self on ${new Date(Date.now())}`);

    await user.save();


    res.json({
        user,
        message : `Credited Rs. ${money} Successfully`

    })

}

export const debitmoney = async(req,res) => {

    const user = req.user;

    const { debit } = req.body;

    if(debit > user.balance){
       return res.json({
            message : "You Dont Have that much money"
        })
    }

    user.balance -= Number(debit);

    user.transfer_Hist.push(`${debit} debited by self on ${new Date(Date.now())}`);
 
    
    await user.save();
    
    // console.log("moneyyyyyyyyyyyyyyyyyyyyy");
    res.json({
        user,
        message : `Debited Rs. ${debit} Successfully`
    })

}

export const transferMoney = async(req,res) =>{

    const user = req.user;

    const { email,money } = req.body;

    const Seconduser = await User.findOne({email : email});

    if(money > user.balance){
        return res.json({
            message : "You Dont Have that much money"
        })
    }

    user.balance -= Number(money);

    Seconduser.balance += Number(money);

    user.transfer_Hist.push(`${money} transferred to ${Seconduser.name} on ${new Date(Date.now())}`);
    Seconduser.transfer_Hist.push(`${money} received from ${user.name} on ${new Date(Date.now())}`);

    await user.save();

    await Seconduser.save();

    res.json({
        message : "Transfer Successful",
        Seconduser,
    })
}
 

export const findLoans = async(req,res) =>{
    const userid = req.user._id;

    const carLoans = await CarLoan.find({userId : userid});
    const homeLoans = await HomeLoan.find({userId : userid});
    const educationLoans = await EducationLoan.find({userId : userid});
    const personalLoans = await PersonalLoan.find({userId : userid});

    const final = [...carLoans,...homeLoans,...educationLoans,...personalLoans]

    res.status(200).json({
        final
    })
}


export const deleteUser = async(req,res) =>{

    const{ id } = req.body;

    const user = await User.findOne({_id : id});

    if(!user){
        return res.status(404).json({
            success : false,
            message : "Invalid Id!"
        })
    }

    await user.deleteOne();

    res.status(200).json({
        success : true,
        message : "User deleted"
    })

}



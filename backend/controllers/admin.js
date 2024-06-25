
import { HomeLoan } from "../models/homeLoan.js";
import bcrypt from "bcrypt";
import { sendcookie } from "../utils/features.js";
import { Admin } from "../models/admin.js";
import { User } from "../models/user.js";



export const getMyProfile = async(req,res) =>{

    const admin = req.admin;

    if(!admin){
        res.status(401).json({
            success : false,
            message : "Login Now"
        })
    }

    res.status(200).json({
        success : true,
        admin : req.admin
    })
}

export const approveUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.verified = true;
        await user.save();

        res.status(200).json({
            success: true,
            message: "User account verified successfully",
        });
    } catch (error) {
        console.error('Error approving user', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



export const adminregister = async(req,res) =>{

   
    const {name, email, password} = req.body;

    let admin = await Admin.findOne({ email });

    if(admin){
        return res.status(401).json({
            success : false,
            message : "admin already exist",
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    admin = await Admin.create({
        name,
        email,
        password : hashedPassword,
        // no_of_loans : user.
    })

    sendcookie(admin,res,201,"Registered Successfully");


}


export const adminLogin = async (req, res) => {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
        return res.status(401).json({
            message: "Invalid username or password"
        })
    }



        const ismatch = await bcrypt.compare(password, admin.password);

        if (!ismatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            })
        }



            sendcookie(admin, res, 201, `welcome back ${admin.name}`);




    }


export const adminUpdate = async (req, res) => {

    const { loanId, action } = req.body;
    // console.log("fff");

    try {

        // const loan = await Loan.findByIdAndUpdate(loanId, { status: action }, { new: true });
        const loan = await HomeLoan.findByIdAndUpdate(loanId, { status: action }, { new: true });

        res.json({
            loan
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: "error"
        })
    }
}
import { Loan } from "../models/loan.js";


export const loanReq = async(req,res) =>{

    const {amount} = req.body;
    // console.log("yes");

    try {

        const newLoan = await Loan.create({
            userId : req.user,
            amount : amount,
            status : "pending"
        });

        res.status(201).json({
            success : true,
            message : "Loan req Send",
            newLoan
        })
        
    } catch (error) {
        console.log(error);
        res.json("error");
    }
}


export const getAllLoans = async(req,res) =>{

    const loans = await Loan.find({});

    res.json({
        loans
    })
}
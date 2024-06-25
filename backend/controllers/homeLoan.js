
import { HomeLoan } from "../models/homeLoan.js"
import { User } from "../models/user.js"
import { AllLoan } from "../models/loan.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"


export const applyHomeLoan = async (req, res) => {

    const { user_name, D_O_B, address, phn, requested_amount, loan_period, loan_name } = req.body;

    if([user_name,D_O_B,address,phn,requested_amount,loan_period,loan_name].some((field) => field.trim() === "")){
        return res.status(401).json({
            message: "all fields are required",
        })

    }

    try {

        const user = req.user;

        console.log("1st check");

        if (user.no_of_loans == 2) {
            return res.status(401).json({
                message: "You already have 2 loans you can't apply for a 3rd loan now",
            })
        }

        if (user.balance < 5000) {
            return res.status(401).json({
                message: "You should atleast have 5000 in your account everytime"
            })
        }

        const IncomeCertificateLocalPath = req.files?.Income_Certificate[0]?.path;
        const BirthCertificateLocalPath = req.files?.Birth_Certificate[0]?.path;
        const PanCardLocalPath = req.files?.Pan_Card[0]?.path;
        const AdhaarCardLocalPath = req.files?.Adhaar_Card[0]?.path;

        console.log("2nd check");


        if (!IncomeCertificateLocalPath) {
            return res.status(401).json({
                success: false,
                message: "No IncomeCertificateLocalPath found plz check again",
            })
        }
        if (!BirthCertificateLocalPath) {
            return res.status(401).json({
                success: false,
                message: "No BirthCertificateLocalPath found plz check again",
            })
        }
        if (!PanCardLocalPath) {
            return res.status(401).json({
                success: false,
                message: "No PanCardLocalPath found plz check again",
            })
        }
        if (!AdhaarCardLocalPath) {
            return res.status(401).json({
                success: false,
                message: "No AdhaarCardLocalPath found plz check again",
            })
        }

        const Income_Certificate = await uploadOnCloudinary(IncomeCertificateLocalPath);


        if (!Income_Certificate) {
            return res.status(401).json({
                success: false,
                message: "No Income_Certificate found plz check again",
            })
        }

        console.log("3rd check");

        const Birth_Certificate = await uploadOnCloudinary(BirthCertificateLocalPath);


        if (!Birth_Certificate) {
            return res.status(401).json({
                success: false,
                message: "No Birth_Certificate found plz check again",
            })
        }
        const PanCard = await uploadOnCloudinary(PanCardLocalPath);


        if (!PanCard) {
            return res.status(401).json({
                success: false,
                message: "No PanCard found plz check again",
            })
        }

        const AdhaarCard = await uploadOnCloudinary(AdhaarCardLocalPath);


        if (!AdhaarCard) {
            return res.status(401).json({
                success: false,
                message: "No AdhaarCard found plz check again",
            })
        }

        console.log("4th check");


        const loan = await HomeLoan.create({
            // loan_name,
            user_name,
            D_O_B,
            address,
            phn,
            loan_name,
            requested_amount,
            loan_amount_pending: requested_amount,
            loan_period,
            Income_Certificate : Income_Certificate.url,
            Birth_Certificate : Birth_Certificate.url,
            Pan_Card : PanCard.url,
            Adhaar_Card : AdhaarCard.url,
            userId: req.user,
            user_Cibil: req.user.CIBIL_score
            // user_Cibil : Number(req.user.CIBIL_score)
        })



        user.pending_loans.push(loan);
        user.no_of_loans += 1;

        loan.total_EMI = requested_amount / loan_period;

        await loan.save();
        await user.save();

        res.status(201).json({
            message: "Thank You For applying, Your loan request has been successfully granted. We'll give you a message after some time. ",
            success: true,
            loan
        })


    } catch (error) {
        console.log(error);
        res.json({
            message: "error"
        })
    }


}



export const allHomeLoans = async (req, res) => {

    const homeLoans = await HomeLoan.find({});


    const loans = [...homeLoans]

    res.json({
        loans
    })
}


export const approveLoan = async (req, res) => {

    const { id } = req.body;

    const loan = await HomeLoan.findById(id);


    if (!loan) {
        return res.json({
            message: "No loan Found"
        })
    }

    if (loan.status === "accepted" || loan.status === "completed") {
        return res.json({
            message: "No loan Found"
        })
    }

    const userid = loan.userId;

    const user = await User.findById(userid);


    loan.status = "accepted";

    user.accepted_loans.push(loan);

    const pendingIndex = user.pending_loans.findIndex(pLoan => pLoan._id.toString() === loan._id.toString());

    if (pendingIndex !== -1) {
        user.pending_loans.splice(pendingIndex, 1)
    }


    await loan.save();
    await user.save();

    res.json({
        message: "Loan Approved",
    })
}


export const rejectLoan = async (req, res) => {

    const { id } = req.body;

    const loan = await HomeLoan.findById(id);


    const userid = loan.userId;

    const user = await User.findById(userid);
//
    loan.status = "rejected";

    const pendingIndex = user.pending_loans.findIndex(pLoan => pLoan._id.toString() === loan._id.toString());

    if (pendingIndex !== -1) {
        user.pending_loans.splice(pendingIndex, 1)
    }

    //

    // console.log(loan);

    await loan.deleteOne();
    await loan.save();
    await user.save();


    res.json({
        message: "Loan Rejected",
    })
}

export const payEmi = async (req, res) => {

    try {


        const { id, amount } = req.body;

        const user = req.user;

        const loan = await HomeLoan.findById(id);

        console.log('emi1');


        // console.log(user.completed_loans);

        if (loan.status == "pending" || loan.status == "completed") {
            return res.json({
                message: "Invalid Loan Id"
            })
        }

        if (amount > loan.requested_amount || amount > loan.loan_amount_pending) {
            return res.json({
                message: "Invalid Loan amount"
            })
        }

        console.log('emi2');




        if (amount <= loan.loan_amount_pending && loan.loan_amount_pending !== 0) {

            loan.loan_amount_paid += Number(amount);
            loan.loan_amount_pending = loan.loan_amount_pending - amount;
        }

        if (loan.loan_amount_pending === 0) {
            loan.status = "completed";
            user.completed_loans.push(loan);
            // AllLoan.loans.push(loan)
        }

        console.log('emi3');

        await loan.save();
        await user.save();

        res.json({
            message: "Emi payed",
        })

    } catch (error) {
        console.log(error);
    }

}
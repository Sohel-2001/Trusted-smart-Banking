import mongoose from "mongoose";


const schema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    loan_name : {
        type : String,
        required : true
    },

    user_name : {
        type : String,
        required : true, 
    },

    D_O_B : {
        type  : String,
    },

    address : {
        type : String,
    },

    phn : {
        type : Number,
    },

    Income_Certificate:{

        type : String,
        required : true,
    },
    Birth_Certificate:{

        type : String,
        required : true,
    },
    Pan_Card:{

        type : String,
        required : true,
    },
    Adhaar_Card:{

        type : String,
        required : true,
    },

    requested_amount : {
        type : Number,
        required : true
    },

    loan_amount_paid : {
        type : Number,
        default : 0
    },

    loan_amount_pending : {
        type : Number,
        default : 0,
    },

    total_EMI : {
        type : Number,
        default : 0,
    },

    loan_period : {
        type : Number,
        required : true
    },  

    user_Cibil : {
        type: Number,
        required : true,
    },


    status :{
        type : String,
        default : "pending"
    }
})

export const HomeLoan = mongoose.model("homeloan",schema);

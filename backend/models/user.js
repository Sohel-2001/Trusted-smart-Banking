import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    phone : {
        type : String,
        required : true
    },

    pan : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },

    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    birthDate : {
        type : Date,
        required : true
    },
    // birthDate : {
    //     type : Date,
    //     required : true
    // },

    balance : {
        type : Number,
        default : 0,
        min : 0,
    },

    password : {
        type : String,
        required : true,
        select : false
    },

    createdAt : {
        type : Date,
        default : Date.now,
    },

    no_of_loans : {
        type : Number,
        default : 0
    },

    CIBIL_score : {
        type : Number,
        default : 0,
        max : 900,
    },

    avatar : {
        type : String,
        required : true
    },

    completed_loans : {
        type : [],
    },

    accepted_loans : {
        type : [],
    },

    pending_loans : {
        type : [],
    },

    transfer_Hist : {
        type : [],
    },

    role : {
        type : String,
        default : "user"
    },
    verified: {
        type: Boolean,
        default: false,
    },
});

export const User = mongoose.model("user",schema);
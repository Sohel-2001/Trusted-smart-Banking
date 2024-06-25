import mongoose from "mongoose";



const schema = new mongoose.Schema({

    loans : {
        type : []
    }
})

export const AllLoan = mongoose.model("ALloan",schema);
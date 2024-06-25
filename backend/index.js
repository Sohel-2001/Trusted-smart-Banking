import express from "express";
import userRouter from "./routes/user.js"
import homeLoanRouter from "./routes/homeLoan.js"



import adminRouter from "./routes/admin.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

config({
    path : "./data/config.env",
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : ["http://localhost:5173","http://localhost:5174","https://cloudinary.com"],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}));
// app.use(cors({
//     origin : "http://localhost:5173",
//     methods : ["GET","POST","PUT","DELETE"],
//     credentials : true
// }));

app.use("/api/v1/users",userRouter);
app.use("/api/v1/admins",adminRouter);
app.use("/api/v1/Homeloans",homeLoanRouter);


// app.use("/api/v1/loans",loanRouter);




app.get("/" , (req,res) =>{
    res.send("nice");
})





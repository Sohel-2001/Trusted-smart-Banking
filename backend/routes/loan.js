import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getAllLoans, loanReq } from "../controllers/loan.js";

const router = express.Router();


router.post("/applyLoan",isAuthenticated,loanReq);

router.get("/allLoans",getAllLoans);

export default router;
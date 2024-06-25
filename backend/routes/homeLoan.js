
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { allHomeLoans, applyHomeLoan, approveLoan, payEmi, rejectLoan } from "../controllers/homeLoan.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/applyHomeLoan",isAuthenticated,upload.fields([
    {
        name :"Income_Certificate",
        maxCount : 1
    },
    {
        name :"Birth_Certificate",
        maxCount : 1
    },
    {
        name :"Pan_Card",
        maxCount : 1
    },
    {
        name :"Adhaar_Card",
        maxCount : 1
    }
]),applyHomeLoan);
router.get("/all",allHomeLoans);
router.put("/approve",approveLoan);
// router.put("/approve",isAuthenticated,approveLoan);
router.put("/reject",rejectLoan);
router.put("/reject",isAuthenticated,rejectLoan);
router.put("/emi",isAuthenticated,payEmi);


export default router;
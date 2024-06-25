import express from "express";
import { User } from "../models/user.js";
import { addmoney, debitmoney, deleteUser, findLoans, getAllUsers, getMyProfile, login, logout, register, resendOTP, transferMoney, verifyOTPController } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {  adminLogin, adminUpdate } from "../controllers/admin.js";
import {upload} from "../middlewares/multer.middleware.js"


const router = express.Router();

router.get("/all",getAllUsers)

 router.post("/new",
            upload.fields([
                {
                    name : "avatar",
                    maxCount : 1
                }
            ]),
            register)

router.post('/verify-otp', verifyOTPController);
router.post('/resend-otp', resendOTP);


 router.post("/login",login)

 router.get("/logout",logout)

 router.delete("/delete",deleteUser)

 router.get("/allLoans",isAuthenticated,findLoans)

 router.post("/adminlogin",adminLogin)
 
//  router.get("/adminlogin2",isAuthenticated,adminLogin2)

 router.post("/admin/action",isAuthenticated,adminUpdate);

 router.put("/credit",isAuthenticated,addmoney)

 router.put("/debit",isAuthenticated,debitmoney)

 router.post("/transfer",isAuthenticated,transferMoney);

 //through query
// router.get("/userid",getUserDetails2)

//dynamic id
router.get("/me",isAuthenticated,getMyProfile)
// router.get("/userid/:id",getMyProfile)

export default router;
import express from "express";
import { adminLogin, adminregister, approveUser, getMyProfile } from "../controllers/admin.js";
import { adminisAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/adminReg",adminregister);
router.post("/adminLogin",adminLogin);
router.post("/userApprove",approveUser);
// router.get("/me",getMyProfile)
router.get("/me",adminisAuthenticated,getMyProfile)



export default router;
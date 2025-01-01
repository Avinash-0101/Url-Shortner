import express  from "express";
import { handleUserSignup ,handleUserLogin,handleUserLogout} from "../controllers/user.js";
import {emailVerificationValidator} from "../controllers/verificationTokenValidator.js"
const router = express.Router();

router.post("/signUp", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/api/verifyEmail/:token",emailVerificationValidator)
router.get("/logout", handleUserLogout);
export default router;

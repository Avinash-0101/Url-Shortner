import express  from "express";
import { handleUserSignup ,handleUserLogin} from "../controllers/user.js";
const router = express.Router();

router.post("/signUp", handleUserSignup);
router.post("/login", handleUserLogin);

export default router;
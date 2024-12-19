import express from "express";
import {handleGenerateNewShortURL,handleGetAnaLytics} from "../controllers/url.js";
const router = express.Router();



router.post("/",handleGenerateNewShortURL);

router.get('/analytics/:shortId',handleGetAnaLytics)
export default router;


 
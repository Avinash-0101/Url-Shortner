import express from "express";
import URL from "../models/url.js";
const router = express.Router();


// Render home page for logged-in users with personalized URLs
router.get("/", async (req, res) => {
    try {
        // Ensure URLs are filtered for the logged-in user
        const urls = req.user ? await URL.find({ createdBy: req.user._id }) : [];
        
        return res.render("home", {
            urls, // Pass filtered URLs to the template
            user: req.user, // Pass user data for personalization
        });
    } catch (error) {
        console.error("Error fetching URLs in staticRouter:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/signup",(req,res) => {
    return res.render("signup");
        
});

router.get("/login",(req,res) => {
    return res.render("login");

});

router.get("/SignUpsuccessful",(req,res)=>{
    return res.render("signUpsuccesfull.ejs")
})


export default router;

import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import { connectToMongoDB } from "./connect.js";

import URL from "./models/url.js";
import path from "path";
 
import cookieParser from "cookie-parser";
import { restrictedToLoggedInUser,checkAuth } from "./middlewares/auth.js";

import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js"
import userRoute from "./routes/user.js"

const app = express();
const PORT =8002 || process.env.PORT;

connectToMongoDB()
.then(()=> console.log("mongodb connected"))
.catch((err) => console.log("Error connecting to MongoDB:", err));

// view engine
app.set("view engine","ejs");
app.set("views",path.resolve("./public"));



//middleware
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());



app.use("/url",restrictedToLoggedInUser,urlRoute);
app.use("/user",userRoute);
app.use("/",checkAuth,staticRoute);


// server side rendering
app.get('/test',restrictedToLoggedInUser,async (req,res)=>{
  const allUrls =await URL.find({});
  return res.render('home',{
    urls:allUrls,
  });
});






app.get('/url/:shortId', async (req, res) => {
    try {
      const shortId = req.params.shortId;
      const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timeStamp: Date.now() } } },
        { new: true } // This option returns the updated document
      );
  
      if (!entry) {
        return res.status(404).json({ error: 'URL not found' });
      }
  
      res.redirect(entry.redirectURL);
    } catch (error) {
      console.error("Error handling request:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(PORT,()=> console.log(`server started at PORT:${PORT}`))
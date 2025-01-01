import bcrypt from "bcrypt"; 
import User from "../models/user.js"
import { setUser } from "../service/auth.js";

export async function handleUserSignup(req,res){
    try{
        const{name,email,password,confirmPassword}=req.body;

        if(!name || !email || !password || !confirmPassword){
            return res.render("signup.ejs",{
              error: "Please fill all the boxes",
            });
        }
        const existingemail = await User.findOne({
          email: email,
        });
        
        if (existingemail) {
          return res.render("login.ejs", {
            error: "This email is already been used",
          });
        }

        
    // Check if passwords match
    if (password !== confirmPassword) {
        return res.render("signUp.ejs", {
          error: "Passwords do not match",
        });
      }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email,
        password:hashedPassword,
    });

    return res.redirect("/SignUpsuccessful");
} catch (error) {
  console.log("signup console error", error);
  return res.render("signUp.ejs", {
    error: "An error occurred during signup. Please try again.",
  });
}
    

}

export async function handleUserLogin(req,res){
    const{email,password}=req.body;
    try{
   const user= await User.findOne({  
        email,
        
    }).select("+password");
    if(!user)
        return res.render("login",
        {
            error:"Invalid username or Password"
        }
    );

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("login", {
        error: "Invalid username or password",
      });
    }

    console.log("user while login", user)

    const token=setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");

}catch (error) {
    console.log("login console error", error);
    return res.render("login", {
      error: "An error occurred during login. Please try again.",
    });
  }
}

export async function handleUserLogout(req,res){
try{
      res.clearCookie('uid',{
        httpOnly: true, // Ensures it's only accessible via HTTP
        sameSite: "strict",
    });
      console.log("user logged out");
      return res.redirect("/");
  }
  catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).send("An error occurred during logout.");
  }
}

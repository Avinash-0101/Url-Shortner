import User from "../models/user.js"
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../service/auth.js";

export async function handleUserSignup(req,res){
    try{
        const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    }
    catch (error){
        console.log("signup console error " ,error);
    }
    return res.render("home");
    

}

export async function handleUserLogin(req,res){
    const{email,password}=req.body;
   const user= await User.findOne({  
        email,
        password,
    });
    if(!user)
        return res.render("login",
        {
            error:"Invalid username or Password"
        }
    );

    const token=setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");

}
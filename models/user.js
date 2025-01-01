import mongoose from "mongoose";
import { generateVerificationEmailToken } from "../service/email_jwt_service.js"
import { sendVerificationEmail } from "../service/email_sending._service.js"

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    verified:{
        type:Boolean,
        default:false
    }
},    {timestamps:true}
);

userSchema.pre('save', async function(next) {
    if (this.isNew && !this.verified) {
  
      const verificationToken = generateVerificationEmailToken(this.email);
      this.verificationToken = verificationToken;
  
      await sendVerificationEmail(this.email, verificationToken);
    }
      
      next();
});


const User=mongoose.model("User",userSchema);
export default User;
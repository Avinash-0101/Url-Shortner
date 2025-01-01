import { verifyJWTEmail } from "../service/email_jwt_service.js";
import User from "../models/user.js"

async function emailVerificationValidator(req, res) {
  const token = req.params.token;
  
  const userToken = await verifyJWTEmail(token);

  if (!userToken) return res.json({ error: "Invalid Request" });

  const user = await User.findOne({ email: userToken.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.verified) {
    return res.status(400).json({ message: "User already verified" });
  }

  await userSchema.updateOne(
    { email: userToken.email },
    { $set: { verified: true } }
  );
  
  console.log("userschema",userSchema);
  return res.redirect("/login");
}

export { emailVerificationValidator };
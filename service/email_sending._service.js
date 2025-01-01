import { configDotenv } from "dotenv";
configDotenv();


import nodemailer from "nodemailer";


async function sendVerificationEmail(email, verificationToken) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.LOGIN_SMTP,
        pass: process.env.SMTP_KEY,
      },
    });

    const verificationLink = `https://url-shortner-5v48.onrender.com/api/verifyEmail/${verificationToken}`;
    const mail = {
      from: 'avinashburnwal21@gmail.com',
      to: email,
      subject: "Verify Your Email Address",
      text: `Please click the following link to verify your email address:\n${verificationLink}`,
      html: `<b>Please click the following link to verify your email address:</b><br><a href="${verificationLink}">${verificationLink}</a>`,
    };
    console.log("token in email verification", verificationToken)
    

    // Send email
    const info = await transporter.sendMail(mail);
    console.log(info)

  } catch (error) {
    res.render("/login",error)
  }
}


export {  sendVerificationEmail };

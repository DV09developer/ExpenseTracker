"use server"
import nodemailer from "nodemailer";
import pb from "../../../pocketbase";
export const sendOTP = async (emails: string) => {
const success = true;
    console.log("✅ sendOTP function called with:", emails);
  try {
    const userEmail =  emails;
    if (!userEmail) {
        console.log("Email is required");
      return ;
    }

    // Generate a 4-digit OTP
    console.log("🔢 Generating OTP...");
    const OTP = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(`Generated OTP: ${OTP}`); // ✅ Check if OTP is created

    // Store OTP in PocketBase
    console.log("💾 Storing OTP in PocketBase...");
    try{
        const otpRecord = await pb.collection("otps").create({ userEmail, OTP });
        console.log("✅ OTP stored in PocketBase:", otpRecord);
    } catch (pbError) {
        console.error("❌ Error storing OTP in PocketBase:", pbError);
        return;
    }


    // Configure Nodemailer
    console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // Secure SSL/TLS port
        secure: true,
        auth: { user: process.env.EMAIL_USER,pass: process.env.EMAIL_PASS },
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.error("❌ SMTP Connection Error:", error);
        } else {
            console.log("✅ SMTP Connection Verified.");
        }
    });

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${OTP} (valid for 5 minutes)`,
    });
    console.log("✅ Email sent successfully:");


} catch (error) {
    console.error("Error sending OTP:", error);
}
  return success ;
}

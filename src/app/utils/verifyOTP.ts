"use server"

import pb from "../../../pocketbase";

export const verifyOTPs = async (emails: string, otps: string) => {
  try {

      const email = emails;
      const otp  =  otps;
      if (!email || !otp) {
        console.log("Email and OTP are required")
      }
  
      // Get latest OTP from PocketBase
      const records = await pb.collection("otps").getFullList({
        filter: `email="${email}" && otp="${otp}"`,
        sort: "-created_at", // Get the most recent OTP
        perPage: 1,
      });
  
      if (records.length === 0) {
        console.log("Invalid OTP" )
      }
  
      // Delete OTP after verification
      await pb.collection("otps").delete(records[0].id);
  
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  }
  
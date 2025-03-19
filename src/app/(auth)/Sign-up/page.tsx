"use client"
import Image from "next/image";
import LoginForm from "../../Components/loginform";
import Link from "next/link";
import pb from "../../../../pocketbase";
import { sendOTP } from "@/app/utils/send-otp";
import {  useRouter } from "next/navigation";
import Logo from "@/app/Components/logo";

// import { useState } from "react";

export default () => {
    console.log("Passing storemail function:", storemail);
    console.log("This is login form");
    const router = useRouter();

    async function  storemail (email: string){
        console.log("Props in Parent:", { onSubmit: storemail });
        try{
            console.log(email);
            const data = {
                "User_email": email,
                "Password": ""
            };
            try{
                const records = await pb.collection('User').getFirstListItem(`User_email = '${email}'`);
                if(records){
                    console.log("You already have an account");
                }
            } catch (err) {
                const record = await pb.collection('User').create(data);
                console.log(record)
                localStorage.setItem('email', email);
                console.log("record created" , record);
                try{
                    console.log("🚀 Calling sendOTP...");
                    "use server"
                    const response = await sendOTP(email);
                    console.log("🏁 sendOTP function finished.", response);
                    router.push(`/otp-auth?email=${email}`);
                }
                catch{
                    console.log("Error on sendOTP");
                }
            }
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center items-center w-9/12 m-auto md:w-full h-dvh">
        <div className="flex justify-center flex-col items-center w-full h-full m-auto rounded-2xl">

            <Logo/>

            <div className="lg:w-1/4 md:w-3/5 w-full bg-gray-900 text-center text-gray-400 text-xl p-4">Sign - Up</div>

            <div className="lg:w-1/4 md:w-3/5 w-full bg-gray-900 text-center flex justify-center"> 
                <button className="bg-white text-black flex justify-center gap-x-2 mx-5 my-3 p-2 w-full font-semibold rounded-md hover:bg-gray-200">
                    <Image src="/google-color-svgrepo-com.svg" width={25} height={25} alt="" />
                    Continue with Google
                </button>
            </div>

            <div className="lg:w-1/4 md:w-3/5 w-full bg-gray-900 flex items-center px-4 mx-4 ">
                <hr className="flex-grow border-gray-600" />
                <span className="mx-3 text-gray-400">OR</span>
                <hr className="flex-grow border-gray-600" />
            </div>

            <div className="lg:w-1/4 md:w-3/5 w-full bg-gray-900 p-4">
                <LoginForm onSubmit={storemail} />
            </div>

            <p className="lg:w-1/4 md:w-3/5 w-full bg-gray-900 text-center text-gray-400 p-4 rounded-b-2xl">
                Already have an account?{" "}
                <Link href="/Login" className="text-blue-400 hover:underline">
                    Log in
                </Link>
            </p>
            {/* <Image src="@/public/logo.webp" alt="EX Logo" width={100} height={100} /> */}

        </div>
        </div>
    );
}
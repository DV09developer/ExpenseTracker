"use client"
import Image from "next/image";
import LoginForm from "../../Components/loginform";
import Link from "next/link";
import Logo from "@/app/Components/logo";
export default () => {
    const emailsetup = () =>{
        console.log("Email submit");
    }
    return (
        <div className="flex justify-center items-center w-9/12 m-auto md:w-full h-dvh">
        <div className="flex justify-center flex-col items-center w-full h-full m-auto rounded-2xl">

            <Logo/>

            <div className="lg:w-1/4 md:w-3/5 w-full bg-gray-900 text-center text-gray-400 text-xl p-4">Log - In</div>

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
                <LoginForm onSubmit={emailsetup}/>
            </div>

            <p className="lg:w-1/4 md:w-3/5 w-full bg-gray-900 text-center text-gray-400 p-4 rounded-b-2xl">
                Don't have an account?{" "}
                <Link href="/Sign-up" className="text-blue-400 hover:underline">
                    Sign up
                </Link>
            </p>

        </div>
        </div>
    );
}
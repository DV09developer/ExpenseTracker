"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function page() {
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const email = localStorage.getItem("email");
        setUserEmail(email);
      }, []);

    return (
        <div className="h-screen md:pt-20 pt-40">
            <div>
                <div>
                    <Link href="/User_Details">
                        <Image src="userimage.jpg" alt="User image"/>
                        <p>{userEmail}</p>
                    </Link>
                </div>
            </div>
            <div className="flex flex-wrap justify-around ">
                <div className="flex flex-wrap justify-center text-red-50 m-10 w-60 h-40 bg-gray-900 p-4 cursor-pointer items-center rounded-lg">
                    <h2 className="text-4xl font-extralight">+</h2>
                </div>
                <div className="flex flex-wrap justify-center text-red-400 m-10 w-60 h-40 bg-gray-900 p-4 cursor-pointer items-center rounded-lg">
                    <h2 className="font-extrabold text-2xl mb-4">Expense List</h2>
                    <p>Expense list by Date</p>
                    <p>Total: <span className="text-yellow-400">400 ₹</span></p>
                </div>
            </div>
        </div>
    )
};

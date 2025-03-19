import Image from "next/image";
export default function logo() {
    return (
        <div className="lg:w-1/4 md:w-3/5 w-full bg-gray-900 flex justify-center items-center mx-4 pt-4 rounded-t-2xl shadow-2xl">
            <Image src="/logo.webp" alt="EX Logo" width={100} height={100} className="rounded-3xl shadow-lg" />
            <div className="flex">
              <h2 className="font-bold text-2xl text-center flex justify-center">💰 Expense Tracker</h2>
            </div>
        </div>    
    )
};

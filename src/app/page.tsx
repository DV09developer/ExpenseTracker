import Expense from "./Components/Expense";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center flex-col h-[400px] items-center">
        <h2 className="text-4xl md:p-2 lg:p-2 text-center">Make</h2>
        <h2 className="text-4xl md:p-2 lg:p-2 text-center">Hassle Free Records</h2>
        <h2 className="text-4xl md:p-2 lg:p-2 text-center">of</h2>
        <h2 className="text-4xl md:p-2 lg:p-2 text-center">Expenses</h2>
        <Link href="/Login" className="border-2 border-gray-900 font-bold text-2xl mt-4 rounded-full bg-sky-400 px-4 py-2 text-white hover:bg-blue-600 hover:border-white transition">
          Get Started 
        </Link>
      </div>

      <div>
        <Expense />
      </div>
    </div>
    
  );
}

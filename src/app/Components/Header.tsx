import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md w-full top-0 fixed">
      <div className="max-w-full flex-wrap mx-auto flex justify-around items-center px-4">
        {/* Logo / Title */}
        <Link href="/" className="p-2 flex">
          <Image src="/image.png" alt="EX Logo" width={35} height={35} className="rounded-lg shadow-lg" />
          <h1 className="text-2xl font-bold cursor-pointer">💰 Expense Tracker</h1>
        </Link> 

        {/* Navigation Links */}
        <nav className="space-x-8 p-2">
          <Link href="\" className="text-lg hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/" className="text-lg hover:text-blue-400 transition">
            Features
          </Link>
          <Link href="/" className="text-lg hover:text-blue-400 transition">
            About
          </Link>
        </nav>

        <div className="space-x-4 p-2">
          <Link href="/Login" className="border-2 h-20 border-solid px-4 py-2 rounded text-white hover:bg-blue-600 transition">
            Log-in
          </Link>
          <Link href="/Sign-up" className="border-2 border-gray-900 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 hover:border-white transition">
            Sign-up
          </Link>
        </div>
      </div>
    </header>
  );
}

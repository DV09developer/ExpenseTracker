"use client"; // Mark this as a client component
import { usePathname } from "next/navigation";
import Header from "./Header";

// HeaderWrapper component that conditionally renders the Header based on the current pathname
export default function HeaderWrapper() {
    const pathname = usePathname();
    const hideHeaderPaths = ["/login", "/Sign-up", "/Password"];

    return hideHeaderPaths.includes(pathname) ? null : <Header />;
}

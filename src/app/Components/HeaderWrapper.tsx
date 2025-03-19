"use client"; // Mark this as a client component
import { usePathname } from "next/navigation";
import Header from "./Header";
export default function HeaderWrapper() {
    const pathname = usePathname();
    const hideHeaderPaths = ["/Login", "/Sign-up", "/Password"];

    return hideHeaderPaths.includes(pathname) ? null : <Header />;
}

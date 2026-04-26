"use client"
import Link from 'next/link';
import React from 'react'
import { navItems, logoName } from '@/data/navItems';
import { usePathname } from 'next/navigation';
import SearchBar from "@/app/_components/Searchbar"

const Navbar = () => {
    const pathname = usePathname();

    const drawerMenu = (
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li className="flex items-end justify-end mb-2">
                <label htmlFor="mobile-drawer" className="btn btn-ghost btn-sm btn-circle">
                    ✕
                </label>
            </li>
            {navItems.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                    <li key={href} className={isActive ? 'underline underline-offset-4' : ''}>
                        <Link href={href}>{label}</Link>
                    </li>
                );
            })}
        </ul>
    );

    const menu = (
        <div role="tablist" className="tabs tabs-border">
            {navItems.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        role="tab"
                        key={href}
                        href={href}
                        className={`tab transition-all duration-300 ease-in ${isActive ? "tab-active" : ""}`}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );

    return (
        <div className="drawer">
            {/* drawer toggle (hidden checkbox) */}
            <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                <div className="navbar bg-base-100 flex-col md:flex-row gap-4 px-4 py-6">
                    <div className="flex w-full md:w-auto justify-between items-center">
                        <div className="flex items-center">
                            {/* hamburger button to open drawer */}
                            <label htmlFor="mobile-drawer" aria-label="open sidebar" className="btn btn-ghost lg:hidden mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                            {/* logo */}
                            <Link href={logoName.href} className="btn btn-ghost text-xl px-0">{logoName.label}</Link>
                        </div>
                        
                        {/* Mobile menu (only visible on mobile if needed, or just use drawer) */}
                        <div className="lg:hidden">
                            {/* You could put another button here if needed */}
                        </div>
                    </div>

                    <div className="w-full flex-1 md:flex justify-center px-2">
                        <SearchBar />
                    </div>

                    <div className="hidden lg:flex">
                        {menu}
                    </div>
                </div>
            </div>

            {/* drawer side */}
            <div className="drawer-side">
                <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
                {drawerMenu}
            </div>
        </div>
    );
};

export default Navbar;

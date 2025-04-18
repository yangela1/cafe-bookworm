"use client"
import Link from 'next/link';
import React from 'react'
import { navItems, logoName } from '@/data/navItems';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const drawerMenu = (
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
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
                <div className="navbar bg-base-100 w-full">
                    <div className="navbar-start">

                        {/* hamburger button to open drawer */}
                        <label htmlFor="mobile-drawer" aria-label="open sidebar" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>

                        {/* logo */}
                        <Link href={logoName.href} className="btn btn-ghost text-xl">{logoName.label}</Link>
                    </div>

                    {/* large nav */}
                    <div className="navbar-center hidden lg:flex">
                        {menu}
                    </div>

                    <div className="navbar-end">
                        <a className="btn btn-neutral">unused button</a>
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

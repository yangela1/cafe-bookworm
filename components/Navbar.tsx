"use client"
import Link from 'next/link';
import React from 'react'
import { navItems, logoName } from '@/data/navItems';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const mobileMenu = <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    >
        {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
                <li key={href} className={isActive ? 'underline decoration-solid underline-offset-4 rounded-sm' : ""}>
                    <Link href={href}>{label}</Link>
                </li>
            );
        })}
    </ul>;

    const menu = <div role="tablist" className="tabs tabs-border">
        {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
                <Link role="tab" key={href} href={href} className={`tab transition-all duration-300 ease-in ${isActive ? "tab-active" : ""}`}>
                    {label}
                </Link>
            );
        })}
    </div>;

    return (
        <>
            <div className="navbar bg-base-100 ">
                <div className="navbar-start">
                    {/*mobile drop down*/}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        {mobileMenu}
                    </div>

                    {/*logoname*/}
                    <Link href={logoName.href} className="btn btn-ghost text-xl ">{logoName.label}</Link>
                </div>

                {/*large nav*/}
                <div className="navbar-center hidden lg:flex">
                    {menu}
                </div>
                <div className="navbar-end">
                    <a className="btn btn-accent">unused button</a>
                </div>
            </div>
        </>
    )
}

export default Navbar
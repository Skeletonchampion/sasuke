import React from "react";
import { useAuth } from "../hooks/authContext";
import logo from "../images/logo.png"
import { CustomerDropDown } from "./CustomerDropDown";
import { DropDown } from "./DropDown";

export function NavBar(props: NavBarProps) {
    const dropDownRef = React.useRef<HTMLInputElement>(null);
    const { customerState } = props;

    return (
        <nav className="relative mb-6 bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="flex mx-12 items-center justify-center mb-6">
                <a href="/">
                    <img src={logo} className="w-48" alt="logo?" />
                </a>
                <div id="search-bar" className="relative w-[400px] mx-auto flex content-center items-center">
                    <span className="absolute left-4 cursor-pointer text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </span>
                    <input type="text" className="w-full border hover:border-blue-300 rounded-full bg-transparent py-1 pl-10 pr-5 text-lg text-gray-600 outline-none ring-1 ring-gray-200 focus:ring-1 focus:ring-blue-700 dark:text-zinc-900 dark:ring-zinc-600" placeholder="Enter keyword, title, author..." />
                </div>
                <div id="info" className="flex items-center">
                    {
                        customerState.accessToken ? <CustomerDropDown /> : <a className="mx-2" href="/login">Sign in</a>
                    }
                    <a className="mx-2" href="#">Help</a>
                    <a href="/cart" role="button" className="relative flex mx-2">
                        <svg className="flex-1 w-8 h-8 fill-current" viewBox="0 0 24 24">
                            <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                        </svg>
                        <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{customerState.customer.cart.length}
                        </span>
                    </a>
                </div>
            </div>
            <span className="block w-full border-t border-gray-800"></span>
            <ul id="categories" className="flex justify-between mx-14">
                <li
                    className="py-1 border-transparent border-y-4 hover:border-black duration-200"
                    onClick={() => {
                        if (dropDownRef.current) {
                            if (dropDownRef.current.classList.contains("visible")) dropDownRef.current.className = "hidden h-0 px-4 z-20 duration-300 absolute top-30 left-0 w-[300px]";
                            else dropDownRef.current.className = "visible px-4 z-20 absolute top-30 left-0 w-[300px]";
                        }
                    }} >
                    <a href="#">Browse Collections</a>
                </li>
                <li className="py-1 border-transparent border-y-4 hover:border-black duration-200">
                    <a href="#">Advanced Search</a>
                </li>
                <li className="py-1 border-transparent border-y-4 hover:border-black duration-200">
                    <a href="#">Rare Books</a>
                </li>
                <li className="py-1 border-transparent border-y-4 hover:border-black duration-200">
                    <a href="#">Rare & Antiquarian Books</a>
                </li>
                <li className="py-1 border-transparent border-y-4 hover:border-black duration-200">
                    <a href="#">Textbooks</a>
                </li>
            </ul>
            <span className="block w-full border-t border-gray-800"></span>
            <DropDown dropDownRef={dropDownRef} />
        </nav>
    )
}
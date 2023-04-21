import React from "react";
import { useAuth } from "../hooks/authContext";
import { useCustomer } from "../hooks/CustomerContext"

export function CustomerDropDown() {
    const { customerState } = useCustomer();

    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const { performLogout } = useAuth();

    const handleDisplayDropdown = () => {
        if(dropdownRef.current) {
            
            if(dropdownRef.current.classList.contains("opacity-100")) {
                dropdownRef.current.className = "opacity-0 transition-opacity duration-200 absolute right-0 z-10 w-56 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-black ring-opacity-5 focus:outline-none";
                setTimeout(() => dropdownRef.current?.classList.add("w-0 overflow-hidden"), 300);
            }
            else {
                dropdownRef.current.className = "opacity-100 transition-opacity duration-200 absolute right-0 z-10 w-56 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none";
            }
            
        }
    }
 
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button"
                onClick={handleDisplayDropdown} >
                    {customerState.customer.username}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            {/* Dropdown menu */}
            <div ref={dropdownRef} className="opacity-0 w-0 overflow-hidden absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                    <div>
                        <a href="/customer" className="text-gray-700 block px-4 py-2 text-sm" id="menu-item-0">Account Details</a>
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" id="menu-item-1">Support</a>
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" id="menu-item-2">License</a>
                    </div>
                    <button onClick={performLogout} className="text-gray-700 block w-full px-4 py-2 text-left text-sm" id="menu-item-3">Sign out</button>
                </div>
            </div>
        </div>
    )
}
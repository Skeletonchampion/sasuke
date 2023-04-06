import React from "react";
import { useCustomer } from "../hooks/CustomerContext";

export function Counter({ className, bookID, quantity }: { className: string, bookID: string, quantity: number }) {
    const { handleAddItemToCart, handleRemoveItemFromCart } = useCustomer();

    const [tempQuantity, setTempQuantity] = React.useState(quantity);
    
    return (
        <div className={className}>
            {/* <label htmlFor="custom-input-number" className="w-full text-gray-700 text-lg font-semibold mr-8">Quantity:</label> */}
            <div className="flex flex-row h-10 w-full border border-gray-400 rounded-lg relative bg-white mt-1">
                <button onClick={() => {
                    if(tempQuantity > 1) {
                        handleRemoveItemFromCart(bookID);
                        setTempQuantity(tempQuantity-1);
                    }
                }} data-action="decrement" className="hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input type="number" className="outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700" name="custom-input-number" value={`${tempQuantity}`}></input>
                <button onClick={() => {
                    handleAddItemToCart(bookID);
                    setTempQuantity(tempQuantity+1);
                }} data-action="increment" className="hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
        </div>
    )
}
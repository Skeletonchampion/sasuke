import axios from "axios";
import React from "react"
import { BookReducer, BookInitialState } from "../hooks/BookReducer";
import { useCustomer } from "../hooks/CustomerContext";
import { useGlobal } from "../hooks/globalContext";
import { Checkout } from "./Checkout";
import { Counter } from "./Counter";

export function CartItems({ customerState }: { customerState: CustomerState }) {
    const [booksState, booksDispatch] = React.useReducer(BookReducer, BookInitialState);

    const { customer } = customerState;
    const { cart } = customer;

    const [selectedItems, setSelectedItems] = React.useState(cart);

    const [showForm, setShowForm] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [allChecked, setAllChecked] = React.useState(true);
    const [isCheckedList, setIsCheckedList] = React.useState(cart.map(() => true));

    function handleCheckingBox(index: number) {
        const tempIsCheckedList = [...isCheckedList];
        tempIsCheckedList[index] = !tempIsCheckedList[index];
        setIsCheckedList(tempIsCheckedList);
    }

    const { URL, GET_BOOKS_FROM_CART } = useGlobal();

    const getTotalPrice = () => {
        let sum = 0;
        booksState.map((book: BookState, index: number) => {
            if (isCheckedList[index]) sum += book.price * cart[index].quantity;
        });

        return sum;
    }

    React.useEffect(() => {
        (async () => {
            if(!customer._id) return;

            const res = await axios.get(`${URL}/${GET_BOOKS_FROM_CART}`, { params: { customerID: customer._id } });
            const books = res.data;
            booksDispatch({ type: "INITIALIZE_BOOKS", payload: books });

            setIsLoading(false);
        })();
    }, []);

    return (
        <div className="bg-gray-100 px-10 py-8">
            <h1 className="flex items-center mb-8"><span className="text-3xl font-bold pr-2">Shopping Cart</span> ({cart.length} Books)</h1>
            <div>
                <div className="flex mx-20 bg-white w-fit py-2 pl-8 mb-2">
                    <div className="flex items-center w-[600px]">
                        <input checked={allChecked} onChange={() => {
                            setAllChecked(!allChecked);

                            if(!allChecked === true) {
                                setSelectedItems(cart);
                            }
                            else {
                                setSelectedItems([]);
                            }

                            const tempIsCheckedList = [...isCheckedList];
                            tempIsCheckedList.forEach((item, index) => {
                                tempIsCheckedList[index] = !allChecked;
                            });

                            setIsCheckedList(tempIsCheckedList);
                        }} type="checkbox" className="mr-4 border-2 rounded-sm h-5 w-5 text-gray-600 outline-none" />
                        <label>Select All ({cart.length} Books)</label>
                    </div>
                    <div className="flex">
                        <p className="w-[128px] mr-10 text-center">Quantity</p>
                        <p className="pr-[100px]">Price</p>
                    </div>
                </div>
                <div className="mx-20 flex items-start flex-col xl:flex-row">
                    <ul className="">
                        {
                            isLoading
                                ?
                                <div className="w-[935.08px] h-[600px] bg-white animate-pulse">
                                </div>
                                :
                                cart.length > 0
                                    ?
                                    booksState.map((book: BookState, index: number) => {
                                        return (
                                            <li key={book._id} className="bg-white flex items-center p-8 w-[935.08px]">
                                                <div className="flex items-center w-[600px]">
                                                    <input type="checkbox" onChange={() => {
                                                        if (isCheckedList[index] === true) {
                                                            setAllChecked(false);

                                                            const newCart = [...cart];
                                                            const newSelectedItems = [...selectedItems];
                                                            const uncheckedItemIndex = newSelectedItems.findIndex(item => item.bookID === book._id);
                                                            newSelectedItems.splice(uncheckedItemIndex, 1);

                                                            setSelectedItems(newSelectedItems);
                                                        }
                                                        else {
                                                            const isUnchecked = isCheckedList.find(item => item === false);
                                                            if (!isUnchecked) setAllChecked(true);

                                                            const newCart = [...cart];
                                                            const newSelectedItems = [...selectedItems];
                                                            const checkedItemIndex = newCart.findIndex(item => item.bookID === book._id);
                                                            newSelectedItems.push(newCart[index]);
                                                            
                                                            setSelectedItems(newSelectedItems);
                                                        }
                                                        handleCheckingBox(index);
                                                    }} checked={isCheckedList[index]} className="mr-4 border-2 rounded-sm h-5 w-5 text-gray-600 outline-none" />
                                                    <div className="flex items-center">
                                                        <div className="w-32 h-32">
                                                            <img className="w-24 h-32" src={book.imgUrl} alt="book" />
                                                        </div>
                                                        <div className="flex flex-col self-stretch">
                                                            <p className="mb-auto w-[75%]">{book.title}</p>
                                                            <p className="mt-auto font-bold text-lg">${book.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="mr-10">
                                                        <Counter bookID={book._id} quantity={cart.find(item => item.bookID === book._id)?.quantity!} className="custom-number-input h-10 w-32 flex items-center" />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="font-bold text-lg text-red-600 mr-10">${book.price}</p>
                                                        <div className="w-fit p-1 cursor-pointer">
                                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                                <path d="M19 6h-4V5c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1H5v2h14V6zm-3 3v10H8V9h8zm-9 8V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                    :
                                    <div className="w-[935.08px] h-[600px] bg-white animate-pulse">
                                    </div>}
                    </ul>
                    <div className="bg-white 2xl:ml-8 2xl:mt-0 mt-4 p-6 rounded-md">
                        <p className="border-b border-gray-200 pb-4">Price <span className="float-right">{getTotalPrice()}$</span></p>
                        <p className="font-bold text-xl mt-4 mb-4">Total Price <span className="float-right text-red-600">{getTotalPrice()}$</span></p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-20 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Proceed to checkout</button>
                    </div>
                </div>
            </div>
            <Checkout showForm={showForm} setShowForm={setShowForm} selectedItems={selectedItems} totalPrice={getTotalPrice()} />
        </div>
    )
}
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCustomer } from "../hooks/CustomerContext";

export function Checkout({ showForm, setShowForm, selectedItems }: { showForm: boolean, setShowForm: React.Dispatch<React.SetStateAction<boolean>>, selectedItems: { bookID: string, quantity: number }[] }) {
    const { customerState, customerDispatch, handleUpdateCustomer, handlePlaceOrder } = useCustomer();
    const { customer } = customerState;

    const [fullName, setFullName] = React.useState(customer.fullname);
    const [phone, setPhone] = React.useState(customer.phoneNumber);
    const [email, setEmail] = React.useState(customer.email);
    const [address, setAddress] = React.useState(customer.address);
    const [nameOnCard, setNameOnCard] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [note, setNote] = React.useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const details = { fullname: fullName, phoneNumber: phone, email: email, address: address }

            await handleUpdateCustomer(customerState.customer._id, details);
            await handlePlaceOrder(customer._id, customer.cart);

            customerDispatch({ type: "CUSTOMER_PLACE_ORDER" })

            navigate("/confirm");
        }
        catch (err: any) {
            console.log(err);
        }

        setShowForm(!showForm);
    };

    return (
        <div>
            {showForm ? (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md transform transition-all duration-500 w-[620px]">
                        <h2 className="text-xl font-bold mb-2">Shipping Information</h2>
                        <form onSubmit={handleSubmit} className="flex">
                            <div className="w-[300px] flex-shrink-0">
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="fullname">
                                        Fullname
                                    </label>
                                    <input
                                        className="border border-gray-400 p-2 w-full rounded-md"
                                        type="text"
                                        id="fullname"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                        Phone
                                    </label>
                                    <input
                                        className="border border-gray-400 p-2 w-full rounded-md"
                                        type="number"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="border border-gray-400 p-2 w-full rounded-md"
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                                        Address
                                    </label>
                                    <textarea
                                        className="resize-none border border-gray-400 p-2 w-full rounded-md"
                                        id="address"
                                        rows={5}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="w-[300px] flex-shrink-0 mt-[5px]">
                                <div className="w-full mx-auto p-5 text-gray-700" style={{ maxWidth: "600px" }}>
                                    <div className="mb-3 flex flex-col -mx-2">
                                        <div>
                                            <div className="px-2">
                                                <label htmlFor="type1" className="flex items-center cursor-pointer">
                                                    <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked />
                                                    <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" />
                                                </label>
                                            </div>
                                            <div className="px-2">
                                                <label htmlFor="type2" className="flex items-center cursor-pointer">
                                                    <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                                                    <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-8 ml-3" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name-on-card">
                                                    Name on card
                                                </label>
                                                <input
                                                    className="border border-gray-400 p-2 w-full rounded-md"
                                                    type="text"
                                                    id="name-on-card"
                                                    value={nameOnCard}
                                                    onChange={(e) => setNameOnCard(e.target.value)}
                                                    placeholder="John Smith"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="card-number">
                                                    Card number
                                                </label>
                                                <input
                                                    className="border border-gray-400 p-2 w-full rounded-md"
                                                    type="text"
                                                    id="card-number"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    placeholder="0000 0000 0000 0000"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="note">
                                                    Note
                                                </label>
                                                <textarea
                                                    className="resize-none border border-gray-400 p-2 w-full rounded-md"
                                                    id="note"
                                                    rows={5}
                                                    value={note}
                                                    onChange={(e) => setNote(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                                                type="button"
                                                onClick={() => setShowForm(!showForm)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded ml-2"
                                                type="submit"
                                                onClick={(e) => handleSubmit(e)}
                                            >
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : ""}
        </div>
    );
}
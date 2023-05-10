import axios from "axios";
import React from "react";
import { BookItem } from "../components/BookItem";
import { FiveStars } from "../components/FiveStars";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../hooks/authContext";
import { useCustomer } from "../hooks/CustomerContext";
import { useGlobal } from "../hooks/globalContext";

import successfulDelivery from "../images/icons8-successful-delivery-96.png";
import { calculateDateDiff } from "../utils/calculateDateDiff";

interface OrderedBook {
    book: BookState;
    quantity: number;
}

interface Order {
    _id: string;
    customerID: string;
    items: OrderedBook[];
    orderDate: Date;
    totalPrice: number;
}

export function CustomerPage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [orders, setOrders] = React.useState<Order[]>([] as Order[]);
    const [customerReviews, setCustomerReviews] = React.useState<any>();
    const [tab, setTab] = React.useState("orders");

    const { URL } = useGlobal();
    const { checkAuth } = useAuth();
    const { customerState } = useCustomer();

    const customer = customerState.customer;

    const [fullName, setFullName] = React.useState(customer.fullname);
    const [phone, setPhone] = React.useState(customer.phoneNumber);
    const [email, setEmail] = React.useState(customer.email);
    const [address, setAddress] = React.useState(customer.address);
    React.useEffect(() => {
        (async () => {
            await checkAuth();

            let customerOrders: Order[] = [];
            let customerReviews: any[] = [];
            if (customerState.customer._id) {
                customerReviews = await getReviews(customerState.customer._id);
                customerOrders = await getOrders(customerState.customer._id);
            }
            setCustomerReviews(customerReviews);
            setOrders(customerOrders);

            setIsLoading(false);
        })();
    }, [customerState.accessToken]);


    const getOrders = async (customerID: string) => {
        const res = await axios.post(`${URL}/customer/orders`, { customerID });

        return res.data;
    }
    const getReviews = async (customerID: string) => {
        const res = await axios.post(`${URL}/customer/reviews`, { customerID });

        return res.data;
    }
    const handleSubmit = async (e: any) => {

    }

    return (
        <>
            {
                isLoading == true
                    ?
                    ""
                    :
                    <>
                        <NavBar customerState={customerState} />
                        <div className="">
                            {/* Shipping status bar */}
                            <div className="mb-10 mx-20 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                <ul className="flex justify-center -mb-px">
                                    <li className="mr-2" onClick={() => setTab("orders")}>
                                        {tab === "orders" ? <a className="tab tab-bordered tab-active font-bold text-lg">My orders</a> : <a className="tab tab-bordered">My orders</a>}
                                    </li>
                                    <li className="mr-2" onClick={() => setTab("information")}>
                                        {tab === "information" ? <a className="tab tab-bordered tab-active font-bold text-lg">My information</a> : <a className="tab tab-bordered">My information</a>}
                                    </li>
                                    <li className="mr-2" onClick={() => setTab("reviews")}>
                                        {tab === "reviews" ? <a className="tab tab-bordered tab-active font-bold text-lg">My reviews</a> : <a className="tab tab-bordered">My reviews</a>}
                                    </li>
                                </ul>
                            </div>
                            <div>
                                {/* Order list */}
                                {
                                    tab === "orders"
                                    &&
                                    <div>
                                        <ul className="" >
                                            {orders.length > 0 ? orders.map((order) => {
                                                return (
                                                    <li key={order._id} className="flex flex-col shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-10 mx-20 px-4 py-6">
                                                        <div className="tooltip flex justify-center items-center border-b pb-4" data-tip="Successful Delivery">
                                                            <div>
                                                                <img src={successfulDelivery} className="w-8 h-8" />
                                                            </div>
                                                            <h3 className="text-2xl font-semibold">{new Date(order.orderDate).toDateString()}</h3>
                                                        </div>
                                                        <ul className="my-5 px-16 grid gap-4 grid-cols-5">
                                                            {order.items.map((item) => <BookItem key={item.book._id} book={item.book} quantity={item.quantity} />)}
                                                        </ul>
                                                        <div className="border-t pt-4 px-10 flex justify-between items-center">
                                                            <p className="text-xl font-semibold">Total price: <span className="text-orange-600 text-2xl">{order.totalPrice}$</span></p>
                                                            <div>
                                                                <button className="btn btn-outline border-2 btn-info mr-3">Buy again</button>
                                                                <button className="btn btn-outline border-2 btn-info">Details</button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }) : <h3 className="text-lg font-semibold text-center text-rose-500">No Order History!</h3>}
                                        </ul>
                                    </div>
                                }
                                {/* Information */}
                                {
                                    tab === "information"
                                    &&
                                    <div>
                                        <form onSubmit={handleSubmit} className="flex justify-center">
                                            <div className="w-[600px] flex-shrink-0">
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
                                                <div>
                                                    <button className="btn btn-outline border-2 btn-error mr-3">Clear</button>
                                                    <button className="btn btn-outline border-2 btn-success mr-3">Save</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                }
                                {/* Reviews */}
                                {
                                    tab === "reviews"
                                    &&
                                    <div>
                                        <ul className="flex flex-col items-center">
                                            {
                                                customerReviews?.map((review: any) => {
                                                    return (
                                                        <li key={review._id} className="w-[600px] my-4 mx-10 px-6 py-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                                                            <div className="flex mb-4 justify-between items-center">
                                                                <a href={`/book/id/${review.bookID?._id}`} className="text-md font-medium">{review.bookID?.title ? review.bookID?.title : "This product was deleted!"}</a>
                                                                <p>{calculateDateDiff(new Date(review.createdAt))}</p>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div>
                                                                    <FiveStars rating={review.rating} />
                                                                    <p>
                                                                        {review.comment}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <button className="btn mr-2 btn-outline btn-warning">Delete</button>
                                                                    <button className="btn btn-outline btn-error">Edit</button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                        <Footer />
                    </>
            }
        </>
    )
}
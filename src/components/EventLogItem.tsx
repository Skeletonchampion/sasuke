import axios from "axios";
import React, { RefObject } from "react";
import { useGlobal } from "../hooks/globalContext";
import { calculateDateDiff } from "../utils/calculateDateDiff";
import { generateRandomString } from "../utils/generateRandomString";
import { FiveStars } from "./FiveStars";

import successfulDelivery from "../images/icons8-successful-delivery-96.png";
import { BookItem } from "./BookItem";

interface EventLog {
    _id: string;
    type: string;
    date: Date;
    log: string;
    data: {
        username?: string;
        bookReview?: Review;
        bookID?: string;
        title?: string;
        customerID?: string;
        orderID?: string;
    };
}

export function EventLogItem({ eventLog }: { eventLog: EventLog }) {
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const usernameRef = React.useRef<HTMLDivElement>(null);

    const [order, setOrder] = React.useState<Order>({} as Order);

    const { URL, GET_BOOKS_FROM_CART } = useGlobal();

    const type = eventLog.type;

    let CustomerRegisterEvent: React.FC = () => null;

    const handlePopover = (elementRef: RefObject<HTMLElement>) => {
        if (elementRef.current) {
            if (elementRef.current.classList.contains("hidden")) {
                elementRef.current.classList.remove("hidden");

                const fadeOut = setTimeout(() => {
                    if (elementRef.current) elementRef.current.classList.add("hidden");

                    clearTimeout(fadeOut);
                }, 1200);
            }
        }
    }

    const handleGetOrder = async () => {
        const { customerID, orderID } = eventLog.data;

        const res = await axios.post(`${URL}/customer/order`, { customerID, orderID });
        const order = res.data;

        setOrder(order);
    }

    React.useEffect(() => {
        (async () => {
            await handleGetOrder();
        })();
    }, []);

    const classNameListItem = "font-semibold border border-gray-200";
    const classNameDiv = "px-2 py-1 flex items-center";
    const classNameDate = "w-[150px] mr-2";
    const classNameCustomerID = "relative text-blue-400 cursor-pointer";
    const classNameBookID = "relative text-indigo-400 cursor-pointer";
    const classNameUsername = "text-lime-600 opacity-75 cursor-pointer";
    switch (type) {
        case "customer_register": {
            const { customerID } = eventLog.data;

            CustomerRegisterEvent = () => {
                return (
                    <li className={classNameListItem}>
                        <div className={classNameDiv}>
                            <p className={classNameDate}>{calculateDateDiff(new Date(eventLog.date))}</p>
                            <div>New customer with id&nbsp;
                                <a onClick={() => handlePopover(usernameRef)} className={classNameCustomerID}>
                                    {customerID}
                                    <div ref={usernameRef} id="username" className="hidden transition opacity-100 duration-1000 border w-300px flex items-center text-gray-800 absolute bg-white top-[-25px] z-[99] left-0 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                                        <span className="border-l px-2">{eventLog.data.username}</span>
                                    </div>
                                </a> has registered successfully.
                            </div>
                        </div>
                    </li>
                )
            }

            break;
        }
        case "customer_review": {
            const { username, title } = eventLog.data;

            const bookReview = eventLog.data.bookReview;

            CustomerRegisterEvent = () => {
                return (
                    <li className={classNameListItem}>
                        <div className={classNameDiv}>
                            <p className={classNameDate}>{calculateDateDiff(new Date(eventLog.date))}</p>
                            <div>Customer <a className={classNameUsername}>{username}</a> has reviewed the book { }
                                <a id="bookID" className={classNameBookID}><span onClick={() => handlePopover(tooltipRef)}>{title}</span>
                                    <div ref={tooltipRef} id="tooltip" className="hidden transition opacity-100 duration-1000 border w-[400px] flex items-center text-gray-800 absolute bg-white top-[-25px] z-[99] left-0 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                                        <FiveStars rating={bookReview?.rating} /><span className="pr-2"></span><span className="border-l px-2">{bookReview?.comment}</span>
                                    </div>
                                </a>.</div>
                        </div>
                    </li>
                )
            }

            break;
        }
        case "customer_order": {
            const { username, orderID } = eventLog.data;

            const modalRef = React.useRef<HTMLDivElement>(null);

            CustomerRegisterEvent = () => {
                return (
                    <div key={generateRandomString(10)} className="relative">
                        <li className={classNameListItem}>
                            <div className={classNameDiv}>
                                <p className={classNameDate}>{calculateDateDiff(new Date(eventLog.date))}</p>
                                <div>Customer <a className={classNameUsername}>{username}</a> has placed an order&nbsp;
                                    <div id="bookID" className={`${classNameBookID} inline-block`}><a onClick={async () => {
                                        if (modalRef.current) {
                                            modalRef.current.classList.toggle("hidden");
                                            modalRef.current.scrollIntoView();
                                        }
                                    }}>{orderID}</a>.
                                    </div></div>
                            </div>
                        </li>
                        <div ref={modalRef} className={`hidden absolute w-[1300px] z-[99] left-[50%] translate-x-[-50%]`}>
                            <li key={order._id} className="bg-white flex flex-col shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-10 mx-20 px-4 py-6">
                                <div className="tooltip flex justify-center items-center border-b pb-4" data-tip="Successful Delivery">
                                    <div>
                                        <img src={successfulDelivery} className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-semibold">{new Date(order.orderDate).toDateString()}</h3>
                                    <label onClick={() => {
                                        if (modalRef.current) {
                                            modalRef.current.classList.toggle("hidden");
                                        }
                                    }} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                </div>
                                <ul className="my-5 px-16 grid gap-4 grid-cols-5">
                                    {order.items?.map((item) => <BookItem key={item.book._id} book={item.book} quantity={item.quantity} />)}
                                </ul>
                                <div className="border-t pt-4 px-10 flex justify-between items-center">
                                    <p className="text-xl font-semibold">Total price: <span className="text-orange-600 text-2xl">{order.totalPrice}$</span></p>
                                </div>
                            </li>
                        </div>
                    </div>
                )
            }

            break;
        }
    }

    return (
        <CustomerRegisterEvent />
    )
}
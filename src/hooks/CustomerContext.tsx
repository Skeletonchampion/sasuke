import axios from 'axios';
import React from 'react';

import { useGlobal } from './globalContext';
import { customerReducer, customerInitialState } from "./CustomerReducer";

const CustomerContext = React.createContext<CustomerContext | null>(null);

export const useCustomer = () => {
    return React.useContext(CustomerContext) as CustomerContext;
}

export function CustomerProvider({children}: ContextProviderProps) {
    const [customerState, customerDispatch] = React.useReducer(customerReducer, customerInitialState);

    const { URL, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, DELETE_ITEM_FROM_CART,
            UPDATE_CUSTOMER,
            PLACE_ORDER } = useGlobal();

    const authConfig = {
        headers: { Authorization: `Bearer ${customerState.accessToken}` }
    }

    const handleAddItemToCart = async (bookID: string) => {
        customerDispatch({ type: "CUSTOMER_ADD_ITEM", payload: bookID });

        await axios.post(`${URL}/${ADD_ITEM_TO_CART}`, { customerID: customerState.customer._id, bookID: bookID });
    }
    const handleRemoveItemFromCart = async (bookID: string) => {
        customerDispatch({ type: "CUSTOMER_REMOVE_ITEM", payload: bookID });

        await axios.post(`${URL}/${REMOVE_ITEM_FROM_CART}`, { customerID: customerState.customer._id, bookID: bookID });
    }
    const handleDeleteItemFromCart = async (bookID: string) => {
        customerDispatch({ type: "CUSTOMER_DELETE_ITEM", payload: bookID });

        await axios.post(`${URL}/${DELETE_ITEM_FROM_CART}`, { customerID: customerState.customer._id, bookID: bookID });
    }
    const handleUpdateCustomer = async (customerID: string, details: { fullname: string, email: string, phoneNumber: string, address: string }) => {
        // customerDispatch({ type: "CUSTOMER_UPDATE", payload: { customerID, fullname, email, phoneNumber, address } });
        const { fullname, phoneNumber, email, address } = details;
        await axios.post(`${URL}/${UPDATE_CUSTOMER}`, { customerID, details });
    }
    const handlePlaceOrder = async (customerID: string, cart: { bookID: string, quantity: number }[]) => {
        await axios.post(`${URL}/${PLACE_ORDER}`, { customerID, cart });
    }

    return (
        <CustomerContext.Provider value={{ customerState, customerDispatch, authConfig,
                                           handleAddItemToCart, handleRemoveItemFromCart, handleDeleteItemFromCart,
                                           handleUpdateCustomer, handlePlaceOrder }}>
            {children}
        </CustomerContext.Provider>
    )
}

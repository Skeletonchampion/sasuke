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

    const authConfig = {
        headers: { Authorization: `Bearer ${customerState.accessToken}` }
    }

    return (
        <CustomerContext.Provider value={{customerState, customerDispatch, authConfig}}>
            {children}
        </CustomerContext.Provider>
    )
}

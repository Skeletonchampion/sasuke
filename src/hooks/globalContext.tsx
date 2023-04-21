import axios from 'axios';
import React from 'react';

axios.defaults.withCredentials = true;

const GlobalContext = React.createContext<DefaultContext | null>(null);

export const useGlobal = () => {
    return React.useContext(GlobalContext) as DefaultContext;
}

export function GlobalProvider({ children }: ContextProviderProps) {
    const [URL, setURL] = React.useState("http://localhost:4000");
    const [ROUTE, setROUTE] = React.useState({
        POST_LOGIN: "auth/login",
        POST_REGISTER: "auth/register",
        POST_TOKEN: "auth/token",

        GET_BOOKS: "books/all",
        GET_BOOKS_BY_CATEGORY: "books/category",
        GET_BOOKS_BY_QUERY: "books/search",
        GET_BOOKS_FROM_CART: "books/cart",

        ADD_ITEM_TO_CART: "customer/cart/add",
        REMOVE_ITEM_FROM_CART: "customer/cart/remove",
        DELETE_ITEM_FROM_CART: "customer/cart/delete",

        UPDATE_CUSTOMER: "customer/details/update",

        PLACE_ORDER: "customer/order",

        ADD_REVIEW: "customer/reviews/add"
    });
    const { POST_LOGIN, POST_REGISTER, POST_TOKEN,
            GET_BOOKS, GET_BOOKS_BY_CATEGORY, GET_BOOKS_BY_QUERY, GET_BOOKS_FROM_CART,
            ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, DELETE_ITEM_FROM_CART,
            UPDATE_CUSTOMER,
            PLACE_ORDER,
            ADD_REVIEW } = ROUTE;

    return (
        <GlobalContext.Provider
        value={{URL, POST_LOGIN, POST_REGISTER, POST_TOKEN,
                GET_BOOKS, GET_BOOKS_BY_CATEGORY, GET_BOOKS_BY_QUERY, GET_BOOKS_FROM_CART,
                ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, DELETE_ITEM_FROM_CART,
                UPDATE_CUSTOMER,
                PLACE_ORDER,
                ADD_REVIEW
                }}>
            {children}
        </GlobalContext.Provider>
    )
}

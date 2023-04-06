import axios from "axios";
import React from "react";
import { BookInitialState, BookReducer } from "../hooks/BookReducer";
import { useGlobal } from "../hooks/globalContext";
import { SimpleSearch } from "./SimpleSearch";
import { TrendingBooks } from "./TrendingBooks";

export function Main() {
    const [bookState, bookDispatch] = React.useReducer(BookReducer, BookInitialState);

    const { URL, GET_BOOKS } = useGlobal();

    React.useEffect(() => {
        (async () => {
            const res = await axios.get(`${URL}/${GET_BOOKS}`);
            const books = res.data;
            bookDispatch({ type: "INITIALIZE_BOOKS", payload: books });
        })();
    }, []);

    return (
        <main>
            <SimpleSearch />
            <TrendingBooks bookState={bookState} bookDispatch={bookDispatch} />
        </main>
    )
}
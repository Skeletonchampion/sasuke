import axios from "axios";
import React from "react";
import { BookInitialState, BookReducer } from "../hooks/BookReducer";
import { useGlobal } from "../hooks/globalContext";
import { SimpleSearch } from "./SimpleSearch";
import { BookList } from "./BookList";

export function Main() {
    return (
        <main>
            <SimpleSearch />
            <BookList />
        </main>
    )
}
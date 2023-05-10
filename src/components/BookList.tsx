import axios from "axios"
import { nanoid } from "nanoid"
import React from "react"
import { BookReducer, BookInitialState } from "../hooks/BookReducer"
import { useGlobal } from "../hooks/globalContext"
import { formatBookListTitle } from "../utils/formatBookListTitle "
import { BookItem } from "./BookItem"
import { FiveStars } from "./FiveStars"

import _ from "lodash"

const totalPages = 36;

interface RandomBookIDsByPage {
    [page: number]: string[];
}

export function BookList() {
    const bookListRef = React.useRef<HTMLDivElement>(null);

    const { URL, GET_BOOKS } = useGlobal();

    // Only for random books section
    const [randomBookIDsByPage, setRandomBookIDsByPage] = React.useState<RandomBookIDsByPage>({});

    const [type, setType] = React.useState("random-books");
    const [page, setPage] = React.useState<number>(1);

    const [bookState, bookDispatch] = React.useReducer(BookReducer, BookInitialState);

    React.useEffect(() => {
        (async () => {
            handleGetBooks("random-books", 1);
        })();
    }, []);

    const [isLoading, setIsLoading] = React.useState(false);

    const handleGetBooks = async (type: string, page: number) => {
        let res;
        setIsLoading(true);

        if (type === "random-books") {
            let exIDs: string[] = [];
            if (randomBookIDsByPage && !randomBookIDsByPage[page]) {
                const newRandomBookIDs = _.cloneDeep(randomBookIDsByPage);
                // exclusive ids
                exIDs = Object.keys(newRandomBookIDs)
                    .filter(key => key !== `${page}`)
                    .reduce((acc: string[], key) => acc.concat(newRandomBookIDs[parseInt(key)]), []);
            }

            res = await axios.post(`${URL}/${GET_BOOKS}?type=${type}&page=${page}`, { ids: randomBookIDsByPage[page] ?? [], exIDs });
        }
        else res = await axios.post(`${URL}/${GET_BOOKS}?type=${type}&page=${page}`);
        const books = res.data;
        bookDispatch({ type: "INITIALIZE_BOOKS", payload: books });

        if (type === "random-books") {
            const newRandomBookIDs = _.cloneDeep(randomBookIDsByPage);
            if (newRandomBookIDs[page] === undefined) {
                newRandomBookIDs[page] = [];

                books.map((book: BookState) => newRandomBookIDs[page].push(book._id));

                setRandomBookIDsByPage(newRandomBookIDs);
            }
        }

        setPage(page);
        setIsLoading(false);

        // bookListRef.current?.scrollIntoView();
    }

    const handleSetType = async (type: string) => {
        await handleGetBooks(type, 1);

        setType(type);
        setPage(1);

        bookListRef.current?.scrollIntoView();
    }

    const handleGetMoreBooks = async () => {
        setIsLoading(true);

        const res = await axios.get(`${URL}/${GET_BOOKS}`);
        const books = res.data;
        bookDispatch({ type: "ADD_BOOKS", payload: books });

        setIsLoading(false);
    }

    return (
        <div ref={bookListRef} id="book-list" className="my-10 bg-gray-100 flex flex-col items-center">
            <div className="tabs my-6 ml-4">
                {type === "lastest-releases"
                    ?
                    <a onClick={async () => await handleSetType("lastest-releases")} className="tab tab-lg tab-lifted tab-active font-semibold text-xl">Lastest Releases</a>
                    :
                    <a onClick={async () => await handleSetType("lastest-releases")} className="tab tab-lg tab-lifted font-semibold text-xl">Lastest Releases</a>
                }
                {type === "random-books"
                    ?
                    <a onClick={async () => await handleSetType("random-books")} className="tab tab-lg tab-lifted tab-active font-semibold text-xl">Random Books</a>
                    :
                    <a onClick={async () => await handleSetType("random-books")} className="tab tab-lg tab-lifted font-semibold text-xl">Random Books</a>
                }
                {type === "top-rated"
                    ?
                    <a onClick={async () => await handleSetType("top-rated")} className="tab tab-lg tab-lifted tab-active font-semibold text-xl">Top-Rated Books</a>
                    :
                    <a onClick={async () => await handleSetType("top-rated")} className="tab tab-lg tab-lifted font-semibold text-xl">Top-Rated Books</a>
                }
            </div>
            <ul id="trending-books_list" className="px-16 mb-10 grid gap-4 grid-cols-5">
                {bookState.map((book: BookState, i: number) => {
                    return <BookItem key={book._id} book={book} />
                })}
            </ul>
            {/* <ul id="trending-books_list" className="self-start flex px-10 overflow-x-scroll">
                {bookState.slice(0, 10).map((book: BookState, i: number) => {
                    return <BookItem key={book._id} book={book} />
                })}
            </ul> */}
            <div className="btn-group mb-8">
                {page > 3 && <button className="btn" onClick={() => handleGetBooks(type, 1)}>1</button>}
                {page > 4 && <button className="btn disabled">...</button>}
                {page > 2 && <button className="btn" onClick={() => handleGetBooks(type, page - 2)}>{page - 2}</button>}
                {page > 1 && <button className="btn" onClick={() => handleGetBooks(type, page - 1)}>{page - 1}</button>}
                {isLoading ? <button className="btn btn-square btn-active loading"></button> : <button className="btn btn-active">{page}</button>}
                {page < totalPages && <button className="btn" onClick={() => handleGetBooks(type, page + 1)}>{page + 1}</button>}
                {page < totalPages - 1 && <button className="btn" onClick={() => handleGetBooks(type, page + 2)}>{page + 2}</button>}
                {page < totalPages - 3 && <button className="btn disabled">...</button>}
                {page < totalPages - 2 && <button className="btn" onClick={() => handleGetBooks(type, totalPages)}>{totalPages}</button>}
            </div>
            {/* <button
                onClick={handleGetMoreBooks}
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-20 py-4 text-center mb-8">
                {
                    isLoading
                        ?
                        <div>
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <div className="w-10 h-8 flex items-center text-lg">
                            More
                        </div>
                }
            </button> */}
        </div>
    )
}
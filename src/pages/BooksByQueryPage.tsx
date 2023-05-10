import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { BookItem } from "../components/BookItem";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { RightRedArrow } from "../components/RightRedArrow";
import { useAuth } from "../hooks/authContext";
import { BookInitialState, BookReducer } from "../hooks/BookReducer";
import { useCustomer } from "../hooks/CustomerContext";
import { useGlobal } from "../hooks/globalContext";

function convertString(category: string) {
    let words = category.split("_");
    for (let i = 0; i < words.length; i++) {
        let subWords = words[i].split("-");
        for (let j = 0; j < subWords.length; j++) {
            subWords[j] = subWords[j].charAt(0).toUpperCase() + subWords[j].slice(1);
        }
        words[i] = subWords.join(" ");
    }
    return words.join(" & ");
}

export function BooksByQueryPage() {
    const [bookState, bookDispatch] = React.useReducer(BookReducer, BookInitialState);
    const [isLoading, setIsLoading] = React.useState(true);

    const [sortingTrigger, setSortingTrigger] = React.useState(false);

    const [searchParams] = useSearchParams();

    const [uniqueAuthors, setUniqueAuthors] = React.useState<string[]>([]);

    const { customerState } = useCustomer();
    const { checkAuth } = useAuth();

    const { URL, GET_BOOKS_BY_QUERY } = useGlobal();

    React.useEffect(() => {
        (async () => {
            await checkAuth();
            // setIsLoading(false);
        })();
    }, [customerState.accessToken]);

    React.useEffect(() => {
        (async () => {
            const author = searchParams.get("author");
            const title = searchParams.get("title");
            const keyword = searchParams.get("keyword");
            let query = ``;
            if (author) query += `author=${author}&`
            if (title) query += `title=${title}&`
            if (keyword) query += `keyword=${author}`
            if (query.charAt(query.length - 1) === '&') query = query.slice(0, -1);

            const res = await axios.get(`${URL}/${GET_BOOKS_BY_QUERY}?${query}`);
            const books = res.data;
            bookDispatch({ type: "INITIALIZE_BOOKS", payload: books });
            setUniqueAuthors([...new Set<string>(bookState.authors)]);
        })();
    }, []);

    React.useEffect(() => {
        const tempAuthors: string[] = [];
        bookState.map((book: BookState) => {
            let trimmedAuthor = book.authors;
            trimmedAuthor = trimmedAuthor.map((author: string) => author.trim());

            tempAuthors.push(...trimmedAuthor);
        });

        if (uniqueAuthors.length === 0) {
            setUniqueAuthors([...new Set<string>(tempAuthors)]);
        }

    }, [bookState, sortingTrigger]);

    const handleSortingBooks = ({ by, value }: { by: string, value: string }) => {
        let books: BookState[] = [];

        switch (by) {
            case "title": {
                if (value === "ASC") {
                    bookDispatch({ type: "INITIALIZE_BOOKS", payload: bookState.sort((a: BookState, b: BookState) => a.title.localeCompare(b.title)) });
                }
                else {
                    bookDispatch({ type: "INITIALIZE_BOOKS", payload: bookState.sort((a: BookState, b: BookState) => b.title.localeCompare(a.title)) });
                }

                break;
            }
            case "price": {
                if (value === "ASC") {
                    bookDispatch({ type: "INITIALIZE_BOOKS", payload: bookState.sort((a: BookState, b: BookState) => a.price - b.price) });
                }
                else {
                    bookDispatch({ type: "INITIALIZE_BOOKS", payload: bookState.sort((a: BookState, b: BookState) => b.price - a.price) });
                }

                break;
            }
        }

        setSortingTrigger(!sortingTrigger);
    }

    return (
        <>
            <NavBar customerState={customerState} />
            <div className="flex ml-40">
                <div className="flex">
                    <div className="pr-10 max-w-[350px] border-r border-black">
                        <div id="sort">
                            <RightRedArrow text="Sort by" className="cursor-default font-bold" />
                            <ul className="ml-4">
                                <li><RightRedArrow text="Relevance" className="cursor-pointer text-gray-600 text-sm" /></li>
                                <li><RightRedArrow text="Best Seller" className="cursor-pointer text-gray-600 text-sm" /></li>
                                <li onClick={() => handleSortingBooks({ by: "title", value: "ASC" })}><RightRedArrow text="Title: A to Z" className="cursor-pointer text-gray-600 text-sm" /></li>
                                <li onClick={() => handleSortingBooks({ by: "title", value: "DESC" })}><RightRedArrow text="Title: Z to A" className="cursor-pointer text-gray-600 text-sm" /></li>
                                <li onClick={() => handleSortingBooks({ by: "price", value: "ASC" })}><RightRedArrow text="Price: Low to High" className="cursor-pointer text-gray-600 text-sm" /></li>
                                <li onClick={() => handleSortingBooks({ by: "price", value: "DESC" })}><RightRedArrow text="Title: High to Low" className="cursor-pointer text-gray-600 text-sm" /></li>
                                <li><RightRedArrow text="Discount: Low to High" className="cursor-pointer text-gray-600 text-sm" /></li>
                                <li><RightRedArrow text="Discount: High to Low" className="cursor-pointer text-gray-600 text-sm" /></li>
                            </ul>
                        </div>
                        <div id="filter">
                            <RightRedArrow text="Author" className="cursor-default font-bold" />
                            <ul className="ml-4">
                                {uniqueAuthors.map((author: string) => {
                                    return (
                                        <li key={`${author}`}>
                                            <RightRedArrow text={author} className="cursor-pointer text-gray-600 text-sm" />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="">
                        <h2 className="text-3xl font-bold ml-16 mb-8">Result</h2>
                        <ul id="trending-books_list" className="px-16 mb-10">
                            {bookState.map((book: BookState, i: number) => {
                                return (
                                    <div id={book.title} key={book._id} className="flex border-y border-gray-400 py-4">
                                        <BookItem book={book} />
                                        <div className="ml-10 text-right h-[216px] flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-xl text-green-600 font-bold">Available</h4>
                                                <p>Ships within {Math.floor(Math.random() * 10) + 1} Days</p>
                                                <p>Worldwide</p>
                                            </div>
                                            <div className="">
                                                <p className="text-center text-xs mb-2">Free shipping if it meets<br />
                                                    the specified conditions. <a href="#" className="text-blue-400">Explain..</a></p>
                                                <div>
                                                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Buy Now</button>
                                                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add to Wistlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

/*
function skeleton() {
    return (
        <div className="flex">
            <div className="pr-10 max-w-[350px] border-r border-black">
                <div id="sort">
                    <RightRedArrow text="Sort by" className="cursor-default font-bold" />
                    <ul className="ml-4">
                        <li><RightRedArrow text="Relevance" className="cursor-pointer text-gray-600 text-sm" /></li>
                        <li><RightRedArrow text="Best Seller" className="cursor-pointer text-gray-600 text-sm" /></li>
                        <li><RightRedArrow text="Title: A to Z" className="cursor-pointer text-gray-600 text-sm" /></li>
                        <li><RightRedArrow text="Title: Z to A" className="cursor-pointer text-gray-600 text-sm" /></li>
                        <li><RightRedArrow text="Price: Low to High" className="cursor-pointer text-gray-600 text-sm" /></li>
                        <li><RightRedArrow text="Title: High to Low" className="cursor-pointer text-gray-600 text-sm" /></li>
                        <li><RightRedArrow text="Discount: Low to High" className="cursor-pointer text-gray-600 text-sm" /></li>
                        <li><RightRedArrow text="Discount: High to Low" className="cursor-pointer text-gray-600 text-sm" /></li>
                    </ul>
                </div>
                <div id="filter">
                    <RightRedArrow text="Author" className="cursor-default font-bold" />
                    <ul className="ml-4">
                        {Array.from({ length: 3 }).map((val: unknown, index: number) => {
                            return (
                                <li key={index}>
                                    <RightRedArrow text="" className="cursor-pointer text-gray-600 text-sm" />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="">
                <h2 className="text-3xl font-bold ml-16 mb-8">Result</h2>
                <ul id="trending-books_list" className="px-16 mb-10">
                    {bookState.map((book: BookState, i: number) => {
                        return (
                            <div id={book.title} key={book._id} className="flex border-y border-gray-400 py-4">
                                <BookItem book={book} />
                                <div className="ml-10 text-right h-[216px] flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-xl text-green-600 font-bold">Available</h4>
                                        <p>Ships within {Math.floor(Math.random() * 10) + 1} Days</p>
                                        <p>Worldwide</p>
                                    </div>
                                    <div className="">
                                        <p className="text-center text-xs mb-2">Free shipping if it meets<br />
                                            the specified conditions. <a href="#" className="text-blue-400">Explain..</a></p>
                                        <div>
                                            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Buy Now</button>
                                            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add to Wistlist</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
} */
import book_1 from "../images/book_1.webp"
import author from "../images/author.jpg"
import React from "react";
import { FiveStars } from "./FiveStars";
import { Counter } from "./Counter";
import { BookInfo } from "./BookInfo";
import { Reviews } from "./Reviews";
import { useCustomer } from "../hooks/CustomerContext";
import { useNavigate } from "react-router-dom";

export function BookDetails({ book, setBook }: { book: BookState, setBook: React.Dispatch<React.SetStateAction<BookState>> }) {
    const authRef = React.useRef<HTMLInputElement>(null);
    const isAddedToCartRef = React.useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = React.useState(true);

    const [refreshComponent, setRefreshComponent] = React.useState(false);

    const [isAddedToCart, setIsAddedTocart] = React.useState(false);

    const navigate = useNavigate();

    const { customerState, handleAddItemToCart } = useCustomer();
    
    return (
        <div>
            <div id="book-card" className="mt-4 mb-10 mx-8 px-20 py-6 flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <div className="mr-10">
                    {
                        isLoading
                        &&
                        <div className="w-[256] h-[384px] bg-white animate-pulse shadow-md self-center duration-300"></div>
                    }
                    <img src={book.imgUrl} onLoad={() => setIsLoading(false)} className="w-64 mb-8" />
                    <div className="flex items-center">
                        <button onClick={() => {
                            handleAddItemToCart(book._id);

                            isAddedToCartRef.current!.className = "fixed bottom-0 right-10 -translate-y-[40px] duration-300 z-50 rounded-md bg-lime-400 px-10 py-4";

                            setTimeout(() => {
                                isAddedToCartRef.current!.className = "opacity-0 text-lime-400 duration-300 fixed bottom-0 right-10 z-50 rounded-md bg-lime-400 px-10 py-4";
                            }, 1000);
                        }} type="button" className="text-red-700 min-w-[120px] max-h-[50px] hover:border-orange-500 hover:text-orange-500 border-2 border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                            Add to cart
                        </button>
                        <button onClick={async () => {
                            await handleAddItemToCart(book._id);
                            navigate("/cart");
                        }} type="button" className="text-white bg-red-700 min-w-[120px] max-h-[50px] hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-[11.8px] text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Buy now
                            <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col ml-10">
                    <h1 className="font-semibold text-3xl">{book.title} <span className="opacity-50">- {new Date(book.releaseDate).toDateString()}</span></h1>
                    <div id="info" className="relative mb-6">
                        <ul>
                            <li>Authors: {book.authors.map(author => <a key={`${author}-${book._id}`} href="#" className="text-blue-400">{author}</a>)}</li>
                            <div className="flex items-center mb-8">
                                <FiveStars />
                                <p className="ml-8 text-cyan-600 cursor-pointer">0 reviews</p>
                            </div>
                        </ul>
                    </div>
                    <BookInfo book={book} />
                </div>
            </div>
            <Reviews bookID={book._id} reviews={book.reviews} book={book} setBook={setBook} />
            <div ref={isAddedToCartRef} className="opacity-0 fixed bottom-0 right-10 z-50 rounded-md bg-lime-400 px-10 py-4">
                <p>Successfully added to cart!</p>
            </div>
        </div>
    )
}
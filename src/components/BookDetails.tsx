import book_1 from "../images/book_1.webp"
import author from "../images/author.jpg"
import React from "react";
import { FiveStars } from "./FiveStars";
import { Counter } from "./Counter";
import { BookInfo } from "./BookInfo";
import { Reviews } from "./Reviews";

export function BookDetails() {
    const authRef = React.useRef<HTMLInputElement>(null);

    return (
        <div>
            <div id="book-card" className="mt-4 mb-10 mx-8 px-10 py-6 flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <div className="mr-10">
                    <img src={book_1} className="w-64 mb-8" alt="book" />
                    <div className="flex items-center">
                        <button type="button" className="text-red-700 border-2 border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                            Add to cart
                        </button>
                        <button type="button" className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-[11.8px] text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Buy now
                            <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="font-semibold text-3xl">The Hunger Games (Book 1) <span className="opacity-50">- January 1, 2010</span></h1>
                    <div id="info" className="relative">
                        <ul>
                            <li>Authors: <a href="#" className="text-blue-400"
                                onMouseMove={() => {
                                    if (authRef.current) authRef.current.classList.remove("hidden")
                                }}
                                onMouseOut={() => {
                                    if (authRef.current) authRef.current.classList.add("hidden")
                                }}>Suzanne Collins</a></li>
                            <div ref={authRef} className="hidden absolute top-5 z-10 left-0 flex bg-gray-100 rounded-md p-4 shadow-md">
                                {/* <img className="mr-4 w-24 h-24 flex-shrink-0 rounded-full" src={author} alt="author" /> */}
                                <p className="w-[300px]">Suzanne Collins has had a successful and prolific career writing for children's television. She has worked on the staffs of several Nickelodeon shows, including the Emmy-nominated hit Clarissa Explains It All and The Mystery Files of Shelby Woo. Collins made her mark in children's literature with the New York Times bestselling five-book series for middle-grade readers The Underland Chronicles, which has received numerous accolades in both the United States and abroad. In the award-winning The Hunger Games trilogy, Collins continues to explore the effects of war and violence on those coming of age. Collins lives with her family in Connecticut.</p>
                            </div>
                            <div className="flex items-center mb-8">
                                <FiveStars />
                                <p className="ml-8 text-cyan-600 cursor-pointer">21 reviews</p>
                            </div>
                            <Counter />
                        </ul>
                    </div>
                    <BookInfo />
                </div>
            </div>
            <Reviews />
        </div>
    )
}
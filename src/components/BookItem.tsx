import React from "react";
import commentIcon from "../images/comment-icon.png"
import { calculateAverageRating } from "../utils/caculateAverageRating";
import { FiveStars } from "./FiveStars"

interface Book {
    _id: string;
    title: string;
    authors: string[];
    imgUrl: string;
    reviews: Review[];
    price: number;
}

export function BookItem({ book, quantity }: { book: Book, quantity?: number }) {
    const { _id, title, authors, imgUrl, reviews, price } = book;

    const [errorIsHandled, setErrorIsHandled] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(true);
    const [newImgUrl, setNewImgUrl] = React.useState(imgUrl);

    const handleImgSrc = () => {
        if (!errorIsHandled) {
            if (newImgUrl.includes("images200")) setNewImgUrl(newImgUrl.replace("images200", "mainimages"));
            else setNewImgUrl(newImgUrl.replace("mainimages", "images200"));

            setErrorIsHandled(true);
        }
    }

    return (
        <li className="w-40 flex flex-col">
            <a target="_blank" href={`/book/id/${_id}`} className="relative inline-block w-36 h-[216px]">
                {
                    isLoading
                    &&
                    <div className="absolute top-0 left-0 w-36 bg-white h-[216px] animate-pulse shadow-md self-center hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] duration-300"></div>
                }
                <img src={newImgUrl} onLoad={() => setIsLoading(false)} onError={handleImgSrc} className="absolute top-0 left-0 w-36 h-[216px] shadow-md self-center hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] duration-300" alt="" />
                {
                    quantity
                    &&
                    <div className="absolute bottom-2 right-2 flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                        <span className="text-white font-bold text-sm">x{quantity}</span>
                    </div>
                }
            </a>
            <div className="mb-1">
                <h3 className="truncate">
                    <a href={`/book/id/${_id}`} className="text-blue-800">{title}</a>
                </h3>
                <p className="max-h-[100px] overflow-y-hidden">{authors.map((author, i: number) => <><span className="text-xs">{author}</span>{i != authors.length - 1 ? <span>, </span> : ""}</>)}</p>
            </div>
            {
                reviews
                    ?
                    <div id="ratings" className="flex items-center">
                        <FiveStars rating={calculateAverageRating(reviews)} />
                        <a href="#" className="ml-3 text-sm text-cyan-800">{reviews.length}<span className="pl-1"><img src={commentIcon} alt="comment" className="inline w-4" /></span></a>
                    </div>
                    :
                    ""
            }
            <div className="prices">
                <p className="py-1 rounded-xl w-fit font-[750] text-red-800"><span className="text-xs">US$</span> {price}
                </p>
            </div>
        </li>
    )
}
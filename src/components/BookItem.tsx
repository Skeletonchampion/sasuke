import React from "react";
import commentIcon from "../images/comment-icon.png"
import { FiveStars } from "./FiveStars"

interface Book {
    _id: string;
    title: string;
    authors: string[];
    imgUrl: string;
    price: number;
}

export function BookItem({book}: {book: Book}) {
    const { _id, title, authors, imgUrl, price } = book;
    
    const [isLoading,  setIsLoading] = React.useState(true);
    const [newImgUrl, setNewImgUrl] = React.useState(imgUrl);

    const handleImgSrc = () => {
        if(newImgUrl.includes("images200")) setNewImgUrl(newImgUrl.replace("images200", "mainimages"));
        else setNewImgUrl(newImgUrl.replace("mainimages", "images200"));
    }

    return (
        <li className="w-40 flex flex-col">
            <a href={`/book/id/${_id}`}>
                {
                    isLoading
                    &&
                    <div className="w-36 bg-white h-[216px] animate-pulse shadow-md self-center hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] duration-300"></div>
                }
                <img src={newImgUrl} onLoad={() => setIsLoading(false)} onError={handleImgSrc} className="w-36 shadow-md self-center hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] duration-300" alt="" />
            </a>
            <div className="mb-1">
                <h3 className="truncate">
                    <a href={`/book/id/${_id}`} className="text-blue-800">{title}</a>
                </h3>
                <p className="max-h-[100px] overflow-y-hidden">{authors.map((author, i: number) => <><span className="text-xs">{author}</span>{i != authors.length-1 ? <span>, </span> : ""}</>)}</p>
            </div>
            {/* <div id="ratings" className="flex items-center">
                <FiveStars />
                <a href="#" className="ml-3 text-sm text-cyan-800">{reviews}<span className="pl-1"><img src={commentIcon} alt="comment" className="inline w-4" /></span></a>
            </div> */}
            <div className="prices">
                <p className="py-1 rounded-xl w-fit font-[750] text-red-800"><span className="text-xs">US$</span> {price}</p>
            </div>
        </li>
    )
}
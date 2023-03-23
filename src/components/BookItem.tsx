import commentIcon from "../images/comment-icon.png"
import { FiveStars } from "./FiveStars"

interface Book {
    title: string;
    authors: string;
    relativePath: string;
    rating: number;
    reviews: number;
    price: number;
}

export function BookItem({title, authors, relativePath, rating, reviews, price}: Book) {

    return (
        <li className="w-40 flex flex-col">
            <a href="book"><img src={relativePath} className="w-36 shadow-md self-center hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] duration-300" alt="" /></a>
            <div className="mb-1">
                <h3>
                    <a href="#" className="text-blue-800">{title}</a>
                </h3>
                <p>{authors}</p>
            </div>
            <div id="ratings" className="flex items-center">
                <FiveStars />
                <a href="#" className="ml-3 text-sm text-cyan-800">{reviews}<span><img src={commentIcon} alt="comment" className="inline w-4" /></span></a>
            </div>
            <div className="prices">
                <p className="py-1 rounded-xl w-fit text-lg font-md text-red-800">US$ {price}</p>
            </div>
        </li>
    )
}
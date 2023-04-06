import axios from "axios"
import { nanoid } from "nanoid"
import { useGlobal } from "../hooks/globalContext"
import { BookItem } from "./BookItem"
import { FiveStars } from "./FiveStars"

interface TrendingBooksProps {
    bookState: BookState[];
    bookDispatch: React.Dispatch<Action>;
}

export function TrendingBooks({ bookState, bookDispatch }: TrendingBooksProps) {
    const { URL, GET_BOOKS } = useGlobal();

    const handleGetMoreBooks = async () => {
        const res = await axios.get(`${URL}/${GET_BOOKS}`);
        const books = res.data;
        bookDispatch({ type: "ADD_BOOKS", payload: books });
    }

    return (
        <div id="trending-books" className="my-10 bg-gray-200 flex flex-col items-center">
            <a href="#"><h2 className="font-semibold text-3xl my-6 ml-4">Trending Books</h2></a>
            <ul id="trending-books_list" className="px-16 mb-10 grid gap-4 grid-cols-5 ">
                {/* <BookItem title="The Hunger Games (Book 1)" authors="Suzanne Collins" relativePath="src\images\book_1.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="West with Giraffes: A Novel" authors="Rutledge, Lynda" relativePath="src\images\book_2.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="October Surprise" authors="Suzanne Collins" relativePath="src\images\book_3.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="Catching Fire (The Hunger Games)" authors="Collins, Suzanne" relativePath="src\images\book_4.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="The Seven Husbands of Evelyn Hugo: A Novel" authors="Reid, Taylor Jenkins" relativePath="src\images\book_5.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="The Hunger Games (Book 1)" authors="Suzanne Collins" relativePath="src\images\book_1.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="West with Giraffes: A Novel" authors="Rutledge, Lynda" relativePath="src\images\book_2.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="October Surprise" authors="Honegger, Barbara" relativePath="src\images\book_3.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="Catching Fire (The Hunger Games)" authors="Collins, Suzanne" relativePath="src\images\book_4.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="The Seven Husbands of Evelyn Hugo: A Novel" authors="Reid, Taylor Jenkins" relativePath="src\images\book_5.webp" rating={4.21} reviews={21} price={43} /> */}
                {bookState.map((book: BookState, i: number) => {
                    return <BookItem key={book._id} book={book} />
                })}
            </ul>
            <button
            onClick={handleGetMoreBooks}
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-20 py-4 text-center mb-8">More</button>
        </div>
    )
}
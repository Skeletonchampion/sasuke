import book_1 from "../images/book_1.webp"
import book_2 from "../images/book_2.webp"
import book_3 from "../images/book_3.webp"
import book_4 from "../images/book_4.webp"
import book_5 from "../images/book_5.webp"
import { BookItem } from "./BookItem"
import { FiveStars } from "./FiveStars"

export function TrendingBooks() {
    return (
        <div id="trending-books" className="my-10 bg-gray-200 flex flex-col items-center">
            <a href="#"><h2 className="font-semibold text-3xl my-6 ml-4">Trending Books</h2></a>
            <ul id="trending-books_list" className="px-16 mb-10 grid gap-4 grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                <BookItem title="The Hunger Games (Book 1)" authors="Suzanne Collins" relativePath="src\images\book_1.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="West with Giraffes: A Novel" authors="Rutledge, Lynda" relativePath="src\images\book_2.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="October Surprise" authors="Suzanne Collins" relativePath="src\images\book_3.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="Catching Fire (The Hunger Games)" authors="Collins, Suzanne" relativePath="src\images\book_4.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="The Seven Husbands of Evelyn Hugo: A Novel" authors="Reid, Taylor Jenkins" relativePath="src\images\book_5.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="The Hunger Games (Book 1)" authors="Suzanne Collins" relativePath="src\images\book_1.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="West with Giraffes: A Novel" authors="Rutledge, Lynda" relativePath="src\images\book_2.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="October Surprise" authors="Honegger, Barbara" relativePath="src\images\book_3.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="Catching Fire (The Hunger Games)" authors="Collins, Suzanne" relativePath="src\images\book_4.webp" rating={4.21} reviews={21} price={43} />
                <BookItem title="The Seven Husbands of Evelyn Hugo: A Novel" authors="Reid, Taylor Jenkins" relativePath="src\images\book_5.webp" rating={4.21} reviews={21} price={43} />
            </ul>
        </div>
    )
}
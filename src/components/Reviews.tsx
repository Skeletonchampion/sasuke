import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../hooks/CustomerContext";
import { useGlobal } from "../hooks/globalContext";
import { ReviewReducer, ReviewInitialState } from "../hooks/ReviewReducer";
import { AdvancedRating } from "./AdvancedRating";
import { FiveStars } from "./FiveStars";
import { RatingStars } from "./RatingStars";

import _ from "lodash";

import avatar from "../images/avatar.png"
import { calculateDateDiff } from "../utils/calculateDateDiff";
import { Pagination } from "./Pagination";

interface ReviewsProps {
    bookID: string;
    reviews: Review[];
    book: BookState;
    setBook: React.Dispatch<React.SetStateAction<BookState>>;
}

export function Reviews({ bookID, reviews, book, setBook }: ReviewsProps) {
    const reviewRef = React.useRef<HTMLDivElement>(null);
    const buttsonRef = React.useRef<HTMLButtonElement>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const { customerState } = useCustomer();

    const { URL, ADD_REVIEW } = useGlobal();

    const navigate = useNavigate();

    const [reviewState, reviewDispatch] = React.useReducer(ReviewReducer, ReviewInitialState);
    const { isEnabled, isLoading, isRefreshed, comment, rating } = reviewState;

    const [ratingDetails, setRatingDetails] = React.useState<number[]>([-1, 0, 0, 0, 0, 0]);

    const [initialized, setInitialized] = React.useState(true);
    const [newReview, setNewReview] = React.useState<Review>({
        _id: "",
        bookID: "",
        customerID: {
            _id: "",
            username: ""
        },
        comment: "",
        rating: "",
        createdAt: new Date()
    });
    React.useEffect(() => {
        if (initialized && reviews.length > 0) {
            const newRatingDetails = [...ratingDetails];

            reviews.forEach((review) => {
                ++newRatingDetails[parseInt(review.rating)];
            });

            setRatingDetails(newRatingDetails);

            return setInitialized(false);;
        }
        else {
            const newRatingDetails = [...ratingDetails];

            ++newRatingDetails[parseInt(newReview.rating)];

            setRatingDetails(newRatingDetails);
        }

    }, [reviews]);

    const handleRatingChange = (e: any) => {
        reviewDispatch({ type: "SET_FIELD", field: "rating", payload: parseInt(e.target.value) })
    }

    const handleSubmitReview = async (e: any) => {
        if (comment.length <= 20) return;

        const body = {
            bookID,
            customerID: customerState.customer._id,
            comment,
            rating
        }

        await axios.post(`${URL}/${ADD_REVIEW}`, body);

        reviewDispatch({ type: "FINISH_REVIEW" });
        if (reviewRef.current) {
            reviewRef.current.className = "opacity-0 translate-x-[100px] duration-300 flex flex-col";
            setTimeout(() => {
                reviewRef.current?.classList.add("w-0 h-0");
            }, 300);
            textareaRef.current?.classList.add("hidden");
        }

        const newReview: Review = {
            _id: `tempID-${reviews.length}`,
            bookID: "tempBookID",
            customerID: {
                _id: customerState.customer._id,
                username: customerState.customer.username
            },
            comment,
            rating: rating.toString(),
            createdAt: new Date()
        }
        setNewReview(newReview);

        const newBook = _.cloneDeep(book);
        newBook.reviews = [...book.reviews, newReview];

        setBook(newBook);
    }

    return (
        <div>
            <h3 className="ml-8 font-bold text-2xl">Reviews</h3>
            <AdvancedRating reviews={reviews} numOfRatings={reviews.length} ratingDetails={ratingDetails} />
            <div className="flex items-start mb-10">
                {
                    isEnabled
                        ?
                        /* Submit Review Button */
                        <button
                            onClick={async (e) => {
                                handleSubmitReview(e);
                            }}
                            className="inline-flex items-center justify-center p-0.5 mb-10 ml-8 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                <svg className="inline pb-1 pr-2" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M3,17.25V21h3.75L17.81,9.94l-3.75-3.75L3,17.25z M20.71,7.04c0.39-0.39,0.39-1.02,0-1.41l-2.34-2.34c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75L20.71,7.04z" />
                                </svg>
                                Submit review
                            </span>
                        </button>
                        :
                        /* Write Comment Button */
                        <button
                            onClick={() => {
                                if (!customerState.accessToken) return navigate("/login");

                                reviewDispatch({ type: "OPEN_REVIEW" });
                                if (reviewRef.current) {
                                    reviewRef.current.className = "opacity-100 duration-300 flex flex-col";
                                    textareaRef.current?.classList.remove("hidden");
                                }
                            }}
                            className="inline-flex items-center justify-center p-0.5 mb-10 ml-8 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                <svg className="inline pb-1 pr-2" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M3,17.25V21h3.75L17.81,9.94l-3.75-3.75L3,17.25z M20.71,7.04c0.39-0.39,0.39-1.02,0-1.41l-2.34-2.34c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75L20.71,7.04z" />
                                </svg>
                                Write a review
                            </span>
                        </button>
                }
                {/* Review Input */}
                <div ref={reviewRef} className="opacity-0 w-0 h-0 translate-x-[100px] duration-300 flex flex-col">
                    <RatingStars selectedRating={rating} handleRatingChange={handleRatingChange} />
                    <div>
                        <textarea
                            ref={textareaRef}
                            className="resize-none outline-none scroll overflow-hidden border border-gray-400 p-2 rounded-md"
                            id="review-body"
                            rows={7}
                            cols={70}
                            required
                            placeholder="Write at least 20 characters..."
                            onChange={(e) => reviewDispatch({ type: "SET_FIELD", field: "comment", payload: e.target.value })}
                            value={comment}
                        ></textarea>
                    </div>
                </div>
            </div>
            {/* Comment Section */}
            <div className="border-y border-gray-200 mx-8 py-4 ">
                <div className="flex">
                    <div className="mb-10 flex items-start relative">
                        <ul>
                        {
                            reviews.length === 0
                                ?
                                <p>No customer reviews</p>
                                :
                                reviews.slice().reverse().map(review => {
                                    return (
                                        <li key={review._id} className="ml-40">
                                            <div className="mt-4 flex items-center">
                                                <div className="w-[160px] flex justify-between items-center mr-10">
                                                    <div className="mt-4 flex flex-col">
                                                        <div className="mb-2">
                                                            <img className="w-12 h-12 rounded-full" src={avatar} alt="avatar" />
                                                        </div>
                                                        <div className="text-sm font-semibold">{review.customerID.username} • <span className="font-normal"> {calculateDateDiff(new Date(review.createdAt))}</span></div>
                                                    </div>
                                                </div>
                                                <div className="mt-8">
                                                    <FiveStars rating={review.rating} onComment={true} />
                                                    <p className="mt-4 text-md text-gray-600">{review.comment}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                        }
                        </ul>
                        <Pagination previous="#" next="#" />
                    </div>
                </div>
            </div>
        </div>
    )
}
import { calculateAverageRating } from "../utils/caculateAverageRating";
import { calculatePercentOfRating } from "../utils/calculatePercentOfRating";
import { convertNumberToArray } from "../utils/convertNumberToArray";

interface AdvancedRatingProps {
    reviews: Review[];
    numOfRatings: number;
    ratingDetails: number[];
}

export function AdvancedRating({ reviews, numOfRatings, ratingDetails }: AdvancedRatingProps) {
    return (
        <div className="my-10 ml-8">
            <div className="flex items-center mb-3">
                {
                    convertNumberToArray(parseInt(calculateAverageRating(reviews))).map(i => {
                        return (
                            <svg key={`review-${i}`} aria-hidden="true" className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        )
                    })
                }
                {
                    convertNumberToArray(5 - parseInt(calculateAverageRating(reviews))).map(i => {
                        return (
                            <svg key={`review____-${i}`} aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        )
                    })
                }
                <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{calculateAverageRating(reviews)} out of 5</p>
                <p className="ml-10 text-sm font-medium text-gray-500 dark:text-gray-400">{numOfRatings} Global Ratings</p>
            </div>
            {/* Progressing Bar  */}
            <div>
                <div className="flex items-center mt-4">
                    <p className="w-[5ch] text-sm font-medium text-blue-600 dark:text-blue-500">5 star</p>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-400 rounded" style={{ width:calculatePercentOfRating(ratingDetails[5], reviews.length)} }></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{calculatePercentOfRating(ratingDetails[5], reviews.length)}</span>
                </div>
                <div className="flex items-center mt-4">
                    <p className="w-[5ch] text-sm font-medium text-blue-600 dark:text-blue-500">4 star</p>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-400 rounded" style={{ width: calculatePercentOfRating(ratingDetails[4], reviews.length)} }></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{calculatePercentOfRating(ratingDetails[4], reviews.length)}</span>
                </div>
                <div className="flex items-center mt-4">
                    <p className="w-[5ch] text-sm font-medium text-blue-600 dark:text-blue-500">3 star</p>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-400 rounded" style={{ width: calculatePercentOfRating(ratingDetails[3], reviews.length)} }></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{calculatePercentOfRating(ratingDetails[3], reviews.length)}</span>
                </div>
                <div className="flex items-center mt-4">
                    <p className="w-[5ch] text-sm font-medium text-blue-600 dark:text-blue-500">2 star</p>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-400 rounded" style={{ width: calculatePercentOfRating(ratingDetails[2], reviews.length)} }></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{calculatePercentOfRating(ratingDetails[2], reviews.length)}</span>
                </div>
                <div className="flex items-center mt-4">
                    <p className="w-[5ch] text-sm font-medium text-blue-600 dark:text-blue-500">1 star</p>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                        <div className="h-5 bg-yellow-400 rounded" style={{ width: calculatePercentOfRating(ratingDetails[1], reviews.length)} }></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{calculatePercentOfRating(ratingDetails[1], reviews.length)}</span>
                </div>
            </div>
        </div>
    )
}
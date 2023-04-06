import { AdvancedRating } from "./AdvancedRating";

export function Reviews() {
    return (
        <div>
            <h3 className="ml-8 font-bold text-2xl">Reviews</h3>
            <AdvancedRating />
            <button className="inline-flex items-center justify-center p-0.5 mb-10 ml-8 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <svg className="inline pb-1 pr-2" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M3,17.25V21h3.75L17.81,9.94l-3.75-3.75L3,17.25z M20.71,7.04c0.39-0.39,0.39-1.02,0-1.41l-2.34-2.34c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75L20.71,7.04z" />
                    </svg>
                    Write a review
                </span>
            </button>
            <div className="border-y border-gray-200 mx-8 py-4 ">
                <div className="flex">
                    <ul className="mx-auto">
                        <p>No customer reviews</p>
                    </ul>
                </div>
            </div>
        </div>
    )
}
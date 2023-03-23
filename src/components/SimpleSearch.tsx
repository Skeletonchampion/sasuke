import newBookReleases from "../images/new-book-releases.png"

export function SimpleSearch() {
    return (
        <div className="flex mx-14 flex-col xl:flex-row">
            <div className="bg-gray-100 w-[600px] mx-4 p-5 rounded-md">
                <h4 className="text-red-700 font-bold my-3"></h4>
                <p className="text-2xl">Search for books, fine art and collectibles</p>
                <div className="simple-search">
                    <div id="author" className="my-4">
                        <label className="font-bold">Author</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="author-input" className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-8 pr-2.5 py-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter author" required />
                        </div>
                    </div>
                    <div id="title" className="my-4">
                        <label className="font-bold">Title</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="title-input" className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-8 pr-2.5 py-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter title" required />
                        </div>
                    </div>
                    <div id="keyword" className="my-4">
                        <label className="font-bold">Keyword</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="keyword-input" className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-8 pr-2.5 py-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter keyword" required />
                        </div>
                    </div>
                </div>
                <button className="rounded-2xl w-full text-white mt-8 px-6 py-2 bg-cyan-600 hover:bg-blue-600 duration-300">Search</button>
            </div>

            {/* End here!!!*/}

            <div className="relative mx-4 rounded-md">
                <img src={newBookReleases} alt="newBookReleases?" className="rounded-md" />
                <div>
                    <h4 className="text-3xl">New book releases</h4>
                    <p className="w-[80%]">From Prince Harry's memoir to Michael Connelly's latest novel, explore our recommended new books and discover literature that has everyone talking.</p>
                    <a href="#" className="text-blue-700 text-right w-full block">See the books</a>
                </div>
            </div>
        </div>
    )
}
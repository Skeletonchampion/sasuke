import logo from "../images/logo.png"

export function Footer() {
    return (
        <footer className="footer-1 bg-gray-100 mt-14 py-8 sm:py-12">
            <div className="container mx-auto px-4">
                <div className="sm:flex justify-center sm:flex-wrap sm:-mx-4 md:py-4">
                    <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
                        <h5 className="text-xl font-bold mb-6">Shop With Us</h5>
                        <ul className="list-none footer-links">
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Advanced Search</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Browse Collections</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">My Account</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">My Orders</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">View Basket</a>
                            </li>
                        </ul>
                    </div>
                    <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
                        <h5 className="text-xl font-bold mb-6">Find Help</h5>
                        <ul className="list-none footer-links">
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Help</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Customer Support</a>
                            </li>
                        </ul>
                    </div>
                    <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
                        <h5 className="text-xl font-bold mb-6">About Us</h5>
                        <ul className="list-none footer-links">
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Media</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Careers</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Forums</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
                        <h5 className="text-xl font-bold mb-6">Follow Us</h5>
                        <ul className="list-none footer-links">
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Facebook</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Twitter</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">YouTube</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center text-xs mt-4 flex flex-col items-center">
                <img src={logo} className="w-36" alt="logo?" />
                <div>
                    <p className="my-2">By using the Website, you confirm that you have read, understood, and agreed to be bound by the Terms and Conditions.</p>
                    <p className="my-2">© 2002 - 2023 VBooks Inc. All Rights Reserved. VBooks, the VBooks logo, VBooks.com, "Passion for books." and "Passion for books. Books for your passion." are registered trademarks with the Registered US Patent & Trademark Office.</p>
                </div>
            </div>
        </footer>
    )
}
import { FormEvent } from "react";
import { useAuth } from "../hooks/authContext";
import logo from "../images/logo.png"
import library from "../images/library.jpeg"

export function LoginPage() {
    const { loginState, loginDispatch, performLogin } = useAuth();
    const { message, error, isLoading, isError } = loginState;

    return (
        <>
            <div className="lg:flex">
                <div className="lg:w-1/2 xl:max-w-screen-sm">
                    <div className="py-12 bg-cyan-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                        <a href="/">
                            <img src={logo} className="w-36 rounded-md" alt="logo?" />
                        </a>
                    </div>
                    <div className="mt-4 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-4 xl:px-24 xl:max-w-2xl">
                        <h2 className="text-center text-4xl text-cyan-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Login</h2>
                        <div className="mt-12">
                            <form id="login-form" onSubmit={(e: FormEvent<HTMLFormElement>) => performLogin(e)}>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
                                    <input className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-cyan-500" type="" placeholder="Enter your username"
                                        onChange={(e) => loginDispatch({
                                            type: "SET_FIELD",
                                            field: "username",
                                            payload: { field: e.target.value }
                                        })}
                                        value={loginState.username} />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Password
                                        </div>
                                        <div>
                                            <a className="text-xs font-display font-semibold text-cyan-600 hover:text-cyan-800
                                        cursor-pointer">
                                                Forgot Password?
                                            </a>
                                        </div>
                                    </div>

                                    <input className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-cyan-500" placeholder="Enter your password"
                                        onChange={(e) => loginDispatch({
                                            type: "SET_FIELD",
                                            field: "password",
                                            payload: { field: e.target.value }
                                        })}
                                        type="password"
                                        value={loginState.password} />
                                </div>
                                <div className="mt-10 mb-8">
                                    <button className="bg-cyan-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-cyan-600
                                shadow-lg">
                                        Login
                                    </button>
                                </div>
                            </form>
                            {error
                                ?
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">Error! </span>{error}
                                </div>
                                : ""
                            }
                            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                                Don't have an account ? <a href="register" className="cursor-pointer text-cyan-600 hover:text-cyan-800">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-cyan-100 flex-1 h-screen">
                    <img src={library} className="h-full" alt="library?" />
                </div>
            </div>
        </>
    )
}
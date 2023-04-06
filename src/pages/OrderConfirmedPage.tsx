import React from "react";
import { useNavigate } from "react-router-dom";
import { CartItems } from "../components/CartItems";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../hooks/authContext";
import { useCustomer } from "../hooks/CustomerContext";

export function OrderConfirmedPage() {
    const [isLoading, setIsLoading] = React.useState(true);

    const { checkAuth } = useAuth();
    const { customerState } = useCustomer();
    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            await checkAuth();
            setIsLoading(false);
        })();
    }, [customerState.accessToken]);

    return (
        <>
            {
                isLoading == true
                    ?
                    ""
                    :
                    <>
                        <NavBar customerState={customerState} />
                        <div className="bg-white p-12 mx-20 rounded-lg border-l-2 border-t-2 border-blue-700 shadow-[5px_5px_rgba(0,_0,_255,_0.4),_10px_10px_rgba(0,_0,_255,_0.3),_15px_15px_rgba(0,_0,_255,_0.2),_20px_20px_rgba(0,_0,_255,_0.1),_25px_25px_rgba(0,_0,_255,_0.05)] text-center">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold inline-block">Order Successful!</h1>
                            </div>
                            <p className="text-gray-600 text-lg mb-8">
                                Thank you for your purchase. We have received your order and will begin processing it shortly. You will receive a confirmation email with your order details.
                            </p>
                            <p className="text-lg mb-8 text-yellow-500">Your estimated shipping time is 4 days.</p>
                            <button onClick={() => navigate("/")} className="bg-indigo-500 text-white rounded-lg px-6 py-3 hover:bg-green-600 transition-colors duration-200">
                                Continue Shopping
                            </button>
                        </div>
                        <Footer />
                    </>
            }
        </>
    )
}
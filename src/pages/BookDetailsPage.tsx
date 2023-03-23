import React from "react";
import { useAuth } from "../hooks/authContext";
import { useCustomer } from "../hooks/CustomerContext";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { BookDetails } from "../components/BookDetails";

export function BookDetailsPage() {
    const [isLoading, setIsLoading] = React.useState(true);

    const { checkAuth } = useAuth();
    const { customerState } = useCustomer();

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
                        <BookDetails />
                        <Footer />
                    </>
            }
        </>
    )
}
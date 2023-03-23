import React from "react";
import { useAuth } from "../hooks/authContext";
import { useCustomer } from "../hooks/CustomerContext";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { NavBar } from "../components/NavBar";

export function HomePage() {
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
                        <Main />
                        <Footer />
                    </>
            }
        </>
    )
}
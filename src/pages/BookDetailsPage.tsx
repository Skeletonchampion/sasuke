import React from "react";
import { useAuth } from "../hooks/authContext";
import { useCustomer } from "../hooks/CustomerContext";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { BookDetails } from "../components/BookDetails";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGlobal } from "../hooks/globalContext";

export function BookDetailsPage() {
    const [isLoading, setIsLoading] = React.useState(true);

    const [book, setBook] = React.useState<BookState>({
        _id: "", title: "", authors: [], imgUrl: "", summary: "", category: "",
        details: {
            isbn10: "",
            isbn13: "",
            weight: "",
            width: "",
            height: "",
            pages: 0,
        },
        publisher: "", releaseDate: new Date, price: 0,
        reviews: [], rating: 0
    });

    const { id } = useParams<{ id: string }>();

    const { checkAuth } = useAuth();
    const { customerState } = useCustomer();
    const { URL } = useGlobal();

    React.useEffect(() => {
        (async () => {
            await checkAuth();
            setIsLoading(false);
        })();
    }, [customerState.accessToken]);

    React.useEffect(() => {
        (async () => {
            const res = await axios.get(`${URL}/books/id/${id}`);

            setBook(res.data.book);
        })();
    }, []);

    return (
        <>
            {
                isLoading == true
                    ?
                    ""
                    :
                    <>
                        <NavBar customerState={customerState} />
                        <BookDetails book={book} setBook={setBook} />
                        <Footer />
                    </>
            }
        </>
    )
}
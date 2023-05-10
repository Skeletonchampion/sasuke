interface Review {
    _id: string;
    bookID: string;
    customerID: {
        _id: string;
        username: string;
    };
    comment: string;
    rating: string;
    createdAt: Date;
}

interface BookState {
    _id: string;
    title: string;
    authors: string[];
    imgUrl: string;
    summary: string;
    category: string;
    details: {
        isbn10: string;
        isbn13: string;
        weight: string;
        width: string;
        height: string;
        pages: number;
    };
    publisher: string;
    releaseDate: Date;
    price: number;
    reviews: Review[];
    rating: number;
}

interface OrderedBook {
    book: BookState;
    quantity: number;
}

interface Order {
    _id: string;
    customerID: string;
    items: OrderedBook[];
    orderDate: Date;
    totalPrice: number;
}
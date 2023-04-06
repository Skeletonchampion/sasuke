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
}
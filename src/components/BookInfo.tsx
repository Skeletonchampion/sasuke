export function BookInfo({ book }: { book: BookState }) {
    const { publisher, category, details } = book;

    return (
        <div className="mt-auto border-t border-black py-4 pr-2">
            <h4 className="font-semi-bold text-2xl mb-4">Book Details</h4>
            <ul>
                {details.isbn13 && <li><span className="font-medium pr-2">ISBN13:</span> {details.isbn13}</li>}
                {details.isbn10 && <li><span className="font-medium pr-2">ISBN10:</span> {details.isbn10}</li>}
                <li><span className="font-medium pr-2">Publisher:</span> {publisher}</li>
                <li><span className="font-medium pr-2">Language:</span> English</li>
                <li><span className="font-medium pr-2">Paperback:</span>{details.pages} pages</li>
                {details.weight && <li><span className="font-medium pr-2">Item Weight:</span> {details.weight}</li>}
                {details.width && <li><span className="font-medium pr-2">Item Width:</span> {details.width}</li>}
                {details.height && <li><span className="font-medium pr-2">Item Height:</span> {details.height}</li>}
            </ul>
        </div>
    )
}
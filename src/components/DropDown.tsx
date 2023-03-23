interface DropDownProps {
    dropDownRef: React.RefObject<HTMLInputElement>;
}

export function DropDown({dropDownRef} : DropDownProps) {
    return (
        <div ref={dropDownRef} className="opacity-0 h-0">
            <ul className="border-x border-b border-gray-400 bg-gray-200 py-4 px-12 flex justify-between">
                <div>
                    <h4 className="font-semibold text-lg">Art & Collectibles</h4>
                    <ul>
                        <li>Fine Art</li>
                        <li>Comic Books</li>
                        <li>Graphic Novels</li>
                        <li>Paper Collectibles</li>
                        <li>First Edition Books</li>
                        <li>Magazines & Periodicals</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg">Art & Collectibles</h4>
                    <ul>
                        <li>Fine Art</li>
                        <li>Comic Books</li>
                        <li>Graphic Novels</li>
                        <li>Paper Collectibles</li>
                        <li>First Edition Books</li>
                        <li>Magazines & Periodicals</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg">Art & Collectibles</h4>
                    <ul>
                        <li>Fine Art</li>
                        <li>Comic Books</li>
                        <li>Graphic Novels</li>
                        <li>Paper Collectibles</li>
                        <li>First Edition Books</li>
                        <li>Magazines & Periodicals</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg">Art & Collectibles</h4>
                    <ul>
                        <li>Fine Art</li>
                        <li>Comic Books</li>
                        <li>Graphic Novels</li>
                        <li>Paper Collectibles</li>
                        <li>First Edition Books</li>
                        <li>Magazines & Periodicals</li>
                    </ul>
                </div>
            </ul>
        </div>
    )
}
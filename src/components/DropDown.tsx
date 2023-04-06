interface DropDownProps {
    dropDownRef: React.RefObject<HTMLInputElement>;
}

export function DropDown({ dropDownRef }: DropDownProps) {
    return (
        <div ref={dropDownRef} className="hidden opacity-0 h-0 px-4 z-20 duration-300 absolute top-30 left-0 w-[300px]">
            <ul className="border-x border-b border-gray-400 bg-white text-md text-gray-500">
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/art_photography">Art & Photography</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/biographies_memoirs">Biographies & Memoirs</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/dictionaries_language">Dictionaries & Language</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/literature_literary-studies">Literature & literary studies</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/english-language-teaching">English Language Teaching</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/fiction">Fiction</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/references_encyclopedias">References & Encyclopedias</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/history_humanities">History & Humanities</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/society_social-sciences">Society & social sciences</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/business_economics">Business & Economics</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/law">Law</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/medicine">Medicine</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/science_mathematics">Science & Mathematics</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/environment_geography">Environment & Geography</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/technology_engineering">Technology & Engineering</a></li>
                <li className="hover:bg-gray-200 py-3 px-4 border-r-4 border-transparent hover:border-black"><a href="/category/computer_internet">Computer & Internet</a></li>
            </ul>
        </div>
    )
}
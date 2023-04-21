export function RightRedArrow({ text, className }: { text: string, className: string }) {
    return (
        <div className="flex">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="red">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
            </svg>
            <span className={className}>{text}</span>
        </div>
    )
}
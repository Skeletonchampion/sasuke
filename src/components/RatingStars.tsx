import React from "react";

interface RatingStarsProps {
    selectedRating: number;
    handleRatingChange: (e: any) => void; 
}

export function RatingStars({ selectedRating, handleRatingChange }: RatingStarsProps) {
    const [ratingTitle, setRatingTitle] = React.useState(["",
                                            "Terrible experience, not recommended.",
                                            "Okay, but needs improvement.",
                                            "Good, with room for improvement.",
                                            "Great experience, helpful support.",
                                            "Outstanding experience, highly recommended."]);

    return (
        <div className="flex items-center mb-2">
            <div className="rating mr-4">
                <input type="radio" name="rating-1" checked={selectedRating === 1} className="mask mask-star bg-orange-400" value="1" onChange={handleRatingChange} />
                <input type="radio" name="rating-1" checked={selectedRating === 2} className="mask mask-star bg-orange-400" value="2" onChange={handleRatingChange} />
                <input type="radio" name="rating-1" checked={selectedRating === 3} className="mask mask-star bg-orange-400" value="3" onChange={handleRatingChange} />
                <input type="radio" name="rating-1" checked={selectedRating === 4} className="mask mask-star bg-orange-400" value="4" onChange={handleRatingChange} />
                <input type="radio" name="rating-1" checked={selectedRating === 5} className="mask mask-star bg-orange-400" value="5" onChange={handleRatingChange} />
            </div>
            <p className="font-semibold">{ratingTitle[selectedRating]}</p>
        </div>
    )
}
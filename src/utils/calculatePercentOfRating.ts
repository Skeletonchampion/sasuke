interface calculatePercentOfRatingProps {
    total?: number;
    rating: number;
}

export function calculatePercentOfRating(rating: number, total?: number) {
    if(!total) total = 5;

    const percentage = (rating / total) * 100;

    if (percentage % 1 === 0) {
        return percentage.toFixed(0) + "%";
    } else {
        if((percentage*100) % (0.1*100) === 0) {
            return percentage.toFixed(1) + "%";
        }
        
        return percentage.toFixed(2) + "%";
    }
}
export function calculateAverageRating(reviews: Review[]): string {
    if (reviews.length === 0) {
        return "0.00";
    }

    const sum = reviews.reduce((total, review) => total + parseInt(review.rating), 0);
    const average = sum / reviews.length;
    
    const formattedAverage = average.toFixed(2);

    return formattedAverage;
}
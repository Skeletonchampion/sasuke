export function calculateDateDiff(createdAt: Date) {
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();

    let result = '';
    if (diff < 60000) {
        result = 'just now';
    } else if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        result = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        result = `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
        const days = Math.floor(diff / 86400000);
        result = `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }

    return result;
}
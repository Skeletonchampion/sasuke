export function getTotalProfitString(profit: number): string {
    if (!profit) return "";

    if (profit >= 1000 && profit < 1000000) {
        return "$" + (profit / 1000).toFixed(1) + "K";
    } else if (profit >= 1000000) {
        return "$" + (profit / 1000000).toFixed(1) + "M";
    } else {
        return "$" + profit.toString();
    }
}

export function getTotalViewsString(views: number): string {
    if (!views) return "";

    if (views >= 1000 && views < 1000000) {
        return (views / 1000).toFixed(1) + "K";
    } else if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + "M";
    } else {
        return views.toString();
    }
}

export function getTotalProducts(products: number): string {
    if(!products) return "";

    return `${products}`;
}

export function getTotalCustomers(customers: number): string {
    if(!customers) return "";


    return `${customers}`;
}
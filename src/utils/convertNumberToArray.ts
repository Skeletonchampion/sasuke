export function convertNumberToArray(number: number) {
    const arr = [];
    const integer = Math.floor(number);

    for (let i = 1; i <= integer; i++) {
        arr.push(i);
    }

    return arr;
}
export function formatPrice(amount: number): string {
    return new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} хв`;
    }

    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;

    if (rest === 0) {
        return `${hours} год`;
    }

    return `${hours} год ${rest} хв`;
}

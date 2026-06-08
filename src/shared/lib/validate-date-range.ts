/** Перевірка діапазону дат YYYY-MM-DD (from ≤ to). */
export function validateDateRange(from: string, to: string): string | null {
    if (!from || !to) {
        return "Вкажіть дати «від» та «до».";
    }

    if (to < from) {
        return "Дата «від» має бути не пізніше за дату «до».";
    }

    return null;
}

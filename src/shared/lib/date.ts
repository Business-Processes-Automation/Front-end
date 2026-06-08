/** YYYY-MM-DD у локальній таймзоні. */
export function formatDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/** Діапазон поточного місяця для query from/to. */
export function getMonthDateRange(reference = new Date()): {
    from: string;
    to: string;
} {
    const from = new Date(reference.getFullYear(), reference.getMonth(), 1);
    const to = new Date(reference.getFullYear(), reference.getMonth() + 1, 0);
    return { from: formatDateOnly(from), to: formatDateOnly(to) };
}

/** datetime-local → ISO без таймзони для API (додає :00). */
export function toApiLocalDateTime(value: string): string {
    if (!value) {
        return value;
    }

    if (value.length === 16) {
        return `${value}:00`;
    }

    return value;
}

export function formatLocalDateTimeDisplay(value: string): string {
    return value.replace("T", " ").slice(0, 16);
}

/** API startLocal → значення для input[type=datetime-local]. */
export function toDatetimeLocalInput(value: string): string {
    return value.slice(0, 16);
}

/** Діапазон поточного тижня (пн–нд) для query from/to. */
export function getWeekDateRange(reference = new Date()): {
    from: string;
    to: string;
} {
    const date = new Date(reference);
    const day = date.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;

    const from = new Date(date);
    from.setDate(date.getDate() + mondayOffset);

    const to = new Date(from);
    to.setDate(from.getDate() + 6);

    return { from: formatDateOnly(from), to: formatDateOnly(to) };
}

/** FullCalendar datesSet: end ексклюзивний → DateOnly to включно. */
export function getDateRangeFromCalendarView(start: Date, end: Date): {
    from: string;
    to: string;
} {
    const inclusiveEnd = new Date(end);
    inclusiveEnd.setDate(inclusiveEnd.getDate() - 1);

    return {
        from: formatDateOnly(start),
        to: formatDateOnly(inclusiveEnd),
    };
}

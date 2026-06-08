/** День тижня (як у API — рядок enum). */
export type Weekday =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

/** Порядок відображення: Пн → Нд. */
export const WEEKDAYS_ORDER: readonly Weekday[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
] as const;

export const WEEKDAY_LABELS_UK: Record<Weekday, string> = {
    Monday: "Понеділок",
    Tuesday: "Вівторок",
    Wednesday: "Середа",
    Thursday: "Четвер",
    Friday: "П'ятниця",
    Saturday: "Субота",
    Sunday: "Неділя",
};

/** Один день робочого графіка (відповідь GET / PUT). */
export type WorkingHoursDay = {
    dayOfWeek: Weekday;
    isWorking: boolean;
    workStartTime: string;
    workEndTime: string;
};

/** Елемент масиву для PUT /working-hours. */
export type WorkingHoursDayInput = WorkingHoursDay;

/** Тіло PUT /working-hours/{day}. */
export type UpdateWorkingHoursDayInput = {
    isWorking: boolean;
    workStartTime: string;
    workEndTime: string;
};

export const DEFAULT_WORK_START = "10:00";
export const DEFAULT_WORK_END = "19:00";

export function createDefaultWorkingWeek(): WorkingHoursDay[] {
    return WEEKDAYS_ORDER.map((day) => ({
        dayOfWeek: day,
        isWorking: day !== "Saturday" && day !== "Sunday",
        workStartTime: DEFAULT_WORK_START,
        workEndTime: DEFAULT_WORK_END,
    }));
}

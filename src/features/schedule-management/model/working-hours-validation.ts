import type { Weekday, WorkingHoursDayInput } from "@/entities/schedule";
import { WEEKDAYS_ORDER } from "@/entities/schedule";

const HH_MM_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
const MIN_WORKING_MINUTES = 30;

function parseMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

export function validateWorkingDayTimes(
    isWorking: boolean,
    workStartTime: string,
    workEndTime: string,
): string | null {
    if (!isWorking) {
        return null;
    }

    if (!workStartTime.trim() || !workEndTime.trim()) {
        return "Для робочого дня вкажіть час початку та закінчення.";
    }

    if (!HH_MM_REGEX.test(workStartTime) || !HH_MM_REGEX.test(workEndTime)) {
        return "Час має бути у форматі ГГ:ХХ (наприклад, 10:00).";
    }

    const startMinutes = parseMinutes(workStartTime);
    const endMinutes = parseMinutes(workEndTime);

    if (endMinutes <= startMinutes) {
        return "Час закінчення має бути пізніше за час початку.";
    }

    if (endMinutes - startMinutes < MIN_WORKING_MINUTES) {
        return "Робочий день має тривати щонайменше 30 хвилин.";
    }

    return null;
}

export function validateWorkingDay(
    day: WorkingHoursDayInput,
): string | null {
    return validateWorkingDayTimes(
        day.isWorking,
        day.workStartTime,
        day.workEndTime,
    );
}

type WorkingWeekFormErrors = {
    days?:
        | string
        | Array<{
              workEndTime?: string;
          }>;
};

export function validateWorkingWeek(
    days: WorkingHoursDayInput[],
): WorkingWeekFormErrors | undefined {
    if (days.length !== WEEKDAYS_ORDER.length) {
        return { days: "Потрібно передати рівно 7 днів тижня." };
    }

    const uniqueDays = new Set(days.map((day) => day.dayOfWeek));
    if (uniqueDays.size !== WEEKDAYS_ORDER.length) {
        return {
            days: "Кожен день тижня має бути вказаний лише один раз.",
        };
    }

    for (const expectedDay of WEEKDAYS_ORDER) {
        if (!uniqueDays.has(expectedDay)) {
            return { days: "Невірний або відсутній день тижня." };
        }
    }

    const dayErrors = days.map((day) => {
        const dayError = validateWorkingDay(day);
        return dayError ? { workEndTime: dayError } : {};
    });

    if (dayErrors.some((entry) => Object.keys(entry).length > 0)) {
        return { days: dayErrors };
    }

    return undefined;
}

export function getDayFieldErrors(
    days: WorkingHoursDayInput[],
): Partial<Record<Weekday, string>> {
    const result: Partial<Record<Weekday, string>> = {};

    for (const day of days) {
        const error = validateWorkingDay(day);
        if (error) {
            result[day.dayOfWeek] = error;
        }
    }

    return result;
}

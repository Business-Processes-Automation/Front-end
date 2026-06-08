import type { CreateTimeOffInput } from "@/entities/schedule";
import { toApiLocalDateTime } from "@/shared/lib/date";

function parseLocalDateTime(value: string): number {
    return new Date(toApiLocalDateTime(value)).getTime();
}

export function buildCreateTimeOffPayload(
    isFullDay: boolean,
    date: string,
    startLocal: string,
    endLocal: string,
): CreateTimeOffInput {
    if (isFullDay && date) {
        return {
            isFullDay: true,
            startLocal: `${date}T00:00:00`,
            endLocal: `${date}T23:59:00`,
        };
    }

    return {
        isFullDay: false,
        startLocal: toApiLocalDateTime(startLocal),
        endLocal: toApiLocalDateTime(endLocal),
    };
}

export function validateCreateTimeOffInput(
    isFullDay: boolean,
    date: string,
    startLocal: string,
    endLocal: string,
): Record<string, string> | undefined {
    if (isFullDay) {
        if (!date) {
            return { date: "Вкажіть дату для цілого дня." };
        }
        return undefined;
    }

    const errors: Record<string, string> = {};

    if (!startLocal) {
        errors.startLocal = "Вкажіть час початку.";
    }

    if (!endLocal) {
        errors.endLocal = "Вкажіть час закінчення.";
    }

    if (startLocal && endLocal) {
        const start = parseLocalDateTime(startLocal);
        const end = parseLocalDateTime(endLocal);

        if (!Number.isNaN(start) && !Number.isNaN(end) && end <= start) {
            errors.endLocal =
                "Час закінчення має бути пізніше за час початку.";
        }
    }

    return Object.keys(errors).length > 0 ? errors : undefined;
}

export { validateDateRange as validateTimeOffDateRange } from "@/shared/lib/validate-date-range";

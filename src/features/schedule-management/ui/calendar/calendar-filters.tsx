"use client";

import {
    APPOINTMENT_STATUS_LABELS,
    type AppointmentStatus,
} from "@/entities/schedule";
import type { Service } from "@/entities/service";

export type CalendarFiltersState = {
    includeCancelled: boolean;
    status: string;
    serviceId: string;
};

type CalendarFiltersProps = {
    value: CalendarFiltersState;
    services: Service[];
    onChange: (next: CalendarFiltersState) => void;
};

const STATUS_OPTIONS = [
    { value: "", label: "Усі статуси" },
    ...(
        Object.entries(APPOINTMENT_STATUS_LABELS) as [AppointmentStatus, string][]
    ).map(([value, label]) => ({ value, label })),
];

const inputClassName =
    "flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function CalendarFilters({
    value,
    services,
    onChange,
}: CalendarFiltersProps) {
    const update = (patch: Partial<CalendarFiltersState>) =>
        onChange({ ...value, ...patch });

    return (
        <div className="grid gap-3 rounded-lg border bg-muted/20 p-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
                <label htmlFor="calendar-status" className="text-sm font-medium">
                    Статус
                </label>
                <select
                    id="calendar-status"
                    value={value.status}
                    onChange={(event) => update({ status: event.target.value })}
                    className={inputClassName}
                >
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="space-y-2">
                <label htmlFor="calendar-service" className="text-sm font-medium">
                    Послуга
                </label>
                <select
                    id="calendar-service"
                    value={value.serviceId}
                    onChange={(event) =>
                        update({ serviceId: event.target.value })
                    }
                    className={inputClassName}
                >
                    <option value="">Усі послуги</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.serviceName}
                        </option>
                    ))}
                </select>
            </div>
            <label className="flex h-9 items-center gap-2 self-end text-sm">
                <input
                    type="checkbox"
                    checked={value.includeCancelled}
                    onChange={(event) =>
                        update({ includeCancelled: event.target.checked })
                    }
                    className="size-4 rounded border-input"
                />
                Показувати скасовані
            </label>
        </div>
    );
}

"use client";

import {
    APPOINTMENT_STATUS_LABELS,
    type AppointmentStatus,
} from "@/entities/appointment";
import type { Service } from "@/entities/service";

export type AppointmentFiltersState = {
    from: string;
    to: string;
    status: string;
    serviceId: string;
};

type AppointmentFiltersProps = {
    value: AppointmentFiltersState;
    services: Service[];
    onChange: (next: AppointmentFiltersState) => void;
};

const STATUS_OPTIONS = [
    { value: "", label: "Усі статуси" },
    ...(
        Object.entries(APPOINTMENT_STATUS_LABELS) as [AppointmentStatus, string][]
    ).map(([value, label]) => ({ value, label })),
];

const inputClassName =
    "flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function AppointmentFilters({
    value,
    services,
    onChange,
}: AppointmentFiltersProps) {
    const update = (patch: Partial<AppointmentFiltersState>) =>
        onChange({ ...value, ...patch });

    return (
        <div className="grid gap-3 rounded-lg border bg-muted/20 p-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
                <label htmlFor="appointments-from" className="text-sm font-medium">
                    Від
                </label>
                <input
                    id="appointments-from"
                    type="date"
                    value={value.from}
                    onChange={(event) => update({ from: event.target.value })}
                    className={inputClassName}
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="appointments-to" className="text-sm font-medium">
                    До
                </label>
                <input
                    id="appointments-to"
                    type="date"
                    value={value.to}
                    onChange={(event) => update({ to: event.target.value })}
                    className={inputClassName}
                />
            </div>
            <div className="space-y-2">
                <label
                    htmlFor="appointments-status"
                    className="text-sm font-medium"
                >
                    Статус
                </label>
                <select
                    id="appointments-status"
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
                <label
                    htmlFor="appointments-service"
                    className="text-sm font-medium"
                >
                    Послуга
                </label>
                <select
                    id="appointments-service"
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
        </div>
    );
}

"use client";

import type { Appointment } from "@/entities/appointment";
import { APPOINTMENT_STATUS_LABELS } from "@/entities/appointment";
import { formatLocalDateTimeDisplay } from "@/shared/lib/date";
import { formatPrice } from "@/shared/lib/format";
import { Button } from "@/shared/ui/button";

type AppointmentsListProps = {
    appointments: Appointment[];
    isSubmitting: boolean;
    selectedId: number | null;
    onSelect: (appointment: Appointment) => void;
};

export function AppointmentsList({
    appointments,
    isSubmitting,
    selectedId,
    onSelect,
}: AppointmentsListProps) {
    if (appointments.length === 0) {
        return (
            <div className="rounded-lg border border-dashed bg-muted/20 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                    Записів за обраний період немає.
                </p>
            </div>
        );
    }

    return (
        <ul className="divide-y rounded-lg border">
            {appointments.map((appointment) => {
                const isSelected = selectedId === appointment.id;

                return (
                    <li
                        key={appointment.id}
                        className={`flex w-full flex-wrap items-start justify-between gap-3 p-4 text-sm ${
                            isSelected ? "bg-primary/5" : ""
                        }`}
                    >
                        <div className="space-y-1">
                            <p className="font-medium">
                                {appointment.serviceName} ·{" "}
                                {appointment.clientName}
                            </p>
                            <p className="text-muted-foreground">
                                {formatLocalDateTimeDisplay(
                                    appointment.startLocal,
                                )}{" "}
                                —{" "}
                                {formatLocalDateTimeDisplay(
                                    appointment.endLocal,
                                )}
                            </p>
                            <p className="text-muted-foreground">
                                {appointment.clientPhone} ·{" "}
                                {formatPrice(appointment.priceAtBooking)}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="rounded-full border px-2 py-0.5 text-xs">
                                {
                                    APPOINTMENT_STATUS_LABELS[
                                        appointment.displayStatus
                                    ]
                                }
                            </span>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={isSubmitting}
                                onClick={() => onSelect(appointment)}
                            >
                                Редагувати
                            </Button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

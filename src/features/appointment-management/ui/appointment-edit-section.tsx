"use client";

import type { Appointment } from "@/entities/appointment";
import {
    canCancelAppointment,
    canChangeAppointmentStatus,
} from "@/entities/appointment";
import type { Service } from "@/entities/service";
import { Button } from "@/shared/ui/button";

import type {
    RescheduleAppointmentInput,
    UpdateAppointmentInput,
} from "@/entities/appointment";
import { AppointmentRescheduleForm } from "./appointment-reschedule-form";
import { AppointmentUpdateForm } from "./appointment-update-form";

type AppointmentEditSectionProps = {
    appointment: Appointment;
    services: Service[];
    maxRescheduleCount: number;
    isSubmitting: boolean;
    error: string | null;
    onUpdate: (input: UpdateAppointmentInput) => Promise<boolean>;
    onReschedule: (input: RescheduleAppointmentInput) => Promise<boolean>;
    onCancelAppointment: () => Promise<boolean>;
    onClose: () => void;
};

export function AppointmentEditSection({
    appointment,
    services,
    maxRescheduleCount,
    isSubmitting,
    error,
    onUpdate,
    onReschedule,
    onCancelAppointment,
    onClose,
}: AppointmentEditSectionProps) {
    const canCancel = canCancelAppointment(appointment.status);
    const canEdit = canChangeAppointmentStatus(appointment.status);

    const handleCancelClick = async () => {
        const confirmed = window.confirm(
            `Скасувати запис #${appointment.id} (${appointment.clientName}, ${appointment.serviceName})?`,
        );

        if (!confirmed) {
            return;
        }

        await onCancelAppointment();
    };

    return (
        <div className="space-y-6">
            {canEdit ? (
                <AppointmentUpdateForm
                    appointment={appointment}
                    services={services}
                    isSubmitting={isSubmitting}
                    error={error}
                    onSubmit={onUpdate}
                    onCancel={onClose}
                />
            ) : (
                <p className="text-sm text-muted-foreground">
                    Запис у поточному статусі редагувати не можна.
                </p>
            )}

            {canEdit && (
                <>
                    <div className="border-t pt-6">
                        <h4 className="mb-4 text-sm font-medium">
                            Перенести запис
                        </h4>
                        <AppointmentRescheduleForm
                            appointment={appointment}
                            maxRescheduleCount={maxRescheduleCount}
                            isSubmitting={isSubmitting}
                            error={error}
                            onSubmit={onReschedule}
                        />
                    </div>

                    <div className="border-t pt-6">
                        <h4 className="mb-2 text-sm font-medium">
                            Скасування
                        </h4>
                        <p className="mb-3 text-sm text-muted-foreground">
                            Запис буде скасовано без видалення з історії.
                        </p>
                        {canCancel ? (
                            <Button
                                type="button"
                                variant="destructive"
                                disabled={isSubmitting}
                                onClick={() => void handleCancelClick()}
                            >
                                {isSubmitting
                                    ? "Скасування…"
                                    : "Скасувати запис"}
                            </Button>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Скасування для цього запису недоступне.
                            </p>
                        )}
                    </div>
                </>
            )}

            {!canEdit && (
                <Button type="button" variant="outline" onClick={onClose}>
                    Закрити
                </Button>
            )}
        </div>
    );
}

"use client";

import { useState } from "react";
import { Form, Formik, useField } from "formik";

import type { Appointment } from "@/entities/appointment";
import {
    APPOINTMENT_STATUS_LABELS,
    PATCH_STATUS_TRANSITIONS,
    canChangeAppointmentStatus,
} from "@/entities/appointment";
import type { Service } from "@/entities/service";
import { formatLocalDateTimeDisplay } from "@/shared/lib/date";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { FormSelect } from "@/shared/ui/form-select";

import {
    appointmentToUpdateFormValues,
    updateAppointmentValidationSchema,
    updateFormValuesToInput,
    type UpdateAppointmentFormValues,
} from "../model";
import type { UpdateAppointmentInput } from "@/entities/appointment";

type AppointmentUpdateFormProps = {
    appointment: Appointment;
    services: Service[];
    isSubmitting: boolean;
    error: string | null;
    onSubmit: (input: UpdateAppointmentInput) => Promise<boolean>;
    onCancel: () => void;
};

const textareaClassName =
    "flex min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

function NotesField({ disabled }: { disabled: boolean }) {
    const [field, meta] = useField("notes");
    const hasError = meta.touched && Boolean(meta.error);

    return (
        <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
                Нотатки
            </label>
            <textarea
                {...field}
                id="notes"
                disabled={disabled}
                aria-invalid={hasError}
                className={cn(
                    textareaClassName,
                    hasError && "border-destructive ring-destructive/20",
                )}
            />
            {hasError && (
                <p className="text-sm text-destructive" role="alert">
                    {meta.error}
                </p>
            )}
            <p className="text-xs text-muted-foreground">
                Порожнє поле очистить нотатки.
            </p>
        </div>
    );
}

export function AppointmentUpdateForm({
    appointment,
    services,
    isSubmitting,
    error,
    onSubmit,
    onCancel,
}: AppointmentUpdateFormProps) {
    const canChangeStatus = canChangeAppointmentStatus(appointment.status);

    const statusOptions = [
        { value: "", label: "Без зміни статусу" },
        ...PATCH_STATUS_TRANSITIONS.map((status) => ({
            value: status,
            label: APPOINTMENT_STATUS_LABELS[status],
        })),
    ];

    const serviceOptions = services.map((service) => ({
        value: String(service.id),
        label: service.serviceName,
    }));
    const [noChangesError, setNoChangesError] = useState<string | null>(null);

    return (
        <Formik
            initialValues={appointmentToUpdateFormValues(appointment)}
            validationSchema={updateAppointmentValidationSchema}
            enableReinitialize
            onSubmit={async (values: UpdateAppointmentFormValues) => {
                const input = updateFormValuesToInput(values, appointment);
                if (!input) {
                    setNoChangesError("Не вказано полів для оновлення.");
                    return false;
                }

                setNoChangesError(null);
                return onSubmit(input);
            }}
        >
            {({ isSubmitting: isFormSubmitting }) => (
                <Form className="space-y-4" noValidate>
                    <dl className="grid gap-2 rounded-lg border bg-muted/20 p-3 text-sm sm:grid-cols-2">
                        <div>
                            <dt className="text-muted-foreground">Клієнт</dt>
                            <dd>
                                {appointment.clientName} ({appointment.clientPhone})
                            </dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Час</dt>
                            <dd>
                                {formatLocalDateTimeDisplay(appointment.startLocal)}{" "}
                                — {formatLocalDateTimeDisplay(appointment.endLocal)}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">
                                Поточний статус
                            </dt>
                            <dd>
                                {APPOINTMENT_STATUS_LABELS[appointment.displayStatus]}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Переносів</dt>
                            <dd>{appointment.rescheduleCount}</dd>
                        </div>
                    </dl>

                    {canChangeStatus ? (
                        <FormSelect
                            name="status"
                            label="Новий статус"
                            options={statusOptions}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Статус запису в поточному стані змінити не можна.
                        </p>
                    )}

                    <FormSelect
                        name="serviceId"
                        label="Послуга"
                        options={serviceOptions}
                        disabled={isSubmitting || isFormSubmitting}
                    />

                    <NotesField disabled={isSubmitting || isFormSubmitting} />

                    {(noChangesError || error) && (
                        <p className="text-sm text-destructive" role="alert">
                            {noChangesError ?? error}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting || isFormSubmitting}
                        >
                            {isSubmitting || isFormSubmitting
                                ? "Збереження…"
                                : "Зберегти зміни"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting || isFormSubmitting}
                        >
                            Скасувати
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

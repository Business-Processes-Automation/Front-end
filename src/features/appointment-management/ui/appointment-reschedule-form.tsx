"use client";

import { Form, Formik } from "formik";

import type { Appointment } from "@/entities/appointment";
import {
    canChangeAppointmentStatus,
    canRescheduleAppointment,
} from "@/entities/appointment";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-field";

import {
    appointmentToRescheduleFormValues,
    rescheduleAppointmentValidationSchema,
    rescheduleFormValuesToInput,
} from "../model";
import type { RescheduleAppointmentInput } from "@/entities/appointment";

type AppointmentRescheduleFormProps = {
    appointment: Appointment;
    maxRescheduleCount: number;
    isSubmitting: boolean;
    error: string | null;
    onSubmit: (input: RescheduleAppointmentInput) => Promise<boolean>;
};

function RescheduleUnavailableMessage({
    appointment,
    maxRescheduleCount,
}: {
    appointment: Appointment;
    maxRescheduleCount: number;
}) {
    if (!canChangeAppointmentStatus(appointment.status)) {
        return (
            <p className="text-sm text-muted-foreground">
                Перенос для цього запису недоступний.
            </p>
        );
    }

    if (maxRescheduleCount <= 0) {
        return (
            <p className="text-sm text-muted-foreground">
                Перенос записів вимкнено в налаштуваннях.
            </p>
        );
    }

    return (
        <p className="text-sm text-muted-foreground">
            Досягнуто ліміт переносів ({appointment.rescheduleCount} /{" "}
            {maxRescheduleCount}).
        </p>
    );
}

export function AppointmentRescheduleForm({
    appointment,
    maxRescheduleCount,
    isSubmitting,
    error,
    onSubmit,
}: AppointmentRescheduleFormProps) {
    const canReschedule = canRescheduleAppointment(
        appointment,
        maxRescheduleCount,
    );

    if (!canReschedule) {
        return (
            <RescheduleUnavailableMessage
                appointment={appointment}
                maxRescheduleCount={maxRescheduleCount}
            />
        );
    }

    return (
        <Formik
            initialValues={appointmentToRescheduleFormValues(appointment)}
            validationSchema={rescheduleAppointmentValidationSchema}
            enableReinitialize
            onSubmit={async (values) =>
                onSubmit(rescheduleFormValuesToInput(values))
            }
        >
            {({ isSubmitting: isFormSubmitting }) => (
                <Form className="space-y-4" noValidate>
                    <p className="text-sm text-muted-foreground">
                        Переносів використано: {appointment.rescheduleCount} /{" "}
                        {maxRescheduleCount}
                    </p>

                    <FormField
                        name="startLocal"
                        label="Новий час початку"
                        type="datetime-local"
                        disabled={isSubmitting || isFormSubmitting}
                    />

                    {error && (
                        <p className="text-sm text-destructive" role="alert">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={isSubmitting || isFormSubmitting}
                    >
                        {isSubmitting || isFormSubmitting
                            ? "Перенесення…"
                            : "Перенести запис"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

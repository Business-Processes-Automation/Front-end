"use client";

import { Form, Formik } from "formik";

import type { ScheduleSettingsInput } from "@/entities/schedule";
import { ErrorAlert } from "@/shared/ui/async-state";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-field";

import { scheduleSettingsValidationSchema } from "../model/validation-schemas";

type ScheduleSettingsFormProps = {
    initialValues: ScheduleSettingsInput;
    submitLabel?: string;
    error: string | null;
    isSubmitting: boolean;
    onSubmit: (input: ScheduleSettingsInput) => Promise<boolean>;
};

export function ScheduleSettingsForm({
    initialValues,
    submitLabel = "Зберегти налаштування",
    error,
    isSubmitting,
    onSubmit,
}: ScheduleSettingsFormProps) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={scheduleSettingsValidationSchema}
            enableReinitialize
            onSubmit={async (values) => {
                await onSubmit({
                    bufferBetweenClientsMinutes: Number(
                        values.bufferBetweenClientsMinutes,
                    ),
                    freeSlotIntervalMinutes: Number(
                        values.freeSlotIntervalMinutes,
                    ),
                    minBookingNoticeMinutes: Number(
                        values.minBookingNoticeMinutes,
                    ),
                    maxBookingDaysAhead: Number(values.maxBookingDaysAhead),
                    maxRescheduleCount: Number(values.maxRescheduleCount),
                    cancellationPolicyHours: Number(
                        values.cancellationPolicyHours,
                    ),
                });
            }}
        >
            {({ isSubmitting: isFormSubmitting }) => (
                <Form className="space-y-4" noValidate>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <FormField
                            name="bufferBetweenClientsMinutes"
                            label="Перерва між клієнтами (хв)"
                            type="number"
                            min={0}
                            max={480}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                        <FormField
                            name="freeSlotIntervalMinutes"
                            label="Крок слотів (хв)"
                            type="number"
                            min={5}
                            max={120}
                            step={5}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                        <FormField
                            name="minBookingNoticeMinutes"
                            label="Мін. час до запису (хв)"
                            type="number"
                            min={0}
                            max={10080}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                        <FormField
                            name="maxBookingDaysAhead"
                            label="Горизонт запису (дні)"
                            type="number"
                            min={1}
                            max={365}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                        <FormField
                            name="maxRescheduleCount"
                            label="Макс. переносів"
                            type="number"
                            min={0}
                            max={10}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                        <FormField
                            name="cancellationPolicyHours"
                            label="Скасування (год до візиту)"
                            type="number"
                            min={0}
                            max={168}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                    </div>

                    <ErrorAlert message={error} />

                    <Button
                        type="submit"
                        disabled={isSubmitting || isFormSubmitting}
                    >
                        {isSubmitting || isFormSubmitting
                            ? "Збереження…"
                            : submitLabel}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

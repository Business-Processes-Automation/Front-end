"use client";

import { Form, Formik } from "formik";

import type { Service } from "@/entities/service";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-field";
import { FormSelect } from "@/shared/ui/form-select";

import {
    EMPTY_CREATE_APPOINTMENT_FORM_VALUES,
    createAppointmentValidationSchema,
    createFormValuesToInput,
    defaultCreateStartLocal,
    type CreateAppointmentFormValues,
} from "../model";
import type { CreateAppointmentInput } from "@/entities/appointment";

type AppointmentCreateFormProps = {
    services: Service[];
    isSubmitting: boolean;
    error: string | null;
    onSubmit: (input: CreateAppointmentInput) => Promise<boolean>;
    onCancel: () => void;
};

function buildInitialValues(
    services: Service[],
): CreateAppointmentFormValues {
    return {
        ...EMPTY_CREATE_APPOINTMENT_FORM_VALUES,
        serviceId: services[0] ? String(services[0].id) : "",
        startLocal: defaultCreateStartLocal(),
    };
}

export function AppointmentCreateForm({
    services,
    isSubmitting,
    error,
    onSubmit,
    onCancel,
}: AppointmentCreateFormProps) {
    const serviceOptions = services.map((service) => ({
        value: String(service.id),
        label: service.serviceName,
    }));

    if (services.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                Спочатку додайте хоча б одну послугу.
            </p>
        );
    }

    return (
        <Formik
            initialValues={buildInitialValues(services)}
            validationSchema={createAppointmentValidationSchema}
            enableReinitialize
            onSubmit={async (values, helpers) => {
                const success = await onSubmit(createFormValuesToInput(values));
                if (success) {
                    helpers.resetForm({ values: buildInitialValues(services) });
                }
            }}
        >
            {({ isSubmitting: isFormSubmitting }) => (
                <Form className="space-y-4" noValidate>
                    <FormSelect
                        name="serviceId"
                        label="Послуга"
                        options={serviceOptions}
                        disabled={isSubmitting || isFormSubmitting}
                    />

                    <FormField
                        name="startLocal"
                        label="Час початку"
                        type="datetime-local"
                        disabled={isSubmitting || isFormSubmitting}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            name="clientName"
                            label="Ім'я клієнта"
                            placeholder="Анна"
                            disabled={isSubmitting || isFormSubmitting}
                        />
                        <FormField
                            name="clientPhone"
                            label="Телефон клієнта"
                            placeholder="+380991112233"
                            disabled={isSubmitting || isFormSubmitting}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-destructive" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting || isFormSubmitting}
                        >
                            {isSubmitting || isFormSubmitting
                                ? "Створення…"
                                : "Створити запис"}
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

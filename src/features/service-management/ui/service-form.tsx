"use client";

import { Form, Formik, useFormikContext } from "formik";

import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-field";

import {
    calculateExpectedOccupiedMinutes,
    EMPTY_SERVICE_FORM_VALUES,
    formValuesToServiceInput,
    serviceFormValidationSchema,
    serviceToFormValues,
} from "../model";
import type { Service, ServiceInput } from "@/entities/service";
import type { ServiceFormValues } from "../model";

type ServiceFormProps = {
    service?: Service | null;
    isSubmitting: boolean;
    error: string | null;
    onSubmit: (input: ServiceInput) => Promise<boolean>;
    onCancel: () => void;
};

function OccupiedMinutesHint() {
    const { values } = useFormikContext<ServiceFormValues>();
    const minutes = calculateExpectedOccupiedMinutes(values);

    return (
        <p className="text-sm text-muted-foreground">
            Очікуваний зайнятий час:{" "}
            <span className="font-medium text-foreground">{minutes} хв</span>{" "}
            (підготовка + послуга + після)
        </p>
    );
}

export function ServiceForm({
    service,
    isSubmitting,
    error,
    onSubmit,
    onCancel,
}: ServiceFormProps) {
    const isEditMode = Boolean(service);

    const handleSubmit = async (values: ServiceFormValues) => {
        return onSubmit(formValuesToServiceInput(values));
    };

    return (
        <Formik
            initialValues={
                service ? serviceToFormValues(service) : EMPTY_SERVICE_FORM_VALUES
            }
            validationSchema={serviceFormValidationSchema}
            enableReinitialize
            onSubmit={async (values, helpers) => {
                const success = await handleSubmit(values);
                if (success) {
                    helpers.resetForm();
                }
            }}
        >
            {({ isSubmitting: isFormSubmitting }) => (
                <Form className="space-y-4" noValidate>
                    <FormField
                        name="serviceName"
                        label="Назва послуги"
                        placeholder="Маникюр класичний"
                        disabled={isSubmitting || isFormSubmitting}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            name="durationInMinutes"
                            label="Тривалість (хв)"
                            type="number"
                            min={1}
                            max={1440}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                        <FormField
                            name="price"
                            label="Ціна (₴)"
                            type="number"
                            min={0}
                            max={999999.99}
                            step={0.01}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <FormField
                            name="prepayment"
                            label="Передоплата (₴)"
                            type="number"
                            min={0}
                            max={999999.99}
                            step={0.01}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                        <FormField
                            name="preparationBeforeInMinutes"
                            label="Підготовка до (хв)"
                            type="number"
                            min={0}
                            max={480}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                        <FormField
                            name="preparationAfterInMinutes"
                            label="Після послуги (хв)"
                            type="number"
                            min={0}
                            max={480}
                            disabled={isSubmitting || isFormSubmitting}
                        />
                    </div>

                    <OccupiedMinutesHint />

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
                                ? "Збереження…"
                                : isEditMode
                                  ? "Зберегти зміни"
                                  : "Створити послугу"}
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

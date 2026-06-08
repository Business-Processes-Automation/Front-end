"use client";

import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

import {
    formatLocalDateTimeDisplay,
    getMonthDateRange,
} from "@/shared/lib/date";
import { validateDateRange } from "@/shared/lib/validate-date-range";
import { ErrorAlert } from "@/shared/ui/async-state";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-field";

import { useTimeOffs } from "../hooks/use-time-offs";
import {
    buildCreateTimeOffPayload,
    validateCreateTimeOffInput,
} from "../model/time-offs-validation";

type RangeFormValues = {
    from: string;
    to: string;
};

type CreateFormValues = {
    isFullDay: boolean;
    date: string;
    startLocal: string;
    endLocal: string;
};

const defaultRange = getMonthDateRange();

export function TimeOffsPanel() {
    const {
        userId,
        items,
        range,
        error,
        isInitialized,
        isLoading,
        isSubmitting,
        deletingId,
        loadTimeOffs,
        addTimeOff,
        removeTimeOff,
        clearError,
    } = useTimeOffs();

    const [rangeForm, setRangeForm] = useState<RangeFormValues>(defaultRange);

    useEffect(() => {
        if (!userId) {
            return;
        }

        void loadTimeOffs(defaultRange);
    }, [userId, loadTimeOffs]);

    if (!userId) {
        return null;
    }

    const handleLoadRange = () => {
        if (validateDateRange(rangeForm.from, rangeForm.to)) {
            return;
        }

        void loadTimeOffs(rangeForm);
    };

    return (
        <section className="space-y-4 border-t pt-8">
            <div className="space-y-1">
                <h2 className="text-base font-medium">Вихідні та блоки часу</h2>
                <p className="text-sm text-muted-foreground">
                    Перерви, обіди або цілі вихідні дні, коли запис недоступний.
                </p>
            </div>

            <div className="flex flex-wrap items-end gap-3 rounded-lg border bg-muted/20 p-3">
                <div className="space-y-2">
                    <label htmlFor="timeoffs-from" className="text-sm font-medium">
                        Від
                    </label>
                    <input
                        id="timeoffs-from"
                        type="date"
                        value={rangeForm.from}
                        onChange={(event) =>
                            setRangeForm((prev) => ({
                                ...prev,
                                from: event.target.value,
                            }))
                        }
                        className="flex h-9 rounded-lg border border-input bg-background px-3 text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="timeoffs-to" className="text-sm font-medium">
                        До
                    </label>
                    <input
                        id="timeoffs-to"
                        type="date"
                        value={rangeForm.to}
                        onChange={(event) =>
                            setRangeForm((prev) => ({
                                ...prev,
                                to: event.target.value,
                            }))
                        }
                        className="flex h-9 rounded-lg border border-input bg-background px-3 text-sm"
                    />
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    onClick={handleLoadRange}
                >
                    {isLoading ? "Завантаження…" : "Показати"}
                </Button>
            </div>

            {range && (
                <p className="text-xs text-muted-foreground">
                    {range.from} — {range.to} · {items.length} блок(ів)
                </p>
            )}

            <Formik<CreateFormValues>
                initialValues={{
                    isFullDay: false,
                    date: rangeForm.from,
                    startLocal: `${rangeForm.from}T13:00`,
                    endLocal: `${rangeForm.from}T14:00`,
                }}
                enableReinitialize
                validate={(values) =>
                    validateCreateTimeOffInput(
                        values.isFullDay,
                        values.date,
                        values.startLocal,
                        values.endLocal,
                    ) ?? undefined
                }
                onSubmit={async (values, helpers) => {
                    clearError();
                    const payload = buildCreateTimeOffPayload(
                        values.isFullDay,
                        values.date,
                        values.startLocal,
                        values.endLocal,
                    );
                    const success = await addTimeOff(payload);
                    if (success) {
                        helpers.resetForm();
                        void loadTimeOffs(rangeForm);
                    }
                }}
            >
                {({ values, isSubmitting: isFormSubmitting, setFieldValue }) => (
                    <Form
                        className="space-y-4 rounded-lg border border-dashed p-4"
                        noValidate
                    >
                        <h3 className="text-sm font-medium">Додати блок</h3>

                        <label className="inline-flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={values.isFullDay}
                                disabled={isSubmitting || isFormSubmitting}
                                onChange={(event) =>
                                    void setFieldValue(
                                        "isFullDay",
                                        event.target.checked,
                                    )
                                }
                                className="size-4 rounded border-input"
                            />
                            Цілий день
                        </label>

                        {values.isFullDay ? (
                            <FormField
                                name="date"
                                label="Дата"
                                type="date"
                                disabled={isSubmitting || isFormSubmitting}
                            />
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="timeoff-start"
                                        className="text-sm font-medium"
                                    >
                                        Початок
                                    </label>
                                    <input
                                        id="timeoff-start"
                                        type="datetime-local"
                                        value={values.startLocal}
                                        disabled={isSubmitting || isFormSubmitting}
                                        onChange={(event) =>
                                            void setFieldValue(
                                                "startLocal",
                                                event.target.value,
                                            )
                                        }
                                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="timeoff-end"
                                        className="text-sm font-medium"
                                    >
                                        Кінець
                                    </label>
                                    <input
                                        id="timeoff-end"
                                        type="datetime-local"
                                        value={values.endLocal}
                                        disabled={isSubmitting || isFormSubmitting}
                                        onChange={(event) =>
                                            void setFieldValue(
                                                "endLocal",
                                                event.target.value,
                                            )
                                        }
                                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isSubmitting || isFormSubmitting}
                        >
                            {isSubmitting || isFormSubmitting
                                ? "Додавання…"
                                : "Додати блок"}
                        </Button>
                    </Form>
                )}
            </Formik>

            <ErrorAlert message={error} />

            {isInitialized && items.length === 0 && !isLoading && (
                <p className="text-sm text-muted-foreground">
                    У вибраному діапазоні блоків немає.
                </p>
            )}

            {items.length > 0 && (
                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full min-w-[520px] text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-3 py-2 text-left">Початок</th>
                                <th className="px-3 py-2 text-left">Кінець</th>
                                <th className="px-3 py-2 text-left">Тип</th>
                                <th className="px-3 py-2 text-right" />
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b last:border-b-0"
                                >
                                    <td className="px-3 py-2">
                                        {formatLocalDateTimeDisplay(
                                            item.startLocal,
                                        )}
                                    </td>
                                    <td className="px-3 py-2">
                                        {formatLocalDateTimeDisplay(item.endLocal)}
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.isFullDay ? "Цілий день" : "Інтервал"}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            disabled={deletingId !== null}
                                            onClick={() =>
                                                void removeTimeOff(item.id)
                                            }
                                        >
                                            {deletingId === item.id
                                                ? "Видалення…"
                                                : "Видалити"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

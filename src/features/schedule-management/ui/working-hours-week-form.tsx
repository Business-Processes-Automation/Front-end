"use client";

import { FieldArray, Form, Formik } from "formik";

import {
    WEEKDAY_LABELS_UK,
    type UpdateWorkingHoursDayInput,
    type Weekday,
    type WorkingHoursDay,
    type WorkingHoursDayInput,
} from "@/entities/schedule";
import { ErrorAlert } from "@/shared/ui/async-state";
import { Button } from "@/shared/ui/button";

import {
    getDayFieldErrors,
    validateWorkingDay,
    validateWorkingWeek,
} from "../model/working-hours-validation";

type WeekFormValues = {
    days: WorkingHoursDayInput[];
};

type WorkingHoursWeekFormProps = {
    initialDays: WorkingHoursDay[];
    error: string | null;
    isSubmittingWeek: boolean;
    submittingDay: Weekday | null;
    deletingDay: Weekday | null;
    onSaveWeek: (days: WorkingHoursDayInput[]) => Promise<boolean>;
    onSaveDay: (
        day: Weekday,
        input: UpdateWorkingHoursDayInput,
    ) => Promise<boolean>;
    onRemoveDay: (day: Weekday) => Promise<boolean>;
    onClearError: () => void;
};

export function WorkingHoursWeekForm({
    initialDays,
    error,
    isSubmittingWeek,
    submittingDay,
    deletingDay,
    onSaveWeek,
    onSaveDay,
    onRemoveDay,
    onClearError,
}: WorkingHoursWeekFormProps) {
    return (
        <Formik<WeekFormValues>
            initialValues={{ days: initialDays }}
            enableReinitialize
            validate={(values) => validateWorkingWeek(values.days) ?? undefined}
            onSubmit={async (values) => {
                onClearError();
                await onSaveWeek(values.days);
            }}
        >
            {({ values, isSubmitting, setFieldValue }) => {
                const rowErrors = getDayFieldErrors(values.days);
                const isBusy =
                    isSubmittingWeek ||
                    submittingDay !== null ||
                    deletingDay !== null;

                return (
                    <Form className="space-y-4" noValidate>
                        <div className="overflow-x-auto rounded-lg border">
                            <table className="w-full min-w-[640px] text-sm">
                                <thead className="border-b bg-muted/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-medium">
                                            День
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            Робочий
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            Початок
                                        </th>
                                        <th className="px-3 py-2 text-left font-medium">
                                            Кінець
                                        </th>
                                        <th className="px-3 py-2 text-right font-medium">
                                            Дії
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <FieldArray name="days">
                                        {() =>
                                            values.days.map((day, index) => {
                                                const isRowSubmitting =
                                                    submittingDay ===
                                                    day.dayOfWeek;
                                                const isRowDeleting =
                                                    deletingDay ===
                                                    day.dayOfWeek;
                                                const rowError =
                                                    rowErrors[day.dayOfWeek];

                                                return (
                                                    <tr
                                                        key={day.dayOfWeek}
                                                        className="border-b last:border-b-0"
                                                    >
                                                        <td className="px-3 py-3 font-medium">
                                                            {
                                                                WEEKDAY_LABELS_UK[
                                                                    day.dayOfWeek
                                                                ]
                                                            }
                                                        </td>
                                                        <td className="px-3 py-3">
                                                            <label className="inline-flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        day.isWorking
                                                                    }
                                                                    disabled={
                                                                        isBusy
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                    ) => {
                                                                        const isWorking =
                                                                            event
                                                                                .target
                                                                                .checked;
                                                                        void setFieldValue(
                                                                            `days[${index}].isWorking`,
                                                                            isWorking,
                                                                        );
                                                                        if (
                                                                            !isWorking
                                                                        ) {
                                                                            void setFieldValue(
                                                                                `days[${index}].workStartTime`,
                                                                                "",
                                                                            );
                                                                            void setFieldValue(
                                                                                `days[${index}].workEndTime`,
                                                                                "",
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="size-4 rounded border-input"
                                                                />
                                                                <span className="text-muted-foreground">
                                                                    {day.isWorking
                                                                        ? "Так"
                                                                        : "Вихідний"}
                                                                </span>
                                                            </label>
                                                        </td>
                                                        <td className="px-3 py-3">
                                                            <input
                                                                type="time"
                                                                value={
                                                                    day.workStartTime
                                                                }
                                                                disabled={
                                                                    !day.isWorking ||
                                                                    isBusy
                                                                }
                                                                onChange={(
                                                                    event,
                                                                ) =>
                                                                    void setFieldValue(
                                                                        `days[${index}].workStartTime`,
                                                                        event
                                                                            .target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="h-9 rounded-lg border border-input bg-background px-2 text-sm"
                                                            />
                                                        </td>
                                                        <td className="px-3 py-3">
                                                            <input
                                                                type="time"
                                                                value={
                                                                    day.workEndTime
                                                                }
                                                                disabled={
                                                                    !day.isWorking ||
                                                                    isBusy
                                                                }
                                                                onChange={(
                                                                    event,
                                                                ) =>
                                                                    void setFieldValue(
                                                                        `days[${index}].workEndTime`,
                                                                        event
                                                                            .target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="h-9 rounded-lg border border-input bg-background px-2 text-sm"
                                                            />
                                                            {rowError && (
                                                                <p
                                                                    className="mt-1 text-xs text-destructive"
                                                                    role="alert"
                                                                >
                                                                    {rowError}
                                                                </p>
                                                            )}
                                                        </td>
                                                        <td className="px-3 py-3">
                                                            <div className="flex flex-wrap justify-end gap-2">
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    disabled={
                                                                        isBusy ||
                                                                        Boolean(
                                                                            validateWorkingDay(
                                                                                day,
                                                                            ),
                                                                        )
                                                                    }
                                                                    onClick={async () => {
                                                                        onClearError();
                                                                        await onSaveDay(
                                                                            day.dayOfWeek,
                                                                            {
                                                                                isWorking:
                                                                                    day.isWorking,
                                                                                workStartTime:
                                                                                    day.workStartTime,
                                                                                workEndTime:
                                                                                    day.workEndTime,
                                                                            },
                                                                        );
                                                                    }}
                                                                >
                                                                    {isRowSubmitting
                                                                        ? "Збереження…"
                                                                        : "Зберегти день"}
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    disabled={
                                                                        isBusy ||
                                                                        !day.isWorking
                                                                    }
                                                                    onClick={async () => {
                                                                        onClearError();
                                                                        await onRemoveDay(
                                                                            day.dayOfWeek,
                                                                        );
                                                                    }}
                                                                >
                                                                    {isRowDeleting
                                                                        ? "Видалення…"
                                                                        : "Вихідний"}
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </FieldArray>
                                </tbody>
                            </table>
                        </div>

                        <ErrorAlert message={error} />

                        <Button
                            type="submit"
                            disabled={
                                isSubmitting ||
                                isSubmittingWeek ||
                                submittingDay !== null ||
                                deletingDay !== null
                            }
                        >
                            {isSubmittingWeek
                                ? "Збереження…"
                                : "Зберегти тиждень"}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}

"use client";

import { useField } from "formik";

import { cn } from "@/shared/lib/utils";

const selectClassName =
    "flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

type FormSelectOption = {
    value: string;
    label: string;
};

type FormSelectProps = {
    name: string;
    label: string;
    options: readonly FormSelectOption[];
    disabled?: boolean;
};

export function FormSelect({
    name,
    label,
    options,
    disabled,
}: FormSelectProps) {
    const [field, meta] = useField(name);
    const hasError = meta.touched && Boolean(meta.error);

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="text-sm font-medium">
                {label}
            </label>
            <select
                {...field}
                id={name}
                disabled={disabled}
                aria-invalid={hasError}
                className={cn(
                    selectClassName,
                    hasError && "border-destructive ring-destructive/20",
                )}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {hasError && (
                <p className="text-sm text-destructive" role="alert">
                    {meta.error}
                </p>
            )}
        </div>
    );
}

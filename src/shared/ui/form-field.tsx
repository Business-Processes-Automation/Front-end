"use client";

import { useField } from "formik";

import { cn } from "@/shared/lib/utils";

const inputClassName =
    "flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

type FormFieldProps = {
    name: string;
    label: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    autoComplete?: string;
    disabled?: boolean;
};

export function FormField({
    name,
    label,
    type = "text",
    placeholder,
    autoComplete,
    disabled,
}: FormFieldProps) {
    const [field, meta] = useField(name);
    const hasError = meta.touched && Boolean(meta.error);

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="text-sm font-medium">
                {label}
            </label>
            <input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                aria-invalid={hasError}
                className={cn(
                    inputClassName,
                    hasError && "border-destructive ring-destructive/20",
                )}
            />
            {hasError && (
                <p className="text-sm text-destructive" role="alert">
                    {meta.error}
                </p>
            )}
        </div>
    );
}

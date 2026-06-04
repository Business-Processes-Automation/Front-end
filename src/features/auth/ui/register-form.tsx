"use client";

import { Form, Formik } from "formik";

import { DEFAULT_TIME_ZONE, TIME_ZONE_OPTIONS } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-field";
import { FormSelect } from "@/shared/ui/form-select";

import { useAuth } from "../hooks/use-auth";
import type { RegisterCredentials } from "../model";
import { registerValidationSchema } from "../model/validation-schemas";
import { AuthFormError } from "./auth-form-error";

type RegisterFormValues = RegisterCredentials & {
    confirmPassword: string;
};

const initialValues: RegisterFormValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    timeZone: DEFAULT_TIME_ZONE,
    password: "",
    confirmPassword: "",
};

export function RegisterForm() {
    const { error, isSubmitting, signUp, goToApp } = useAuth();

    const handleSubmit = async (values: RegisterFormValues) => {
        const success = await signUp({
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            username: values.username.trim(),
            email: values.email.trim(),
            phoneNumber: values.phoneNumber.trim(),
            timeZone: values.timeZone,
            password: values.password,
        });

        if (success) {
            goToApp();
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className="space-y-4" noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            name="firstName"
                            label="First Name"
                            autoComplete="given-name"
                            disabled={isSubmitting}
                        />
                        <FormField
                            name="lastName"
                            label="Last Name"
                            autoComplete="family-name"
                            disabled={isSubmitting}
                        />
                    </div>

                    <FormField
                        name="username"
                        label="Username"
                        autoComplete="username"
                        placeholder="anna_nails"
                        disabled={isSubmitting}
                    />

                    <FormField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="anna@gmail.com"
                        autoComplete="email"
                        disabled={isSubmitting}
                    />

                    <FormField
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        placeholder="+380991112233"
                        autoComplete="tel"
                        disabled={isSubmitting}
                    />

                    <FormSelect
                        name="timeZone"
                        label="Time Zone"
                        options={TIME_ZONE_OPTIONS}
                        disabled={isSubmitting}
                    />

                    <FormField
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                    />

                    <FormField
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                    />

                    <AuthFormError message={error} />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating account…" : "Create account"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

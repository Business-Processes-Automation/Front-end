"use client";

import { Form, Formik } from "formik";

import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-field";

import { useAuth } from "../hooks/use-auth";
import type { LoginCredentials } from "../model";
import { loginValidationSchema } from "../model/validation-schemas";
import { AuthFormError } from "./auth-form-error";

const initialValues: LoginCredentials = {
    email: "",
    password: "",
};

export function LoginForm() {
    const { error, isSubmitting, signIn, goToApp } = useAuth();

    const handleSubmit = async (values: LoginCredentials) => {
        const success = await signIn({
            email: values.email.trim(),
            password: values.password,
        });

        if (success) {
            goToApp();
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className="space-y-4" noValidate>
                    <FormField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={isSubmitting}
                    />

                    <FormField
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        disabled={isSubmitting}
                    />

                    <AuthFormError message={error} />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in…" : "Sign in"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

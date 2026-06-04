import type { AxiosError } from "axios";

type ApiErrorBody = {
    message?: string;
    title?: string;
    detail?: string;
    errors?: Record<string, string[]>;
};

export function isAxiosError(error: unknown): error is AxiosError {
    return (
        typeof error === "object" &&
        error !== null &&
        "isAxiosError" in error &&
        (error as AxiosError).isAxiosError === true
    );
}

export function isUnauthorizedError(error: unknown): boolean {
    return isAxiosError(error) && error.response?.status === 401;
}

export function getApiErrorMessage(error: unknown): string {
    if (isAxiosError(error)) {
        const data = error.response?.data;

        if (typeof data === "string" && data.trim()) {
            return data;
        }

        if (data && typeof data === "object") {
            const body = data as ApiErrorBody;

            if (body.errors) {
                const messages = Object.values(body.errors).flat();
                if (messages.length > 0) {
                    return messages.join(" ");
                }
            }

            if (body.detail) {
                return body.detail;
            }

            if (body.title) {
                return body.title;
            }

            if (body.message) {
                return body.message;
            }
        }

        if (error.response?.status === 401) {
            return "Невірний email або пароль";
        }

        return error.message || "Сталася помилка";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Сталася помилка";
}

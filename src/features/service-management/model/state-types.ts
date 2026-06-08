import type { Service } from "@/entities/service";

export type ServicesState = {
    items: Service[];
    isInitialized: boolean;
    isListLoading: boolean;
    isSubmitting: boolean;
    error: string | null;
};

export type UpdateServicePayload = {
    id: number;
    input: import("@/entities/service").ServiceInput;
};

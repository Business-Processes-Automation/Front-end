import type { User } from "@/entities/user";

import type { LoginRequest, RegisterRequest } from "../api/types";

export type AuthState = {
    user: User | null;
    isInitialized: boolean;
    isSubmitting: boolean;
    error: string | null;
};

export type LoginCredentials = LoginRequest;
export type RegisterCredentials = RegisterRequest;

"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { APP_ROUTES } from "@/shared/config";
import { useAppDispatch, useAppSelector } from "@/shared/store";

import {
    clearAuthError,
    fetchCurrentUser,
    login,
    logout,
    register,
    selectAuthError,
    selectCurrentUser,
    selectIsAuthenticated,
    selectIsAuthLoading,
    selectIsSessionPending,
    selectIsSubmitting,
} from "../model";
import type { LoginCredentials, RegisterCredentials } from "../model";

export function useAuth() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const user = useAppSelector(selectCurrentUser);
    const error = useAppSelector(selectAuthError);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isLoading = useAppSelector(selectIsAuthLoading);
    const isSubmitting = useAppSelector(selectIsSubmitting);
    const isSessionPending = useAppSelector(selectIsSessionPending);

    const signIn = useCallback(
        async (credentials: LoginCredentials) => {
            dispatch(clearAuthError());
            const result = await dispatch(login(credentials));
            return login.fulfilled.match(result);
        },
        [dispatch],
    );

    const signUp = useCallback(
        async (credentials: RegisterCredentials) => {
            dispatch(clearAuthError());
            const result = await dispatch(register(credentials));
            return register.fulfilled.match(result);
        },
        [dispatch],
    );

    const signOut = useCallback(async () => {
        await dispatch(logout());
        router.replace(APP_ROUTES.login);
    }, [dispatch, router]);

    const restoreSession = useCallback(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const goToApp = useCallback(() => {
        router.replace(APP_ROUTES.calendar);
    }, [router]);

    return {
        user,
        error,
        isAuthenticated,
        isLoading,
        isSubmitting,
        isSessionPending,
        signIn,
        signUp,
        signOut,
        restoreSession,
        goToApp,
        clearError: () => dispatch(clearAuthError()),
    };
}

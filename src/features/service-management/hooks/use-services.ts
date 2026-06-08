"use client";

import { useCallback, useEffect, useRef } from "react";

import type { Service, ServiceInput } from "@/entities/service";
import { selectCurrentUser } from "@/features/auth/model";
import { useAppDispatch, useAppSelector } from "@/shared/store";

import {
    clearServicesError,
    createService,
    deleteService,
    fetchServices,
    resetServices,
    selectIsServiceSubmitting,
    selectIsServicesInitialized,
    selectIsServicesListLoading,
    selectServices,
    selectServicesError,
    updateService,
} from "../model";

export function useServices() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectCurrentUser)?.id;
    const prevUserIdRef = useRef<number | undefined>(undefined);

    const services = useAppSelector(selectServices);
    const error = useAppSelector(selectServicesError);
    const isInitialized = useAppSelector(selectIsServicesInitialized);
    const isListLoading = useAppSelector(selectIsServicesListLoading);
    const isSubmitting = useAppSelector(selectIsServiceSubmitting);

    const loadServices = useCallback(() => {
        dispatch(clearServicesError());
        return dispatch(fetchServices());
    }, [dispatch]);

    useEffect(() => {
        if (!userId) {
            return;
        }

        if (prevUserIdRef.current !== userId) {
            dispatch(resetServices());
            prevUserIdRef.current = userId;
        }

        if (isInitialized || isListLoading) {
            return;
        }

        void loadServices();
    }, [userId, isInitialized, isListLoading, loadServices, dispatch]);

    const addService = useCallback(
        async (input: ServiceInput) => {
            dispatch(clearServicesError());
            const result = await dispatch(createService(input));
            return createService.fulfilled.match(result);
        },
        [dispatch],
    );

    const editService = useCallback(
        async (id: number, input: ServiceInput) => {
            dispatch(clearServicesError());
            const result = await dispatch(updateService({ id, input }));
            return updateService.fulfilled.match(result);
        },
        [dispatch],
    );

    const removeService = useCallback(
        async (id: number) => {
            dispatch(clearServicesError());
            const result = await dispatch(deleteService(id));
            return deleteService.fulfilled.match(result);
        },
        [dispatch],
    );

    return {
        userId,
        services,
        error,
        isInitialized,
        isListLoading,
        isSubmitting,
        loadServices,
        addService,
        editService,
        removeService,
        clearError: () => dispatch(clearServicesError()),
    };
}

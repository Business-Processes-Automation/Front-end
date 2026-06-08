"use client";

import { useCallback } from "react";

import type {
    AppointmentListQuery,
    CreateAppointmentInput,
    RescheduleAppointmentInput,
    UpdateAppointmentInput,
} from "@/entities/appointment";
import { selectCurrentUser } from "@/features/auth/model";
import { useAppDispatch, useAppSelector } from "@/shared/store";

import {
    cancelAppointment,
    clearAppointmentsError,
    createAppointment,
    fetchAppointments,
    rescheduleAppointment,
    selectAppointments,
    selectAppointmentsError,
    selectAppointmentsLastQuery,
    selectIsAppointmentSubmitting,
    selectIsAppointmentsInitialized,
    selectIsAppointmentsListLoading,
    updateAppointment,
} from "../model";

export function useAppointments() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectCurrentUser)?.id;

    const items = useAppSelector(selectAppointments);
    const lastQuery = useAppSelector(selectAppointmentsLastQuery);
    const error = useAppSelector(selectAppointmentsError);
    const isInitialized = useAppSelector(selectIsAppointmentsInitialized);
    const isListLoading = useAppSelector(selectIsAppointmentsListLoading);
    const isSubmitting = useAppSelector(selectIsAppointmentSubmitting);

    const loadAppointments = useCallback(
        (query: AppointmentListQuery) => {
            dispatch(clearAppointmentsError());
            return dispatch(fetchAppointments(query));
        },
        [dispatch],
    );

    const addAppointment = useCallback(
        async (input: CreateAppointmentInput) => {
            dispatch(clearAppointmentsError());
            const result = await dispatch(createAppointment(input));
            return createAppointment.fulfilled.match(result);
        },
        [dispatch],
    );

    const editAppointment = useCallback(
        async (id: number, input: UpdateAppointmentInput) => {
            dispatch(clearAppointmentsError());
            const result = await dispatch(updateAppointment({ id, input }));
            return updateAppointment.fulfilled.match(result);
        },
        [dispatch],
    );

    const cancelAppointmentById = useCallback(
        async (id: number) => {
            dispatch(clearAppointmentsError());
            const result = await dispatch(cancelAppointment(id));
            return cancelAppointment.fulfilled.match(result);
        },
        [dispatch],
    );

    const rescheduleAppointmentById = useCallback(
        async (id: number, input: RescheduleAppointmentInput) => {
            dispatch(clearAppointmentsError());
            const result = await dispatch(
                rescheduleAppointment({ id, input }),
            );
            return rescheduleAppointment.fulfilled.match(result);
        },
        [dispatch],
    );

    return {
        userId,
        items,
        lastQuery,
        error,
        isInitialized,
        isListLoading,
        isSubmitting,
        loadAppointments,
        addAppointment,
        editAppointment,
        cancelAppointmentById,
        rescheduleAppointmentById,
        clearError: () => dispatch(clearAppointmentsError()),
    };
}

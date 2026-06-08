"use client";

import { useEffect, useMemo, useState } from "react";

import type { Appointment } from "@/entities/appointment";
import type { AppointmentListQuery } from "@/entities/appointment";
import { DEFAULT_MAX_RESCHEDULE_COUNT } from "@/entities/schedule";
import type { Service } from "@/entities/service";
import { selectScheduleSettings } from "@/features/schedule-management/model";
import { getMonthDateRange } from "@/shared/lib/date";
import { shallowEqual } from "@/shared/lib/shallow-equal";
import { validateDateRange } from "@/shared/lib/validate-date-range";
import { useAppSelector } from "@/shared/store";
import {
    AsyncLoadingMessage,
    ErrorAlert,
} from "@/shared/ui/async-state";
import { Button } from "@/shared/ui/button";

import { useAppointments } from "../hooks/use-appointments";
import { AppointmentCreateForm } from "./appointment-create-form";
import {
    AppointmentFilters,
    type AppointmentFiltersState,
} from "./appointment-filters";
import { AppointmentEditSection } from "./appointment-edit-section";
import { AppointmentsList } from "./appointments-list";

type FormMode = "hidden" | "create" | "edit";

type AppointmentsPanelProps = {
    services: Service[];
};

const defaultRange = getMonthDateRange();

function buildListQuery(
    filters: AppointmentFiltersState,
): AppointmentListQuery | null {
    const rangeError = validateDateRange(filters.from, filters.to);
    if (rangeError) {
        return null;
    }

    return {
        from: filters.from,
        to: filters.to,
        status: filters.status
            ? (filters.status as AppointmentListQuery["status"])
            : undefined,
        serviceId: filters.serviceId ? Number(filters.serviceId) : undefined,
    };
}

export function AppointmentsPanel({ services }: AppointmentsPanelProps) {
    const scheduleSettings = useAppSelector(selectScheduleSettings);
    const maxRescheduleCount =
        scheduleSettings?.maxRescheduleCount ?? DEFAULT_MAX_RESCHEDULE_COUNT;
    const {
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
        clearError,
    } = useAppointments();

    const [filters, setFilters] = useState<AppointmentFiltersState>({
        from: defaultRange.from,
        to: defaultRange.to,
        status: "",
        serviceId: "",
    });
    const [formMode, setFormMode] = useState<FormMode>("hidden");
    const [editingAppointment, setEditingAppointment] =
        useState<Appointment | null>(null);
    const [rangeError, setRangeError] = useState<string | null>(null);

    const query = useMemo(() => buildListQuery(filters), [filters]);

    useEffect(() => {
        if (!userId || !query) {
            return;
        }

        if (shallowEqual(query, lastQuery)) {
            return;
        }

        void loadAppointments(query);
    }, [userId, query, lastQuery, loadAppointments]);

    useEffect(() => {
        setRangeError(
            query ? null : validateDateRange(filters.from, filters.to),
        );
    }, [query, filters.from, filters.to]);

    if (!userId) {
        return null;
    }

    const openCreateForm = () => {
        clearError();
        setEditingAppointment(null);
        setFormMode("create");
    };

    const openEditForm = (appointment: Appointment) => {
        clearError();
        setEditingAppointment(appointment);
        setFormMode("edit");
    };

    const closeForm = () => {
        clearError();
        setEditingAppointment(null);
        setFormMode("hidden");
    };

    const handleReload = () => {
        if (!query) {
            return;
        }

        clearError();
        void loadAppointments(query);
    };

    const handleCreate = async (
        input: Parameters<typeof addAppointment>[0],
    ) => {
        const success = await addAppointment(input);
        if (success) {
            closeForm();
            if (query) {
                void loadAppointments(query);
            }
        }
        return success;
    };

    const reloadAfterMutation = () => {
        closeForm();
        if (query) {
            void loadAppointments(query);
        }
    };

    const handleUpdate = async (
        input: Parameters<typeof editAppointment>[1],
    ) => {
        if (!editingAppointment) {
            return false;
        }

        const success = await editAppointment(editingAppointment.id, input);
        if (success) {
            reloadAfterMutation();
        }
        return success;
    };

    const handleReschedule = async (
        input: Parameters<typeof rescheduleAppointmentById>[1],
    ) => {
        if (!editingAppointment) {
            return false;
        }

        const success = await rescheduleAppointmentById(
            editingAppointment.id,
            input,
        );
        if (success) {
            reloadAfterMutation();
        }
        return success;
    };

    const handleCancel = async () => {
        if (!editingAppointment) {
            return false;
        }

        const success = await cancelAppointmentById(editingAppointment.id);
        if (success) {
            reloadAfterMutation();
        }
        return success;
    };

    return (
        <section className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                    <h2 className="text-sm font-medium">Керування записами</h2>
                    <p className="text-sm text-muted-foreground">
                        Список, створення, оновлення, перенесення та скасування
                        записів за період.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={isListLoading || !query}
                        onClick={handleReload}
                    >
                        Оновити
                    </Button>
                    {formMode === "hidden" && (
                        <Button type="button" size="sm" onClick={openCreateForm}>
                            Новий запис
                        </Button>
                    )}
                </div>
            </div>

            <AppointmentFilters
                value={filters}
                services={services}
                onChange={setFilters}
            />

            {rangeError && (
                <p className="text-sm text-destructive" role="alert">
                    {rangeError}
                </p>
            )}

            {formMode === "create" && (
                <section className="rounded-lg border bg-muted/10 p-4">
                    <h3 className="mb-4 text-sm font-medium">Новий запис</h3>
                    <AppointmentCreateForm
                        services={services}
                        isSubmitting={isSubmitting}
                        error={error}
                        onSubmit={handleCreate}
                        onCancel={closeForm}
                    />
                </section>
            )}

            {formMode === "edit" && editingAppointment && (
                <section className="rounded-lg border bg-muted/10 p-4">
                    <h3 className="mb-4 text-sm font-medium">
                        Редагування запису #{editingAppointment.id}
                    </h3>
                    <AppointmentEditSection
                        appointment={editingAppointment}
                        services={services}
                        maxRescheduleCount={maxRescheduleCount}
                        isSubmitting={isSubmitting}
                        error={error}
                        onUpdate={handleUpdate}
                        onReschedule={handleReschedule}
                        onCancelAppointment={handleCancel}
                        onClose={closeForm}
                    />
                </section>
            )}

            {isListLoading && !isInitialized && (
                <AsyncLoadingMessage message="Завантаження записів…" />
            )}

            <ErrorAlert message={formMode === "hidden" ? error : null} />

            {query && (
                <AppointmentsList
                    appointments={items}
                    isSubmitting={isSubmitting}
                    selectedId={editingAppointment?.id ?? null}
                    onSelect={openEditForm}
                />
            )}
        </section>
    );
}

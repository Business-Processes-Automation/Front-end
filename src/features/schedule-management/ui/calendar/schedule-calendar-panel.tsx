"use client";

import { useEffect, useMemo, useState } from "react";

import type { AppointmentStatus, ScheduleCalendarQuery } from "@/entities/schedule";
import type { Service } from "@/entities/service";
import { shallowEqual } from "@/shared/lib/shallow-equal";
import {
    AsyncLoadingMessage,
    ErrorAlert,
} from "@/shared/ui/async-state";
import { Button } from "@/shared/ui/button";

import { useScheduleCalendar } from "../../hooks/use-schedule-calendar";
import { AppointmentDetailsCard } from "./appointment-details-card";
import {
    CalendarFilters,
    type CalendarFiltersState,
} from "./calendar-filters";
import { FullCalendarView } from "./full-calendar-view";

type ScheduleCalendarPanelProps = {
    services: Service[];
};

function buildCalendarQuery(
    visibleRange: { from: string; to: string },
    filters: CalendarFiltersState,
): ScheduleCalendarQuery {
    return {
        from: visibleRange.from,
        to: visibleRange.to,
        includeCancelled: filters.includeCancelled,
        status: filters.status
            ? (filters.status as AppointmentStatus)
            : undefined,
        serviceId: filters.serviceId ? Number(filters.serviceId) : undefined,
    };
}

export function ScheduleCalendarPanel({ services }: ScheduleCalendarPanelProps) {
    const {
        userId,
        calendar,
        lastQuery,
        selectedAppointment,
        error,
        isInitialized,
        isCalendarLoading,
        loadCalendar,
        loadAppointment,
        clearSelectedAppointment,
        clearError,
    } = useScheduleCalendar();

    const [visibleRange, setVisibleRange] = useState<{
        from: string;
        to: string;
    } | null>(null);
    const [filters, setFilters] = useState<CalendarFiltersState>({
        includeCancelled: false,
        status: "",
        serviceId: "",
    });

    const query = useMemo(
        () => (visibleRange ? buildCalendarQuery(visibleRange, filters) : null),
        [visibleRange, filters],
    );

    useEffect(() => {
        if (!userId || !query) {
            return;
        }

        if (shallowEqual(query, lastQuery)) {
            return;
        }

        void loadCalendar(query);
    }, [userId, query, lastQuery, loadCalendar]);

    if (!userId) {
        return null;
    }

    const handleReload = () => {
        if (!query) {
            return;
        }

        clearError();
        void loadCalendar(query);
    };

    return (
        <section className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold tracking-tight">
                        Календар записів
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Перегляд за день, тиждень або місяць. Клік по запису —
                        деталі. Створення та редагування — у блоці нижче.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isCalendarLoading || !query}
                    onClick={handleReload}
                >
                    Оновити
                </Button>
            </div>

            <CalendarFilters
                value={filters}
                services={services}
                onChange={setFilters}
            />

            {isCalendarLoading && !isInitialized && (
                <AsyncLoadingMessage message="Завантаження календаря…" />
            )}

            <ErrorAlert message={error} />

            <FullCalendarView
                calendar={calendar}
                isLoading={isCalendarLoading}
                onDatesChange={setVisibleRange}
                onAppointmentClick={(id) => void loadAppointment(id)}
            />

            {selectedAppointment && (
                <AppointmentDetailsCard
                    appointment={selectedAppointment}
                    onClose={clearSelectedAppointment}
                />
            )}
        </section>
    );
}

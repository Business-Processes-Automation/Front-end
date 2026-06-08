"use client";

import type { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import ukLocale from "@fullcalendar/core/locales/uk";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useMemo, useRef } from "react";

import type { ScheduleCalendar } from "@/entities/schedule";
import { getDateRangeFromCalendarView } from "@/shared/lib/date";

import {
    getCalendarSlotBounds,
    mapScheduleCalendarToBusinessHours,
    mapScheduleCalendarToEvents,
} from "./map-fullcalendar-events";
import "./full-calendar-theme.css";

type FullCalendarViewProps = {
    calendar: ScheduleCalendar | null;
    isLoading: boolean;
    onDatesChange: (range: { from: string; to: string }) => void;
    onAppointmentClick: (appointmentId: number) => void;
};

const timeFormat = {
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    hour12: false,
};

export function FullCalendarView({
    calendar,
    isLoading,
    onDatesChange,
    onAppointmentClick,
}: FullCalendarViewProps) {
    const lastRangeKey = useRef<string | null>(null);

    const events = useMemo(
        () => (calendar ? mapScheduleCalendarToEvents(calendar) : []),
        [calendar],
    );

    const businessHours = useMemo(
        () => (calendar ? mapScheduleCalendarToBusinessHours(calendar.days) : false),
        [calendar],
    );

    const { slotMinTime, slotMaxTime } = useMemo(
        () =>
            calendar
                ? getCalendarSlotBounds(calendar.days)
                : { slotMinTime: "08:00:00", slotMaxTime: "20:00:00" },
        [calendar],
    );

    const handleDatesSet = (arg: DatesSetArg) => {
        const range = getDateRangeFromCalendarView(arg.start, arg.end);
        const rangeKey = `${range.from}|${range.to}|${arg.view.type}`;

        if (lastRangeKey.current === rangeKey) {
            return;
        }

        lastRangeKey.current = rangeKey;
        onDatesChange(range);
    };

    const handleEventClick = (arg: EventClickArg) => {
        const appointmentId = arg.event.extendedProps.appointmentId;

        if (typeof appointmentId === "number") {
            onAppointmentClick(appointmentId);
        }
    };

    return (
        <div
            className={`schedule-fullcalendar relative rounded-lg border bg-card p-2 sm:p-3 ${
                isLoading ? "opacity-70" : ""
            }`}
        >
            {isLoading && (
                <div className="pointer-events-none absolute inset-x-0 top-2 z-10 flex justify-center">
                    <span className="rounded-full border bg-background/90 px-3 py-1 text-xs text-muted-foreground shadow-sm">
                        Оновлення…
                    </span>
                </div>
            )}

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                locales={[ukLocale]}
                locale="uk"
                firstDay={1}
                height="auto"
                contentHeight={680}
                expandRows
                nowIndicator
                allDaySlot
                slotMinTime={slotMinTime}
                slotMaxTime={slotMaxTime}
                businessHours={businessHours}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                buttonText={{
                    today: "Сьогодні",
                    month: "Місяць",
                    week: "Тиждень",
                    day: "День",
                }}
                slotLabelFormat={timeFormat}
                eventTimeFormat={timeFormat}
                events={events}
                datesSet={handleDatesSet}
                eventClick={handleEventClick}
                dayMaxEvents={3}
                moreLinkText={(count) => `+${count} ще`}
                navLinks
                stickyHeaderDates
            />

            {calendar && (
                <p className="mt-2 text-xs text-muted-foreground">
                    Таймзона: {calendar.timeZone}
                </p>
            )}
        </div>
    );
}

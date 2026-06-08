"use client";

import { AppointmentsPanel } from "@/features/appointment-management";
import { ScheduleCalendarPanel } from "@/features/schedule-management";
import { useServices } from "@/features/service-management";

export function CalendarPageContent() {
    const { services } = useServices();

    return (
        <div className="space-y-6">
            <ScheduleCalendarPanel services={services} />
            <AppointmentsPanel services={services} />
        </div>
    );
}

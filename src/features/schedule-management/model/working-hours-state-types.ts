import type { Weekday, WorkingHoursDay } from "@/entities/schedule";

export type WorkingHoursState = {
    week: WorkingHoursDay[] | null;
    isInitialized: boolean;
    isLoading: boolean;
    isSubmittingWeek: boolean;
    submittingDay: Weekday | null;
    deletingDay: Weekday | null;
    error: string | null;
};

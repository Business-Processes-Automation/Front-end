import type { ScheduleSettings } from "@/entities/schedule";

export type ScheduleSettingsState = {
    settings: ScheduleSettings | null;
    isInitialized: boolean;
    isNotFound: boolean;
    isLoading: boolean;
    isSubmitting: boolean;
    error: string | null;
};

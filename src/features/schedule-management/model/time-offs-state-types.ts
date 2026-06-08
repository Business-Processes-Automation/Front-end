import type { TimeOff, TimeOffDateRange } from "@/entities/schedule";

export type TimeOffsState = {
    items: TimeOff[];
    range: TimeOffDateRange | null;
    isInitialized: boolean;
    isLoading: boolean;
    isSubmitting: boolean;
    deletingId: number | null;
    error: string | null;
};

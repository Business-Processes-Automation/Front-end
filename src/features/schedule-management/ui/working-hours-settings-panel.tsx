"use client";

import {
    AsyncLoadingMessage,
    AsyncErrorRetry,
} from "@/shared/ui/async-state";
import { SettingsSection } from "@/shared/ui/settings-section";

import { useWorkingHours } from "../hooks/use-working-hours";
import { TimeOffsPanel } from "./time-offs-panel";
import { WorkingHoursWeekForm } from "./working-hours-week-form";

export function WorkingHoursSettingsPanel() {
    const {
        userId,
        week,
        error,
        isInitialized,
        isLoading,
        isSubmittingWeek,
        submittingDay,
        deletingDay,
        reload,
        saveWeek,
        saveDay,
        removeDay,
        clearError,
    } = useWorkingHours();

    if (!userId) {
        return null;
    }

    if (isLoading && !isInitialized) {
        return <AsyncLoadingMessage message="Завантаження робочих годин…" />;
    }

    if (error && !week) {
        return <AsyncErrorRetry message={error} onRetry={reload} />;
    }

    if (!week) {
        return null;
    }

    return (
        <div className="space-y-8">
            <SettingsSection
                title="Тижневий графік"
                description="Робочі дні та години для кожного дня тижня (Пн → Нд)."
            >
                <WorkingHoursWeekForm
                    initialDays={week}
                    error={error}
                    isSubmittingWeek={isSubmittingWeek}
                    submittingDay={submittingDay}
                    deletingDay={deletingDay}
                    onSaveWeek={saveWeek}
                    onSaveDay={saveDay}
                    onRemoveDay={removeDay}
                    onClearError={clearError}
                />
            </SettingsSection>

            <TimeOffsPanel />
        </div>
    );
}

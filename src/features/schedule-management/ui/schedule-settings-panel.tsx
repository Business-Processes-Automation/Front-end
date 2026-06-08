"use client";

import { DEFAULT_SCHEDULE_SETTINGS } from "@/entities/schedule";
import {
    AsyncLoadingMessage,
    AsyncErrorRetry,
} from "@/shared/ui/async-state";
import { SettingsSection } from "@/shared/ui/settings-section";

import { useScheduleSettings } from "../hooks/use-schedule-settings";
import { ScheduleSettingsForm } from "./schedule-settings-form";

export function ScheduleSettingsPanel() {
    const {
        userId,
        settings,
        error,
        isInitialized,
        isNotFound,
        isLoading,
        isSubmitting,
        reload,
        saveSettings,
    } = useScheduleSettings();

    if (!userId) {
        return null;
    }

    if (isLoading && !isInitialized) {
        return (
            <AsyncLoadingMessage message="Завантаження налаштувань записів…" />
        );
    }

    if (error && !settings && !isNotFound) {
        return <AsyncErrorRetry message={error} onRetry={reload} />;
    }

    if (isNotFound) {
        return (
            <SettingsSection
                title="Правила запису"
                description="Налаштуйте перерви між клієнтами, крок слотів, мінімальний час до запису та інші обмеження."
            >
                <ScheduleSettingsForm
                    initialValues={DEFAULT_SCHEDULE_SETTINGS}
                    submitLabel="Створити налаштування"
                    error={error}
                    isSubmitting={isSubmitting}
                    onSubmit={saveSettings}
                />
            </SettingsSection>
        );
    }

    if (!settings) {
        return null;
    }

    return (
        <SettingsSection
            title="Правила запису"
            description="Перерва між клієнтами, крок слотів, горизонт запису, переноси та політика скасування."
        >
            <ScheduleSettingsForm
                initialValues={settings}
                submitLabel="Зберегти налаштування"
                error={error}
                isSubmitting={isSubmitting}
                onSubmit={saveSettings}
            />
        </SettingsSection>
    );
}

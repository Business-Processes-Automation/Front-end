"use client";

import { CalendarClock, Clock3, Send } from "lucide-react";

import {
    ScheduleSettingsPanel,
    WorkingHoursSettingsPanel,
} from "@/features/schedule-management";
import { TelegramSettingsPanel } from "@/features/telegram-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const SETTINGS_TABS = [
    {
        value: "booking",
        label: "Налаштування записів",
        icon: CalendarClock,
    },
    {
        value: "working-hours",
        label: "Робочі години",
        icon: Clock3,
    },
    {
        value: "telegram",
        label: "Telegram",
        icon: Send,
    },
] as const;

const tabContentClassName =
    "outline-none data-[state=inactive]:hidden";

export function SettingsPage() {
    return (
        <div className="space-y-6">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Налаштування
                </h1>
                <p className="text-sm text-muted-foreground">
                    Правила запису, робочий графік та інтеграція з Telegram.
                </p>
            </header>

            <Tabs defaultValue="booking" className="gap-6">
                <TabsList className="h-auto min-h-10 w-full justify-start p-1">
                    {SETTINGS_TABS.map(({ value, label, icon: Icon }) => (
                        <TabsTrigger
                            key={value}
                            value={value}
                            className="gap-2 px-4"
                        >
                            <Icon className="size-4" />
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent
                    value="booking"
                    forceMount
                    className={tabContentClassName}
                >
                    <ScheduleSettingsPanel />
                </TabsContent>

                <TabsContent
                    value="working-hours"
                    forceMount
                    className={tabContentClassName}
                >
                    <WorkingHoursSettingsPanel />
                </TabsContent>

                <TabsContent
                    value="telegram"
                    forceMount
                    className={tabContentClassName}
                >
                    <TelegramSettingsPanel />
                </TabsContent>
            </Tabs>
        </div>
    );
}

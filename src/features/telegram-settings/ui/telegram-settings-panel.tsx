"use client";

import dayjs from "dayjs";

import {
    AsyncLoadingMessage,
    ErrorAlert,
} from "@/shared/ui/async-state";
import { Button } from "@/shared/ui/button";
import { SettingsSection } from "@/shared/ui/settings-section";

import { useTelegramLink } from "../hooks/use-telegram-link";

export function TelegramSettingsPanel() {
    const {
        userId,
        status,
        linkCode,
        isLoading,
        isGenerating,
        error,
        loadStatus,
        generateLinkCode,
    } = useTelegramLink();

    if (!userId) {
        return null;
    }

    if (isLoading && !status) {
        return <AsyncLoadingMessage message="Завантаження статусу Telegram…" />;
    }

    return (
        <SettingsSection
            title="Telegram-акаунт"
            description="Прив’яжіть бота, щоб клієнти могли записуватися через Telegram. Записи з бота відображаються в календарі."
        >
            {status?.isLinked ? (
                <div className="space-y-3 rounded-lg border bg-card p-4">
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                        Telegram прив’язано
                    </p>
                    {status.botStartParameter && (
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Ідентифікатор бота
                            </p>
                            <p className="font-mono text-sm">
                                {status.botStartParameter}
                            </p>
                        </div>
                    )}
                    {status.clientLinkUrl && (
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Посилання для клієнтів
                            </p>
                            <a
                                href={status.clientLinkUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="break-all text-sm text-primary underline-offset-4 hover:underline"
                            >
                                {status.clientLinkUrl}
                            </a>
                        </div>
                    )}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed bg-muted/20 p-4 text-sm text-muted-foreground">
                    Telegram ще не прив’язано. Натисніть «Прив’язати Telegram»,
                    скопіюйте код і надішліть його боту в особистих
                    повідомленнях. Код дійсний 15 хвилин.
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                <Button
                    type="button"
                    onClick={() => void generateLinkCode()}
                    disabled={isGenerating || status?.isLinked}
                >
                    {isGenerating ? "Генерація…" : "Прив’язати Telegram"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => void loadStatus()}
                >
                    Оновити статус
                </Button>
            </div>

            {linkCode && !status?.isLinked && (
                <div className="space-y-2 rounded-lg border bg-card p-4">
                    <p className="text-sm font-medium">Код прив’язки</p>
                    <p className="font-mono text-2xl tracking-widest">
                        {linkCode.code}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Дійсний до{" "}
                        {dayjs(linkCode.expiresAtUtc).format(
                            "DD.MM.YYYY HH:mm",
                        )}
                    </p>
                </div>
            )}

            <ErrorAlert message={error} />
        </SettingsSection>
    );
}

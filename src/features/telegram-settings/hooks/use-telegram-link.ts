"use client";

import { useCallback, useEffect, useState } from "react";

import type { TelegramLinkCode, TelegramLinkStatus } from "@/entities/telegram";
import { telegramLinkApi } from "@/entities/telegram";
import { selectCurrentUser } from "@/features/auth/model";
import { getApiErrorMessage } from "@/shared/lib/api-error";
import { useAppSelector } from "@/shared/store";

export function useTelegramLink() {
    const userId = useAppSelector(selectCurrentUser)?.id;
    const [status, setStatus] = useState<TelegramLinkStatus | null>(null);
    const [linkCode, setLinkCode] = useState<TelegramLinkCode | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadStatus = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const nextStatus = await telegramLinkApi.getStatus();
            setStatus(nextStatus);
            if (nextStatus.isLinked) {
                setLinkCode(null);
            }
        } catch (loadError) {
            setError(getApiErrorMessage(loadError));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const generateLinkCode = useCallback(async () => {
        setIsGenerating(true);
        setError(null);

        try {
            const code = await telegramLinkApi.createLinkCode();
            setLinkCode(code);
            await loadStatus();
            return true;
        } catch (generateError) {
            setError(getApiErrorMessage(generateError));
            return false;
        } finally {
            setIsGenerating(false);
        }
    }, [loadStatus]);

    useEffect(() => {
        if (userId) {
            setStatus(null);
            setLinkCode(null);
            void loadStatus();
        }
    }, [userId, loadStatus]);

    return {
        userId,
        status,
        linkCode,
        isLoading,
        isGenerating,
        error,
        loadStatus,
        generateLinkCode,
        clearError: () => setError(null),
    };
}

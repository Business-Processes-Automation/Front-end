import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/config";

import type { TelegramLinkCode, TelegramLinkStatus } from "../model/types";
import {
    mapTelegramLinkCode,
    mapTelegramLinkStatus,
    type TelegramLinkCodeDto,
    type TelegramLinkStatusDto,
} from "./map-telegram-link";

export const telegramLinkApi = {
    getStatus() {
        return api
            .get<TelegramLinkStatusDto>(API_ROUTES.auth.telegram)
            .then(({ data }) => mapTelegramLinkStatus(data));
    },

    createLinkCode() {
        return api
            .post<TelegramLinkCodeDto>(
                API_ROUTES.auth.telegramLinkCode,
                undefined,
            )
            .then(({ data }) => mapTelegramLinkCode(data));
    },
};

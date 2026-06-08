import type { TelegramLinkCode, TelegramLinkStatus } from "../model/types";

export type TelegramLinkStatusDto = {
    isLinked: boolean;
    botStartParameter: string | null;
    clientLinkUrl: string | null;
};

export type TelegramLinkCodeDto = {
    code: string;
    expiresAtUtc: string;
};

export function mapTelegramLinkStatus(
    dto: TelegramLinkStatusDto,
): TelegramLinkStatus {
    return {
        isLinked: dto.isLinked,
        botStartParameter: dto.botStartParameter,
        clientLinkUrl: dto.clientLinkUrl,
    };
}

export function mapTelegramLinkCode(dto: TelegramLinkCodeDto): TelegramLinkCode {
    return {
        code: dto.code,
        expiresAtUtc: dto.expiresAtUtc,
    };
}

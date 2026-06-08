export type TelegramLinkStatus = {
    isLinked: boolean;
    botStartParameter: string | null;
    clientLinkUrl: string | null;
};

export type TelegramLinkCode = {
    code: string;
    expiresAtUtc: string;
};

/** Блок вихідного / перерви (відповідь GET/POST). */
export type TimeOff = {
    id: number;
    startLocal: string;
    endLocal: string;
    isFullDay: boolean;
};

/** Тіло POST /api/masters/me/schedule/time-offs. */
export type CreateTimeOffInput = {
    startLocal: string;
    endLocal: string;
    isFullDay: boolean;
};

export type TimeOffDateRange = {
    from: string;
    to: string;
};

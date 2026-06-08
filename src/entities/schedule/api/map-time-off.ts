import type { TimeOff } from "../model/time-off-types";

export type TimeOffDto = {
    id: number;
    startLocal: string;
    endLocal: string;
    isFullDay: boolean;
};

export function mapTimeOff(dto: TimeOffDto): TimeOff {
    return {
        id: dto.id,
        startLocal: dto.startLocal,
        endLocal: dto.endLocal,
        isFullDay: dto.isFullDay,
    };
}

export function mapTimeOffList(dtos: readonly TimeOffDto[]): TimeOff[] {
    return dtos.map(mapTimeOff);
}

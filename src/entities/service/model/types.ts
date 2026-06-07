import type { EntityId, ISODateTime } from "@/shared/types/common";

export type Service = {
    id: EntityId;
    userId: EntityId;
    title: string;
    price: number;
    /** Длительность услуги в минутах. */
    durationMinutes: number;
    description: string | null;
    createdAt: ISODateTime;
    updatedAt: ISODateTime;
};

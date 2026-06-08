import type { ISODateTime } from "@/shared/types/common";

/** Услуга мастера (доменная модель). */
export type Service = {
    id: number;
    serviceName: string;
    durationInMinutes: number;
    price: number;
    prepayment: number;
    preparationBeforeInMinutes: number;
    preparationAfterInMinutes: number;
    /** Вычисляется на бэкенде — только для чтения. */
    totalOccupiedMinutes: number;
    createdAt: ISODateTime;
    updatedAt: ISODateTime | null;
};

/** Поля, которые мастер задаёт при создании/редактировании. */
export type ServiceInput = {
    serviceName: string;
    durationInMinutes: number;
    price: number;
    prepayment: number;
    preparationBeforeInMinutes: number;
    preparationAfterInMinutes: number;
};

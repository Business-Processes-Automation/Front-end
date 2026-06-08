import type { ISODateTime } from "@/shared/types/common";

/** Ответ API — ServiceResponseDTO. */
export type ServiceResponseDto = {
    id: number;
    serviceName: string;
    durationInMinutes: number;
    price: number;
    prepayment: number;
    preparationBeforeInMinutes: number;
    preparationAfterInMinutes: number;
    totalOccupiedMinutes: number;
    createdAt: ISODateTime;
    updatedAt: ISODateTime | null;
};

/** Тело POST /api/masters/me/services */
export type CreateServiceRequestDto = {
    serviceName: string;
    durationInMinutes: number;
    price: number;
    prepayment: number;
    preparationBeforeInMinutes: number;
    preparationAfterInMinutes: number;
};

/** Тело PUT /api/masters/me/services/{id} */
export type UpdateServiceRequestDto = CreateServiceRequestDto;

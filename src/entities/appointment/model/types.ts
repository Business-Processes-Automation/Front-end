import type { EntityId, ISODateTime } from "@/shared/types/common";
import type { AppointmentStatus } from "./appointment-status";

export type AppointmentClient = {
    name: string;
    phone: string | null;
    telegramUserId: string | null;
};

export type Appointment = {
    id: EntityId;
    userId: EntityId;
    serviceId: EntityId;
    client: AppointmentClient;
    startsAt: ISODateTime;
    endsAt: ISODateTime;
    status: AppointmentStatus;
    notes: string | null;
    createdAt: ISODateTime;
    updatedAt: ISODateTime;
};

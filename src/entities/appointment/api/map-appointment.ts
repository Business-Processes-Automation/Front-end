import type { Appointment } from "../model/appointment-types";
import type { AppointmentDto } from "./types";

export function mapAppointment(dto: AppointmentDto): Appointment {
    return {
        id: dto.id,
        serviceId: dto.serviceId,
        serviceName: dto.serviceName,
        durationInMinutes: dto.durationInMinutes,
        totalOccupiedMinutes: dto.totalOccupiedMinutes,
        clientId: dto.clientId,
        clientName: dto.clientName,
        clientPhone: dto.clientPhone,
        startLocal: dto.startLocal,
        endLocal: dto.endLocal,
        status: dto.status,
        displayStatus: dto.displayStatus,
        rescheduleCount: dto.rescheduleCount,
        notes: dto.notes,
        priceAtBooking: dto.priceAtBooking,
        prepaymentAmount: dto.prepaymentAmount,
    };
}

export function mapAppointmentList(dtos: readonly AppointmentDto[]): Appointment[] {
    return dtos.map(mapAppointment);
}

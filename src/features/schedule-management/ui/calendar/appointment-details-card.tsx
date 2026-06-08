"use client";

import type { AppointmentDetails } from "@/entities/schedule";
import { APPOINTMENT_STATUS_LABELS } from "@/entities/schedule";
import { formatLocalDateTimeDisplay } from "@/shared/lib/date";
import { formatPrice } from "@/shared/lib/format";
import { Button } from "@/shared/ui/button";

type AppointmentDetailsCardProps = {
    appointment: AppointmentDetails;
    onClose: () => void;
};

export function AppointmentDetailsCard({
    appointment,
    onClose,
}: AppointmentDetailsCardProps) {
    return (
        <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
            <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium">Запис #{appointment.id}</h3>
                <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                    Закрити
                </Button>
            </div>
            <dl className="grid gap-2 sm:grid-cols-2">
                <div>
                    <dt className="text-muted-foreground">Послуга</dt>
                    <dd>{appointment.serviceName}</dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Клієнт</dt>
                    <dd>
                        {appointment.clientName} ({appointment.clientPhone})
                    </dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Час</dt>
                    <dd>
                        {formatLocalDateTimeDisplay(appointment.startLocal)} —{" "}
                        {formatLocalDateTimeDisplay(appointment.endLocal)}
                    </dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Статус</dt>
                    <dd>
                        {
                            APPOINTMENT_STATUS_LABELS[
                                appointment.displayStatus
                            ]
                        }
                    </dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Ціна</dt>
                    <dd>{formatPrice(appointment.priceAtBooking)}</dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Передоплата</dt>
                    <dd>{formatPrice(appointment.prepaymentAmount)}</dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Переносів</dt>
                    <dd>{appointment.rescheduleCount}</dd>
                </div>
                {appointment.notes && (
                    <div className="sm:col-span-2">
                        <dt className="text-muted-foreground">Нотатки</dt>
                        <dd>{appointment.notes}</dd>
                    </div>
                )}
            </dl>
        </div>
    );
}

"use client";

import { ServiceCard, type Service } from "@/entities/service";
import { Button } from "@/shared/ui/button";

type ServicesListProps = {
    services: Service[];
    isSubmitting: boolean;
    onEdit: (service: Service) => void;
    onDelete: (service: Service) => void;
};

export function ServicesList({
    services,
    isSubmitting,
    onEdit,
    onDelete,
}: ServicesListProps) {
    if (services.length === 0) {
        return (
            <div className="rounded-lg border border-dashed bg-muted/20 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                    Послуг ще немає. Створіть першу послугу.
                </p>
            </div>
        );
    }

    return (
        <ul className="grid gap-4">
            {services.map((service) => (
                <li key={service.id}>
                    <ServiceCard
                        service={service}
                        actions={
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isSubmitting}
                                    onClick={() => onEdit(service)}
                                >
                                    Редагувати
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={isSubmitting}
                                    onClick={() => onDelete(service)}
                                >
                                    Видалити
                                </Button>
                            </>
                        }
                    />
                </li>
            ))}
        </ul>
    );
}

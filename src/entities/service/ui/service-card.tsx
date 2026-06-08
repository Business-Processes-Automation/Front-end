import type { Service } from "../model/types";
import { formatDuration, formatPrice } from "@/shared/lib/format";

type ServiceCardProps = {
    service: Service;
    actions?: React.ReactNode;
};

export function ServiceCard({ service, actions }: ServiceCardProps) {
    return (
        <article className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">
                        {service.serviceName}
                    </h3>
                    <dl className="grid gap-1 text-sm text-muted-foreground">
                        <div className="flex gap-2">
                            <dt className="font-medium text-foreground/80">
                                Ціна:
                            </dt>
                            <dd>{formatPrice(service.price)}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="font-medium text-foreground/80">
                                Тривалість:
                            </dt>
                            <dd>
                                {formatDuration(service.durationInMinutes)}
                            </dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="font-medium text-foreground/80">
                                Передоплата:
                            </dt>
                            <dd>{formatPrice(service.prepayment)}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="font-medium text-foreground/80">
                                Підготовка:
                            </dt>
                            <dd>
                                {formatDuration(
                                    service.preparationBeforeInMinutes,
                                )}{" "}
                                /{" "}
                                {formatDuration(
                                    service.preparationAfterInMinutes,
                                )}
                            </dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="font-medium text-foreground/80">
                                Зайнятий час:
                            </dt>
                            <dd>
                                {formatDuration(service.totalOccupiedMinutes)}
                            </dd>
                        </div>
                    </dl>
                </div>
                {actions ? (
                    <div className="flex shrink-0 gap-2">{actions}</div>
                ) : null}
            </div>
        </article>
    );
}

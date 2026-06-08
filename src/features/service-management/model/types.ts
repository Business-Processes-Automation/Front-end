import type { Service, ServiceInput } from "@/entities/service";

/** Значения формы создания/редактирования услуги. */
export type ServiceFormValues = ServiceInput;

export const EMPTY_SERVICE_FORM_VALUES: ServiceFormValues = {
    serviceName: "",
    durationInMinutes: 60,
    price: 0,
    prepayment: 0,
    preparationBeforeInMinutes: 0,
    preparationAfterInMinutes: 0,
};

export function serviceToFormValues(service: Service): ServiceFormValues {
    return {
        serviceName: service.serviceName,
        durationInMinutes: service.durationInMinutes,
        price: service.price,
        prepayment: service.prepayment,
        preparationBeforeInMinutes: service.preparationBeforeInMinutes,
        preparationAfterInMinutes: service.preparationAfterInMinutes,
    };
}

export function formValuesToServiceInput(values: ServiceFormValues): ServiceInput {
    return {
        serviceName: values.serviceName.trim(),
        durationInMinutes: Number(values.durationInMinutes),
        price: Number(values.price),
        prepayment: Number(values.prepayment ?? 0),
        preparationBeforeInMinutes: Number(
            values.preparationBeforeInMinutes ?? 0,
        ),
        preparationAfterInMinutes: Number(
            values.preparationAfterInMinutes ?? 0,
        ),
    };
}

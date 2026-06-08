import * as Yup from "yup";

const MAX_PRICE = 999_999.99;
const MAX_PREP_MINUTES = 480;

export const serviceFormValidationSchema = Yup.object({
    serviceName: Yup.string()
        .trim()
        .required("Назва послуги обов'язкова")
        .min(2, "Назва має містити від 2 до 200 символів")
        .max(200, "Назва має містити від 2 до 200 символів"),
    durationInMinutes: Yup.number()
        .typeError("Вкажіть тривалість у хвилинах")
        .required("Тривалість обов'язкова")
        .integer("Тривалість має бути цілим числом")
        .min(1, "Мінімум 1 хвилина")
        .max(1440, "Максимум 1440 хвилин (24 години)"),
    price: Yup.number()
        .typeError("Вкажіть ціну")
        .required("Ціна обов'язкова")
        .min(0, "Мінімальна ціна — 0")
        .max(MAX_PRICE, `Максимальна ціна — ${MAX_PRICE}`),
    prepayment: Yup.number()
        .typeError("Вкажіть передоплату")
        .min(0, "Мінімальна передоплата — 0")
        .max(MAX_PRICE, `Максимальна передоплата — ${MAX_PRICE}`)
        .test(
            "prepayment-lte-price",
            "Передоплата не може перевищувати ціну",
            function validatePrepayment(value) {
                const { price } = this.parent as { price?: number };
                if (value == null || price == null) {
                    return true;
                }
                return value <= price;
            },
        )
        .default(0),
    preparationBeforeInMinutes: Yup.number()
        .typeError("Вкажіть час підготовки")
        .integer("Має бути цілим числом")
        .min(0, "Мінімум 0 хвилин")
        .max(MAX_PREP_MINUTES, `Максимум ${MAX_PREP_MINUTES} хвилин`)
        .default(0),
    preparationAfterInMinutes: Yup.number()
        .typeError("Вкажіть час після послуги")
        .integer("Має бути цілим числом")
        .min(0, "Мінімум 0 хвилин")
        .max(MAX_PREP_MINUTES, `Максимум ${MAX_PREP_MINUTES} хвилин`)
        .default(0),
});

export function calculateExpectedOccupiedMinutes(values: {
    preparationBeforeInMinutes: number;
    durationInMinutes: number;
    preparationAfterInMinutes: number;
}): number {
    return (
        values.preparationBeforeInMinutes +
        values.durationInMinutes +
        values.preparationAfterInMinutes
    );
}

import * as Yup from "yup";

export const scheduleSettingsValidationSchema = Yup.object({
    bufferBetweenClientsMinutes: Yup.number()
        .typeError("Вкажіть перерву між клієнтами")
        .required("Перерва обов'язкова")
        .integer("Має бути цілим числом")
        .min(0, "Перерва має бути від 0 до 480 хвилин")
        .max(480, "Перерва має бути від 0 до 480 хвилин"),
    freeSlotIntervalMinutes: Yup.number()
        .typeError("Вкажіть крок слотів")
        .required("Крок слотів обов'язковий")
        .integer("Має бути цілим числом")
        .min(5, "Крок слотів: від 5 до 120 хв, кратно 5")
        .max(120, "Крок слотів: від 5 до 120 хв, кратно 5")
        .test(
            "multiple-of-5",
            "Крок слотів: від 5 до 120 хв, кратно 5",
            (value) => value == null || value % 5 === 0,
        ),
    minBookingNoticeMinutes: Yup.number()
        .typeError("Вкажіть мінімальний час до запису")
        .required("Мінімальний час обов'язковий")
        .integer("Має бути цілим числом")
        .min(0, "Мінімальний час до запису: від 0 до 10080 хвилин")
        .max(10080, "Мінімальний час до запису: від 0 до 10080 хвилин"),
    maxBookingDaysAhead: Yup.number()
        .typeError("Вкажіть горизонт запису")
        .required("Горизонт запису обов'язковий")
        .integer("Має бути цілим числом")
        .min(1, "Горизонт запису: від 1 до 365 днів")
        .max(365, "Горизонт запису: від 1 до 365 днів"),
    maxRescheduleCount: Yup.number()
        .typeError("Вкажіть кількість переносів")
        .required("Кількість переносів обов'язкова")
        .integer("Має бути цілим числом")
        .min(0, "Кількість переносів: від 0 до 10")
        .max(10, "Кількість переносів: від 0 до 10"),
    cancellationPolicyHours: Yup.number()
        .typeError("Вкажіть політику скасування")
        .required("Політика скасування обов'язкова")
        .integer("Має бути цілим числом")
        .min(0, "Політика скасування: від 0 до 168 годин")
        .max(168, "Політика скасування: від 0 до 168 годин"),
});

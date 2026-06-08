import * as Yup from "yup";

const phoneRegex = /^\+?[0-9]{10,15}$/;

export const createAppointmentValidationSchema = Yup.object({
    serviceId: Yup.string()
        .required("Оберіть послугу")
        .test("positive-service", "Оберіть послугу", (value) =>
            Boolean(value && Number(value) > 0),
        ),
    startLocal: Yup.string().required("Вкажіть час початку"),
    clientName: Yup.string()
        .trim()
        .required("Ім'я клієнта обов'язкове")
        .max(200, "Максимум 200 символів"),
    clientPhone: Yup.string()
        .trim()
        .required("Телефон клієнта обов'язковий")
        .max(20, "Максимум 20 символів")
        .matches(phoneRegex, "Введіть коректний номер телефону"),
});

export const updateAppointmentValidationSchema = Yup.object({
    status: Yup.string(),
    notes: Yup.string().max(2000, "Максимум 2000 символів"),
    serviceId: Yup.string()
        .required("Оберіть послугу")
        .test("positive-service", "Оберіть послугу", (value) =>
            Boolean(value && Number(value) > 0),
        ),
});

export const rescheduleAppointmentValidationSchema = Yup.object({
    startLocal: Yup.string().required("Вкажіть новий час початку"),
});

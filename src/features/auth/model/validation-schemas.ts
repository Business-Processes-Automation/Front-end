import * as Yup from "yup";

const usernameRegex = /^[a-zA-Z0-9_]+$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Введіть коректний email")
        .required("Email обов'язковий"),
    password: Yup.string()
        .required("Password обов'язковий")
        .min(8, "Password має містити щонайменше 8 символів"),
});

export const registerValidationSchema = Yup.object({
    firstName: Yup.string()
        .trim()
        .required("First Name обов'язковий")
        .min(2, "First Name має містити щонайменше 2 символи"),
    lastName: Yup.string()
        .trim()
        .required("Last Name обов'язковий")
        .min(2, "Last Name має містити щонайменше 2 символи"),
    username: Yup.string()
        .trim()
        .required("Username обов'язковий")
        .min(3, "Username має містити щонайменше 3 символи")
        .max(32, "Username занадто довгий")
        .matches(
            usernameRegex,
            "Username: лише літери, цифри та підкреслення",
        ),
    email: Yup.string()
        .trim()
        .email("Введіть коректний email")
        .required("Email обов'язковий"),
    phoneNumber: Yup.string()
        .trim()
        .required("Phone Number обов'язковий")
        .matches(phoneRegex, "Введіть коректний номер телефону"),
    timeZone: Yup.string().required("Time Zone обов'язковий"),
    password: Yup.string()
        .required("Password обов'язковий")
        .min(8, "Password має містити щонайменше 8 символів"),
    confirmPassword: Yup.string()
        .required("Confirm Password обов'язковий")
        .oneOf([Yup.ref("password")], "Паролі не збігаються"),
});

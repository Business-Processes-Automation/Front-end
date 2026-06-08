export const API_ROUTES = {
    auth: {
        login: "/api/auth/login",
        register: "/api/auth/register",
        logout: "/api/auth/logout",
        me: "/api/auth/me",
        telegram: "/api/auth/me/telegram",
        telegramLinkCode: "/api/auth/me/telegram/link-code",
    },
    services: {
        base: "/api/masters/me/services",
        byId: (id: number) => `/api/masters/me/services/${id}`,
    },
    appointments: {
        base: "/api/masters/me/appointments",
        byId: (id: number) => `/api/masters/me/appointments/${id}`,
        cancel: (id: number) => `/api/masters/me/appointments/${id}/cancel`,
        reschedule: (id: number) =>
            `/api/masters/me/appointments/${id}/reschedule`,
    },
    schedule: {
        settings: "/api/masters/me/schedule/settings",
        workingHours: "/api/masters/me/schedule/working-hours",
        workingHoursDay: (day: string) =>
            `/api/masters/me/schedule/working-hours/${day}`,
        timeOffs: "/api/masters/me/schedule/time-offs",
        timeOffById: (id: number) =>
            `/api/masters/me/schedule/time-offs/${id}`,
        calendar: "/api/masters/me/schedule/calendar",
        appointmentById: (id: number) =>
            `/api/masters/me/schedule/appointments/${id}`,
    },
} as const;

export const APP_ROUTES = {
    home: "/",
    login: "/login",
    register: "/register",
    calendar: "/calendar",
    services: "/services",
    expenses: "/expenses",
    analytics: "/analytics",
    settings: "/settings",
} as const;

export const AUTH_ROUTES = [APP_ROUTES.login, APP_ROUTES.register] as const;

export const PROTECTED_ROUTES = [
    APP_ROUTES.calendar,
    APP_ROUTES.services,
    APP_ROUTES.expenses,
    APP_ROUTES.analytics,
    APP_ROUTES.settings,
] as const;

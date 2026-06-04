export const API_ROUTES = {
    auth: {
        login: "/api/auth/login",
        register: "/api/auth/register",
        logout: "/api/auth/logout",
        me: "/api/auth/me",
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

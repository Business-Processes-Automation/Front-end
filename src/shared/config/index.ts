export const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5021";

export { DEFAULT_TIME_ZONE, TIME_ZONE_OPTIONS } from "./constants";
export {
    API_ROUTES,
    APP_ROUTES,
    AUTH_ROUTES,
    PROTECTED_ROUTES,
} from "./routes";

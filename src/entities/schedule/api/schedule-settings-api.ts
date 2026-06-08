import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/config";

import type { ScheduleSettingsInput } from "../model/settings-types";
import { mapScheduleSettings } from "./map-settings";
import type { ScheduleSettingsDto } from "./types";

export const scheduleSettingsApi = {
    getSettings() {
        return api
            .get<ScheduleSettingsDto>(API_ROUTES.schedule.settings)
            .then(({ data }) => mapScheduleSettings(data));
    },

    updateSettings(input: ScheduleSettingsInput) {
        return api
            .patch<ScheduleSettingsDto>(API_ROUTES.schedule.settings, input)
            .then(({ data }) => mapScheduleSettings(data));
    },
};

export type { ScheduleSettingsDto, UpdateScheduleSettingsDto } from "./types";

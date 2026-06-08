import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ScheduleSettings, ScheduleSettingsInput } from "@/entities/schedule";
import { SCHEDULE_SETTINGS_NOT_FOUND } from "@/entities/schedule";
import { scheduleSettingsApi } from "@/entities/schedule";
import { getApiErrorMessage, isAxiosError } from "@/shared/lib/api-error";

type ScheduleThunkConfig = {
    rejectValue: string;
};

export const fetchScheduleSettings = createAsyncThunk<
    ScheduleSettings,
    void,
    ScheduleThunkConfig
>("scheduleSettings/fetch", async (_, { rejectWithValue }) => {
    try {
        return await scheduleSettingsApi.getSettings();
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
            return rejectWithValue(SCHEDULE_SETTINGS_NOT_FOUND);
        }

        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const updateScheduleSettings = createAsyncThunk<
    ScheduleSettings,
    ScheduleSettingsInput,
    ScheduleThunkConfig
>("scheduleSettings/update", async (input, { rejectWithValue }) => {
    try {
        return await scheduleSettingsApi.updateSettings(input);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

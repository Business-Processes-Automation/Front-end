import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
    UpdateWorkingHoursDayInput,
    Weekday,
    WorkingHoursDay,
    WorkingHoursDayInput,
} from "@/entities/schedule";
import { workingHoursApi } from "@/entities/schedule";
import { getApiErrorMessage } from "@/shared/lib/api-error";

type WorkingHoursThunkConfig = {
    rejectValue: string;
};

export const fetchWorkingHours = createAsyncThunk<
    WorkingHoursDay[],
    void,
    WorkingHoursThunkConfig
>("workingHours/fetch", async (_, { rejectWithValue }) => {
    try {
        return await workingHoursApi.getWeek();
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const replaceWorkingHours = createAsyncThunk<
    WorkingHoursDay[],
    WorkingHoursDayInput[],
    WorkingHoursThunkConfig
>("workingHours/replaceWeek", async (days, { rejectWithValue }) => {
    try {
        return await workingHoursApi.replaceWeek(days);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const updateWorkingHoursDay = createAsyncThunk<
    WorkingHoursDay,
    { day: Weekday; input: UpdateWorkingHoursDayInput },
    WorkingHoursThunkConfig
>("workingHours/updateDay", async ({ day, input }, { rejectWithValue }) => {
    try {
        return await workingHoursApi.updateDay(day, input);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const deleteWorkingHoursDay = createAsyncThunk<
    WorkingHoursDay[],
    Weekday,
    WorkingHoursThunkConfig
>("workingHours/deleteDay", async (day, { rejectWithValue }) => {
    try {
        await workingHoursApi.deleteDay(day);
        return await workingHoursApi.getWeek();
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

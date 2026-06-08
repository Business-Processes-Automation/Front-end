import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
    CreateTimeOffInput,
    TimeOff,
    TimeOffDateRange,
} from "@/entities/schedule";
import { timeOffApi } from "@/entities/schedule";
import { getApiErrorMessage } from "@/shared/lib/api-error";

type TimeOffsThunkConfig = {
    rejectValue: string;
};

export const fetchTimeOffs = createAsyncThunk<
    { items: TimeOff[]; range: TimeOffDateRange },
    TimeOffDateRange,
    TimeOffsThunkConfig
>("timeOffs/fetch", async (range, { rejectWithValue }) => {
    try {
        const items = await timeOffApi.getList(range);
        return { items, range };
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const createTimeOff = createAsyncThunk<
    TimeOff,
    CreateTimeOffInput,
    TimeOffsThunkConfig
>("timeOffs/create", async (input, { rejectWithValue }) => {
    try {
        return await timeOffApi.create(input);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const deleteTimeOff = createAsyncThunk<
    number,
    number,
    TimeOffsThunkConfig
>("timeOffs/delete", async (id, { rejectWithValue }) => {
    try {
        await timeOffApi.delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

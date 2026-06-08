import { createAsyncThunk } from "@reduxjs/toolkit";

import type { Service, ServiceInput } from "@/entities/service";
import { serviceApi } from "@/entities/service";
import { getApiErrorMessage } from "@/shared/lib/api-error";

import type { UpdateServicePayload } from "./state-types";

type ServiceThunkConfig = {
    rejectValue: string;
};

export const fetchServices = createAsyncThunk<
    Service[],
    void,
    ServiceThunkConfig
>("services/fetchAll", async (_, { rejectWithValue }) => {
    try {
        return await serviceApi.getAll();
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const createService = createAsyncThunk<
    Service,
    ServiceInput,
    ServiceThunkConfig
>("services/create", async (input, { rejectWithValue }) => {
    try {
        return await serviceApi.create(input);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const updateService = createAsyncThunk<
    Service,
    UpdateServicePayload,
    ServiceThunkConfig
>("services/update", async ({ id, input }, { rejectWithValue }) => {
    try {
        return await serviceApi.update(id, input);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const deleteService = createAsyncThunk<
    number,
    number,
    ServiceThunkConfig
>("services/delete", async (id, { rejectWithValue }) => {
    try {
        await serviceApi.delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

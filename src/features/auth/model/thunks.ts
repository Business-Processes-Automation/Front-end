import { createAsyncThunk } from "@reduxjs/toolkit";

import type { User } from "@/entities/user";
import { getApiErrorMessage } from "@/shared/lib/api-error";

import { authApi } from "../api/auth-api";
import type { LoginRequest, RegisterRequest } from "../api/types";

type AuthThunkConfig = {
    rejectValue: string;
};

export const login = createAsyncThunk<
    User,
    LoginRequest,
    AuthThunkConfig
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        return await authApi.login(credentials);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const register = createAsyncThunk<
    User,
    RegisterRequest,
    AuthThunkConfig
>("auth/register", async (credentials, { rejectWithValue }) => {
    try {
        return await authApi.registerAndLogin(credentials);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const logout = createAsyncThunk<void, void, AuthThunkConfig>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await authApi.logout();
        } catch (error) {
            return rejectWithValue(getApiErrorMessage(error));
        }
    },
);

export const fetchCurrentUser = createAsyncThunk<User, void, AuthThunkConfig>(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            return await authApi.getCurrentUser();
        } catch (error) {
            return rejectWithValue(getApiErrorMessage(error));
        }
    },
);

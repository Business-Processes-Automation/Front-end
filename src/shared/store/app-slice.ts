import { createSlice } from "@reduxjs/toolkit";

type AppState = {
    sidebarCollapsed: boolean;
};

const initialState: AppState = {
    sidebarCollapsed: false,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
        },
    },
});

export const { toggleSidebar } = appSlice.actions;

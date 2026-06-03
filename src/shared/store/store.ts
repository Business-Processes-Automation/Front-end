import { configureStore } from "@reduxjs/toolkit";

import { appSlice } from "./app-slice";

export const makeStore = () =>
    configureStore({
        reducer: {
            app: appSlice.reducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

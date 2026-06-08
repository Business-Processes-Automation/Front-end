import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "@/features/auth/model";
import {
    scheduleCalendarSlice,
    scheduleSettingsSlice,
    timeOffsSlice,
    workingHoursSlice,
} from "@/features/schedule-management/model";
import { appointmentsSlice } from "@/features/appointment-management/model";
import { servicesSlice } from "@/features/service-management/model";

import { appSlice } from "./app-slice";

export const makeStore = () =>
    configureStore({
        reducer: {
            app: appSlice.reducer,
            auth: authSlice.reducer,
            services: servicesSlice.reducer,
            appointments: appointmentsSlice.reducer,
            scheduleSettings: scheduleSettingsSlice.reducer,
            workingHours: workingHoursSlice.reducer,
            timeOffs: timeOffsSlice.reducer,
            scheduleCalendar: scheduleCalendarSlice.reducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

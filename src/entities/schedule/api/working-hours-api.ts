import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/config";

import type {
    UpdateWorkingHoursDayInput,
    Weekday,
    WorkingHoursDayInput,
} from "../model/working-hours-types";
import { mapWorkingHoursDay, mapWorkingHoursWeek } from "./map-working-hours";
import {
    toUpdateWorkingHoursDayRequest,
    toWorkingHoursDayRequest,
} from "./working-hours-types";
import type { WorkingHoursDayDto } from "./working-hours-types";

export const workingHoursApi = {
    getWeek() {
        return api
            .get<WorkingHoursDayDto[]>(API_ROUTES.schedule.workingHours)
            .then(({ data }) => mapWorkingHoursWeek(data));
    },

    replaceWeek(days: WorkingHoursDayInput[]) {
        const payload = days.map(toWorkingHoursDayRequest);
        return api
            .put<WorkingHoursDayDto[]>(API_ROUTES.schedule.workingHours, payload)
            .then(({ data }) => mapWorkingHoursWeek(data));
    },

    updateDay(day: Weekday, input: UpdateWorkingHoursDayInput) {
        const payload = toUpdateWorkingHoursDayRequest(input);
        return api
            .put<WorkingHoursDayDto>(
                API_ROUTES.schedule.workingHoursDay(day),
                payload,
            )
            .then(({ data }) => mapWorkingHoursDay(data));
    },

    deleteDay(day: Weekday) {
        return api
            .delete(API_ROUTES.schedule.workingHoursDay(day))
            .then(() => undefined);
    },
};

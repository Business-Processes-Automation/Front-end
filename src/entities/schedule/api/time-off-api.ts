import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/config";

import type { CreateTimeOffInput, TimeOffDateRange } from "../model/time-off-types";
import { mapTimeOff, mapTimeOffList } from "./map-time-off";
import type { TimeOffDto } from "./map-time-off";

export const timeOffApi = {
    getList({ from, to }: TimeOffDateRange) {
        return api
            .get<TimeOffDto[]>(API_ROUTES.schedule.timeOffs, {
                params: { from, to },
            })
            .then(({ data }) => mapTimeOffList(data));
    },

    create(input: CreateTimeOffInput) {
        return api
            .post<TimeOffDto>(API_ROUTES.schedule.timeOffs, input)
            .then(({ data }) => mapTimeOff(data));
    },

    delete(id: number) {
        return api.delete(API_ROUTES.schedule.timeOffById(id));
    },
};

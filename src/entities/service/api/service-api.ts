import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/config";

import type { ServiceInput } from "../model/types";
import {
    mapServiceInputToCreateDto,
    mapServiceInputToUpdateDto,
    mapServiceResponse,
} from "./map-service";
import type { ServiceResponseDto } from "./types";

export const serviceApi = {
    getAll() {
        return api
            .get<ServiceResponseDto[]>(API_ROUTES.services.base)
            .then(({ data }) => data.map(mapServiceResponse));
    },

    getById(id: number) {
        return api
            .get<ServiceResponseDto>(API_ROUTES.services.byId(id))
            .then(({ data }) => mapServiceResponse(data));
    },

    create(input: ServiceInput) {
        return api
            .post<ServiceResponseDto>(
                API_ROUTES.services.base,
                mapServiceInputToCreateDto(input),
            )
            .then(({ data }) => mapServiceResponse(data));
    },

    update(id: number, input: ServiceInput) {
        return api
            .put<ServiceResponseDto>(
                API_ROUTES.services.byId(id),
                mapServiceInputToUpdateDto(input),
            )
            .then(({ data }) => mapServiceResponse(data));
    },

    delete(id: number) {
        return api.delete<void>(API_ROUTES.services.byId(id));
    },
};

import type { User } from "@/entities/user";
import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/config";

import type { AuthUserDto, LoginRequest, RegisterRequest } from "./types";

function toUser(dto: AuthUserDto): User {
    return {
        id: dto.id,
        username: dto.username,
        email: dto.email,
    };
}

export const authApi = {
    login(credentials: LoginRequest) {
        return api
            .post<AuthUserDto>(API_ROUTES.auth.login, credentials)
            .then(({ data }) => toUser(data));
    },

    register(credentials: RegisterRequest) {
        return api.post<AuthUserDto>(API_ROUTES.auth.register, credentials);
    },

    registerAndLogin(credentials: RegisterRequest) {
        return this.register(credentials).then(() =>
            this.login({
                email: credentials.email,
                password: credentials.password,
            }),
        );
    },

    logout() {
        return api.post<void>(API_ROUTES.auth.logout);
    },

    getCurrentUser() {
        return api
            .get<AuthUserDto>(API_ROUTES.auth.me)
            .then(({ data }) => toUser(data));
    },
};

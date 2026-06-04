export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    timeZone: string;
    password: string;
};

export type AuthUserDto = {
    id: number;
    username: string;
    email: string;
};

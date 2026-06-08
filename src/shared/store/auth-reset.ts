import { isAnyOf, type ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { login, logout, register } from "@/features/auth/model/thunks";

/** Скидає slice до initialState після login / register / logout. */
export function addAuthSessionResetMatcher<S>(
    builder: ActionReducerMapBuilder<S>,
    initialState: S,
) {
    builder.addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled, logout.fulfilled),
        () => initialState,
    );
}

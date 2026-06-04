"use client";

import { useState } from "react";
import { Provider } from "react-redux";

import { AuthInitializer } from "@/features/auth";
import { makeStore } from "@/shared/store";

type StoreProviderProps = {
    children: React.ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
    const [store] = useState(makeStore);

    return (
        <Provider store={store}>
            <AuthInitializer>{children}</AuthInitializer>
        </Provider>
    );
}

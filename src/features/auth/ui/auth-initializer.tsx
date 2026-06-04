"use client";

import { useEffect, useRef } from "react";

import { useAuth } from "../hooks/use-auth";

type AuthInitializerProps = {
    children: React.ReactNode;
};

/** Одноразова перевірка cookie-сесії при старті застосунку. */
export function AuthInitializer({ children }: AuthInitializerProps) {
    const { isSessionPending, restoreSession } = useAuth();
    const hasRequestedSession = useRef(false);

    useEffect(() => {
        if (isSessionPending && !hasRequestedSession.current) {
            hasRequestedSession.current = true;
            restoreSession();
        }
    }, [isSessionPending, restoreSession]);

    return <>{children}</>;
}

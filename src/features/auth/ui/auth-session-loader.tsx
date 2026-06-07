"use client";

import { useAuth } from "../hooks/use-auth";

type AuthSessionLoaderProps = {
    children: React.ReactNode;
};

export function AuthSessionLoader({ children }: AuthSessionLoaderProps) {
    const { isSessionPending } = useAuth();

    if (isSessionPending) {
        return (
            <div className="flex min-h-full flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">Завантаження…</p>
            </div>
        );
    }

    return <>{children}</>;
}

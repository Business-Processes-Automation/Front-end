"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { APP_ROUTES } from "@/shared/config";

import { useAuth } from "../hooks/use-auth";

type AuthGuardProps = {
    children: React.ReactNode;
};

/** Захист dashboard-маршрутів: редірект на login без сесії. */
export function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const { isAuthenticated, isSessionPending } = useAuth();

    useEffect(() => {
        if (!isSessionPending && !isAuthenticated) {
            router.replace(APP_ROUTES.login);
        }
    }, [isAuthenticated, isSessionPending, router]);

    if (isSessionPending || !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

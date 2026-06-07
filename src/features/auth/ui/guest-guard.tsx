"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { APP_ROUTES } from "@/shared/config";

import { useAuth } from "../hooks/use-auth";

type GuestGuardProps = {
    children: React.ReactNode;
};

/** Сторінки login/register: редірект у застосунок, якщо вже авторизовані. */
export function GuestGuard({ children }: GuestGuardProps) {
    const router = useRouter();
    const { isAuthenticated, isSessionPending } = useAuth();

    useEffect(() => {
        if (!isSessionPending && isAuthenticated) {
            router.replace(APP_ROUTES.calendar);
        }
    }, [isAuthenticated, isSessionPending, router]);

    if (isSessionPending || isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

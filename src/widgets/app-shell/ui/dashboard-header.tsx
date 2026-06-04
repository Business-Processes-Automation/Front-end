"use client";

import Link from "next/link";

import { useAuth } from "@/features/auth";
import { APP_ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";

export function DashboardHeader() {
    const { user, isAuthenticated, isSubmitting, signOut } = useAuth();

    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-card px-6">
            <p className="text-sm text-muted-foreground">Панель керування</p>

            <div className="flex items-center gap-3">
                {isAuthenticated && user ? (
                    <>
                        <span className="text-sm font-medium">
                            {user.username}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => void signOut()}
                            disabled={isSubmitting}
                        >
                            Вийти
                        </Button>
                    </>
                ) : (
                    <Button variant="outline" size="sm" asChild>
                        <Link href={APP_ROUTES.login}>Увійти</Link>
                    </Button>
                )}
            </div>
        </header>
    );
}

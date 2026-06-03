"use client";

import { DashboardNav } from "./dashboard-nav";
import { cn } from "@/shared/lib/utils";
import { useAppSelector } from "@/shared/store";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const collapsed = useAppSelector((state) => state.app.sidebarCollapsed);

    return (
        <div className="flex min-h-full flex-1">
            <aside
                className={cn(
                    "flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
                    collapsed ? "w-16" : "w-64",
                )}
            >
                <DashboardNav />
            </aside>
            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex h-14 items-center border-b bg-card px-6">
                    <p className="text-sm text-muted-foreground">
                        Панель керування
                    </p>
                </header>
                <main className="flex-1 bg-background p-6">{children}</main>
            </div>
        </div>
    );
}

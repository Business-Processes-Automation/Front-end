"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Calendar,
    LayoutDashboard,
    Receipt,
    Scissors,
    Settings,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { useAppDispatch, useAppSelector, toggleSidebar } from "@/shared/store";

const navItems = [
    { href: "/calendar", label: "Календар", icon: Calendar },
    { href: "/services", label: "Послуги", icon: Scissors },
    { href: "/expenses", label: "Витрати", icon: Receipt },
    { href: "/analytics", label: "Аналітика", icon: BarChart3 },
    { href: "/settings", label: "Налаштування", icon: Settings },
] as const;

export function DashboardNav() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const collapsed = useAppSelector((state) => state.app.sidebarCollapsed);

    return (
        <nav className="flex flex-1 flex-col gap-1 p-3">
            <div
                className={cn(
                    "mb-4 flex items-center gap-2 px-2",
                    collapsed && "justify-center px-0",
                )}
            >
                <LayoutDashboard className="size-5 shrink-0 text-sidebar-primary" />
                {!collapsed && (
                    <span className="text-sm font-semibold tracking-tight">
                        CRM
                    </span>
                )}
            </div>

            {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;

                return (
                    <Button
                        key={href}
                        variant={active ? "secondary" : "ghost"}
                        size={collapsed ? "icon" : "default"}
                        className={cn(
                            "w-full justify-start",
                            collapsed && "justify-center",
                            active && "bg-sidebar-accent text-sidebar-accent-foreground",
                        )}
                        asChild
                    >
                        <Link href={href} title={collapsed ? label : undefined}>
                            <Icon />
                            {!collapsed && <span>{label}</span>}
                        </Link>
                    </Button>
                );
            })}

            <div className="mt-auto pt-2">
                <Button
                    variant="outline"
                    size={collapsed ? "icon" : "sm"}
                    className={cn("w-full", collapsed && "justify-center")}
                    onClick={() => dispatch(toggleSidebar())}
                >
                    {collapsed ? "→" : "← Згорнути"}
                </Button>
            </div>
        </nav>
    );
}

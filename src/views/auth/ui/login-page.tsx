import Link from "next/link";

import { Button } from "@/shared/ui/button";

export function LoginPage() {
    return (
        <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
            <div className="space-y-1 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Вхід
                </h1>
                <p className="text-sm text-muted-foreground">
                    Заглушка сторінки авторизації
                </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <p className="mb-4 text-sm text-muted-foreground">
                    Форма входу з&apos;явиться пізніше.
                </p>
                <Button className="w-full" asChild>
                    <Link href="/calendar">Увійти (демо)</Link>
                </Button>
            </div>
        </div>
    );
}

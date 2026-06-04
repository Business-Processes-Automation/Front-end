import Link from "next/link";

type AuthPageShellProps = {
    title: string;
    description: string;
    children: React.ReactNode;
    footer: React.ReactNode;
    wide?: boolean;
};

export function AuthPageShell({
    title,
    description,
    children,
    footer,
    wide = false,
}: AuthPageShellProps) {
    return (
        <div
            className={`mx-auto flex w-full flex-col gap-6 ${wide ? "max-w-lg" : "max-w-sm"}`}
        >
            <div className="space-y-1 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {title}
                </h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
                {children}
            </div>
            <p className="text-center text-sm text-muted-foreground">{footer}</p>
        </div>
    );
}

export function AuthLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="font-medium text-primary underline-offset-4 hover:underline"
        >
            {children}
        </Link>
    );
}

import { AuthGuard, AuthSessionLoader } from "@/features/auth";
import { DashboardLayout } from "@/widgets/app-shell";

export default function DashboardRouteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthSessionLoader>
            <AuthGuard>
                <DashboardLayout>{children}</DashboardLayout>
            </AuthGuard>
        </AuthSessionLoader>
    );
}

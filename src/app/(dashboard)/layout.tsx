import { DashboardLayout } from "@/widgets/app-shell";

export default function DashboardRouteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DashboardLayout>{children}</DashboardLayout>;
}

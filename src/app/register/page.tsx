import {
    AuthSessionLoader,
    GuestGuard,
} from "@/features/auth";
import { RegisterPage } from "@/views/auth";

export default function RegisterRoutePage() {
    return (
        <AuthSessionLoader>
            <GuestGuard>
                <div className="flex min-h-full flex-1 items-center justify-center bg-muted/40 p-6">
                    <RegisterPage />
                </div>
            </GuestGuard>
        </AuthSessionLoader>
    );
}

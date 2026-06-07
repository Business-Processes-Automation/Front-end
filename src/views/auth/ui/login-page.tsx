import { LoginForm } from "@/features/auth";
import { APP_ROUTES } from "@/shared/config";

import { AuthLink, AuthPageShell } from "./auth-page-shell";

export function LoginPage() {
    return (
        <AuthPageShell
            title="Sign in"
            description="Enter your email and password to access CRM"
            footer={
                <>
                    New here?{" "}
                    <AuthLink href={APP_ROUTES.register}>
                        Create an account
                    </AuthLink>
                </>
            }
        >
            <LoginForm />
        </AuthPageShell>
    );
}

import { RegisterForm } from "@/features/auth";
import { APP_ROUTES } from "@/shared/config";

import { AuthLink, AuthPageShell } from "./auth-page-shell";

export function RegisterPage() {
    return (
        <AuthPageShell
            wide
            title="Create account"
            description="Register as a service provider"
            footer={
                <>
                    Already registered?{" "}
                    <AuthLink href={APP_ROUTES.login}>Sign in</AuthLink>
                </>
            }
        >
            <RegisterForm />
        </AuthPageShell>
    );
}

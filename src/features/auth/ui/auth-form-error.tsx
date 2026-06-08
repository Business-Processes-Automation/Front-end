import { ErrorAlert } from "@/shared/ui/async-state";

type AuthFormErrorProps = {
    message: string | null;
};

export function AuthFormError({ message }: AuthFormErrorProps) {
    return <ErrorAlert message={message} />;
}

type AuthFormErrorProps = {
    message: string | null;
};

export function AuthFormError({ message }: AuthFormErrorProps) {
    if (!message) {
        return null;
    }

    return (
        <p className="text-sm text-destructive" role="alert">
            {message}
        </p>
    );
}

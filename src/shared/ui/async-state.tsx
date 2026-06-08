import { Button } from "./button";

type AsyncLoadingMessageProps = {
    message: string;
};

export function AsyncLoadingMessage({ message }: AsyncLoadingMessageProps) {
    return <p className="text-sm text-muted-foreground">{message}</p>;
}

type ErrorAlertProps = {
    message: string | null;
};

export function ErrorAlert({ message }: ErrorAlertProps) {
    if (!message) {
        return null;
    }

    return (
        <p className="text-sm text-destructive" role="alert">
            {message}
        </p>
    );
}

type AsyncErrorRetryProps = {
    message: string;
    onRetry: () => void;
    retryLabel?: string;
};

export function AsyncErrorRetry({
    message,
    onRetry,
    retryLabel = "Спробувати знову",
}: AsyncErrorRetryProps) {
    return (
        <div className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm text-destructive">{message}</p>
            <Button type="button" variant="outline" size="sm" onClick={onRetry}>
                {retryLabel}
            </Button>
        </div>
    );
}

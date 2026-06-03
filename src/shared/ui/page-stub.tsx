import { Button } from "@/shared/ui/button";

type PageStubProps = {
    title: string;
    description: string;
};

export function PageStub({ title, description }: PageStubProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    {title}
                </h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2 rounded-lg border bg-card p-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
            </div>
        </div>
    );
}

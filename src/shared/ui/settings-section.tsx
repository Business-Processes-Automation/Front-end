type SettingsSectionProps = {
    title: string;
    description?: string;
    children: React.ReactNode;
};

export function SettingsSection({
    title,
    description,
    children,
}: SettingsSectionProps) {
    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-base font-medium">{title}</h2>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {children}
        </section>
    );
}

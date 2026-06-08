"use client";

import { useState } from "react";

import type { Service, ServiceInput } from "@/entities/service";
import { Button } from "@/shared/ui/button";

import { useServices } from "../hooks/use-services";
import { ServiceForm } from "./service-form";
import { ServicesList } from "./services-list";

type FormMode = "hidden" | "create" | "edit";

export function ServicesManager() {
    const {
        services,
        error,
        isInitialized,
        isListLoading,
        isSubmitting,
        loadServices,
        addService,
        editService,
        removeService,
        clearError,
    } = useServices();

    const [formMode, setFormMode] = useState<FormMode>("hidden");
    const [editingService, setEditingService] = useState<Service | null>(null);

    const openCreateForm = () => {
        clearError();
        setEditingService(null);
        setFormMode("create");
    };

    const openEditForm = (service: Service) => {
        clearError();
        setEditingService(service);
        setFormMode("edit");
    };

    const closeForm = () => {
        clearError();
        setEditingService(null);
        setFormMode("hidden");
    };

    const handleSubmit = async (input: ServiceInput) => {
        if (formMode === "edit" && editingService) {
            const success = await editService(editingService.id, input);
            if (success) {
                closeForm();
            }
            return success;
        }

        const success = await addService(input);
        if (success) {
            closeForm();
        }
        return success;
    };

    const handleDelete = async (service: Service) => {
        const confirmed = window.confirm(
            `Видалити послугу «${service.serviceName}»?`,
        );

        if (!confirmed) {
            return;
        }

        if (editingService?.id === service.id) {
            closeForm();
        }

        await removeService(service.id);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Послуги
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Керуйте послугами, цінами та тривалістю
                    </p>
                </div>
                {formMode === "hidden" && (
                    <Button onClick={openCreateForm}>Додати послугу</Button>
                )}
            </div>

            {formMode !== "hidden" && (
                <section className="rounded-lg border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-medium">
                        {formMode === "edit"
                            ? "Редагування послуги"
                            : "Нова послуга"}
                    </h2>
                    <ServiceForm
                        service={editingService}
                        isSubmitting={isSubmitting}
                        error={error}
                        onSubmit={handleSubmit}
                        onCancel={closeForm}
                    />
                </section>
            )}

            {isListLoading && !isInitialized ? (
                <p className="text-sm text-muted-foreground">
                    Завантаження послуг…
                </p>
            ) : (
                <ServicesList
                    services={services}
                    isSubmitting={isSubmitting}
                    onEdit={openEditForm}
                    onDelete={handleDelete}
                />
            )}

            {error && formMode === "hidden" && (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

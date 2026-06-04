import type { EntityId, ISODate, ISODateTime } from "@/shared/types/common";

export type Expense = {
    id: EntityId;
    userId: EntityId;
    amount: number;
    category: string;
    date: ISODate;
    description: string | null;
    createdAt: ISODateTime;
    updatedAt: ISODateTime;
};

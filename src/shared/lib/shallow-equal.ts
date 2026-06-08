/** Поверхневе порівняння plain-об'єктів (для query dedup). */
export function shallowEqual<T extends object>(
    a: T | null | undefined,
    b: T | null | undefined,
): boolean {
    if (a === b) {
        return true;
    }

    if (!a || !b) {
        return false;
    }

    const recordA = a as Record<string, unknown>;
    const recordB = b as Record<string, unknown>;
    const keysA = Object.keys(recordA);
    const keysB = Object.keys(recordB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    return keysA.every((key) => recordA[key] === recordB[key]);
}

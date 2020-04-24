export function updateObject(oldState: any, updatedProperties: any) {
    return { ...oldState, ...updatedProperties };
}

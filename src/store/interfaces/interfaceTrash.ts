import { TrashTypes } from '../types/typesTrash';

export interface TrashModel {
    readonly id: number;
    readonly image: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly trash_type: null;
}

export interface TrashState {
    readonly trash: TrashState[];
    readonly loading: boolean;
    readonly errors: object;
}

export interface TrashGetAction {
    type: TrashTypes.TRASH_GET;
    payload: TrashModel;
}

import { TrashTypes } from '../types/typesTrash';

export interface TrashModel {
    readonly id: number;
    readonly image: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly trash_type: null;
    readonly country: string;
    readonly city: string;
    readonly state: string;
    readonly road: string;
    readonly postcode: string;
    readonly state_code: string;
    readonly country_code: string;
}

export interface TrashState {
    readonly trash: TrashModel[];
    readonly loading: boolean;
    readonly errors: object;
}

export interface TrashGetAction {
    type: TrashTypes.TRASH_GET;
    payload: TrashModel;
}

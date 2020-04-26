import { EventTypes } from '../types/typesEvent';

export interface EventsAllModel {
    readonly date: string;
    readonly id: number;
    readonly latitude: number;
    readonly leader: {
        readonly email: string;
        readonly id: number;
        readonly name: string;
        readonly points: number;
    };
    readonly longitude: number;
    readonly members: {
        readonly email: string;
        readonly id: number;
        readonly name: string;
        readonly points: number;
    };
}

export interface EventsAllState {
    readonly events: EventsAllModel[];
    readonly loading: boolean;
    readonly errors: object;
}

export interface EventsGetAction {
    type: EventTypes.EVENTS_ALL;
    payload: EventsAllModel;
}

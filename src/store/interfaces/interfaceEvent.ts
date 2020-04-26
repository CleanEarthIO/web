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
    };
    readonly country: string;
    readonly city: string;
    readonly state: string;
    readonly road: string;
    readonly postcode: string;
    readonly state_code: string;
    readonly country_code: string;
}

export interface EventsAllState {
    readonly events: EventsAllModel[];
    readonly userEvents: EventsAllModel[];
    readonly loading: boolean;
    readonly errors: object;
}

export interface EventStartAction {
    type: EventTypes.EVENT_START;
    payload?: null;
}

export interface EventsGetAction {
    type: EventTypes.EVENTS_ALL;
    payload: EventsAllModel;
}

export interface EventFetchUserEvents {
    type: EventTypes.EVENT_FETCH_USER_EVENTS;
    payload: EventsAllModel;
}

export interface EventFailAction {
    type: EventTypes.EVENT_FAIL;
    payload: string;
}

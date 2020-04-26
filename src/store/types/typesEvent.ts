import {
    EventsGetAction,
    EventFailAction,
    EventStartAction,
    EventFetchUserEvents,
} from '../interfaces/interfaceEvent';

export enum EventTypes {
    EVENT_START = 'EVENT_START',
    EVENTS_ALL = 'EVENTS_ALL',
    EVENT_CREATE = 'EVENT_CREATE',
    EVENT_FAIL = 'EVENT_FAIL',
    EVENT_FETCH_USER_EVENTS = 'EVENT_FETCH_USER_EVENTS',
}

export type EventActions =
    | EventsGetAction
    | EventFailAction
    | EventStartAction
    | EventFetchUserEvents;

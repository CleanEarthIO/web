import {
    EventsGetAction,
    EventFailAction,
    EventStartAction,
} from '../interfaces/interfaceEvent';

export enum EventTypes {
    EVENT_START = 'EVENT_START',
    EVENTS_ALL = 'EVENTS_ALL',
    EVENT_CREATE = 'EVENT_CREATE',
    EVENT_FAIL = 'EVENT_FAIL',
}

export type EventActions = EventsGetAction | EventFailAction | EventStartAction;

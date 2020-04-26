import {
    EventsGetAction,
    EventFailAction,
    EventStartAction,
} from '../interfaces/interfaceEvent';

export enum EventTypes {
    EVENT_START,
    EVENTS_ALL,
    EVENT_CREATE,
    EVENT_FAIL,
}

export type EventActions = EventsGetAction | EventFailAction | EventStartAction;

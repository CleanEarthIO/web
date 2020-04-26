import { EventsGetAction } from '../interfaces/interfaceEvent';

export enum EventTypes {
    EVENTS_ALL,
    EVENT_CREATE,
}

export type EventActions = EventsGetAction;

import { EventTypes } from '../types/typesEvent';
import { EventsGetAction, EventsAllModel } from '../interfaces/interfaceEvent';

export function eventsAll(data: EventsAllModel): EventsGetAction {
    return { type: EventTypes.EVENTS_ALL, payload: data };
}

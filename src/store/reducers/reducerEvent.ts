import { EventActions, EventTypes } from '../types/typesEvent';
import { EventsAllState } from '../interfaces/interfaceEvent';
import { updateObject } from '../../utils/updateObject';

export const INIT_STATE: EventsAllState = {
    events: [],
    loading: false,
    errors: {},
};

const eventStart = (state: EventsAllState) =>
    updateObject(state, {
        loading: true,
    });

const eventsAll = (state: EventsAllState, action: EventActions) =>
    updateObject(state, {
        events: action.payload,
        loading: false,
    });

const eventFail = (state: EventsAllState, action: EventActions) =>
    updateObject(state, {
        errors: action.payload,
    });

export function eventReducer(state = INIT_STATE, action: EventActions): EventsAllState {
    switch (action.type) {
        case EventTypes.EVENT_START:
            return eventStart(state);
        case EventTypes.EVENTS_ALL:
            return eventsAll(state, action);
        case EventTypes.EVENT_FAIL:
            return eventFail(state, action);
        default:
            return state;
    }
}

import { EventActions, EventTypes } from '../types/typesEvent';
import { EventsAllState } from '../interfaces/interfaceEvent';
import { updateObject } from '../../utils/updateObject';

export const INIT_STATE: EventsAllState = {
    events: [],
    loading: false,
    errors: {},
};

const eventsAll = (state: EventsAllState, action: EventActions) =>
    updateObject(state, {
        user: action.payload,
        errors: {},
        loading: false,
    });

export function eventReducer(state = INIT_STATE, action: EventActions): EventsAllState {
    switch (action.type) {
        case EventTypes.EVENTS_ALL:
            return eventsAll(state, action);
        default:
            return state;
    }
}

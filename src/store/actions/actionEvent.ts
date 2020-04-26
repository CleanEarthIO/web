import { EventTypes } from '../types/typesEvent';
import {
    EventStartAction,
    EventsGetAction,
    EventFailAction,
    EventsAllModel,
    EventFetchUserEvents,
} from '../interfaces/interfaceEvent';
import cleanearth from '../../apis/cleanearth';

export function eventStart(): EventStartAction {
    return { type: EventTypes.EVENT_START };
}

export function eventsAll(data: EventsAllModel): EventsGetAction {
    return { type: EventTypes.EVENTS_ALL, payload: data };
}

export function eventFail(data: string): EventFailAction {
    return { type: EventTypes.EVENT_FAIL, payload: data };
}

export function eventFetchUserEvents(data: EventsAllModel): EventFetchUserEvents {
    return { type: EventTypes.EVENT_FETCH_USER_EVENTS, payload: data };
}

export const fetchUserEvents = () => (dispatch: any) => {
    dispatch(eventStart());

    cleanearth
        .get('/myEvents')
        .then((res) => {
            dispatch(eventFetchUserEvents(res.data));
        })
        .catch((err) => {
            dispatch(eventFail(err));
            console.log(err);
        });
};

export const fetchAllEvents = () => (dispatch: any) => {
    dispatch(eventStart());

    cleanearth
        .get('/events/')
        .then((res) => {
            dispatch(eventsAll(res.data));
        })
        .catch((err) => {
            dispatch(eventFail(err));
        });
};

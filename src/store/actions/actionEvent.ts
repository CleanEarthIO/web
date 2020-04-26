import { EventTypes } from '../types/typesEvent';
import {
    EventStartAction,
    EventsGetAction,
    EventFailAction,
    EventsAllModel,
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

export const fetchAllEvents = () => (dispatch: any) => {
    dispatch(eventStart());

    cleanearth
        .get('/events/')
        .then((res) => {
            console.log(res);
            // dispatch(eventsAll(res.data))
        })
        .catch((err) => {
            dispatch(eventFail(err));
        });
};

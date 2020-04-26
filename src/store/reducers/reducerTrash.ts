import { TrashActions, TrashTypes } from '../types/typesTrash';
import { TrashState } from '../interfaces/interfaceTrash';
import { updateObject } from '../../utils/updateObject';

export const INIT_STATE: TrashState = {
    trash: [],
    loading: false,
    errors: {},
};

const trashFetch = (state: TrashState, action: TrashActions) =>
    updateObject(state, { trash: action.payload, loading: false });

export function trashReducer(state = INIT_STATE, action: TrashActions): TrashState {
    switch (action.type) {
        case TrashTypes.TRASH_GET:
            return trashFetch(state, action);
        default:
            return state;
    }
}

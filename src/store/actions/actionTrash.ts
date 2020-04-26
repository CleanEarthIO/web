import { TrashTypes } from '../types/typesTrash';
import { TrashGetAction } from '../interfaces/interfaceTrash';
import cleanearth from '../../apis/cleanearth';

export function trashGet(data): TrashGetAction {
    return { type: TrashTypes.TRASH_GET, payload: data };
}

export const fetchTrash = () => (dispatch: any) => {
    cleanearth
        .get('/trashAll')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};


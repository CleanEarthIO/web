import { AuthActions, AuthTypes } from '../types/typesAuth';
import { AuthUserModel } from '../interfaces/interfaceAuth';
import { updateObject } from '../../utils/updateObject';

export const INIT_STATE: AuthUserModel = {
    user: {},
    loading: false,
    errors: {},
};

const authStart = (state: AuthUserModel) =>
    updateObject(state, { errors: {}, loading: true });

export function AuthReducer(state = INIT_STATE, action: AuthActions) {
    switch (action.type) {
        case AuthTypes.AUTH_START:
            return authStart(state);
        default:
            return state;
    }
}

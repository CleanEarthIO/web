import { AuthActions, AuthTypes } from '../types/typesAuth';
import { AuthUserState } from '../interfaces/interfaceAuth';
import { updateObject } from '../../utils/updateObject';

export const INIT_STATE: AuthUserState = {
    user: {},
    loading: false,
    errors: {},
    isAuthenticated: false,
};

const authSuccess = (state: AuthUserState, action: AuthActions) =>
    updateObject(state, {
        user: action.payload,
        errors: {},
        loading: false,
        isAuthenticated: true,
    });

const authLogout = (state: AuthUserState) =>
    updateObject(state, { user: {}, errors: {}, loading: false, isAuthenticated: false });

export function authReducer(state = INIT_STATE, action: AuthActions): AuthUserState {
    switch (action.type) {
        case AuthTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case AuthTypes.AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
}

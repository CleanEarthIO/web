import { AuthActions, AuthTypes } from '../types/typesAuth';
import { AuthUserModel } from '../interfaces/interfaceAuth';
import { updateObject } from '../../utils/updateObject';

export const INIT_STATE: AuthUserModel = {
    user: {},
    loading: false,
    errors: {},
    isAuthenticated: false,
};

const authSuccess = (state: AuthUserModel, action: AuthActions) =>
    updateObject(state, {
        user: action.payload,
        errors: {},
        loading: false,
        isAuthenticated: true,
    });

const authLogout = (state: AuthUserModel) =>
    updateObject(state, { user: {}, errors: {}, loading: false, isAuthenticated: false });

export function AuthReducer(state = INIT_STATE, action: AuthActions): AuthUserModel {
    switch (action.type) {
        case AuthTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case AuthTypes.AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
}

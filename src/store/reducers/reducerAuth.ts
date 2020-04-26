import { AuthActions, AuthTypes } from '../types/typesAuth';
import { AuthUserState } from '../interfaces/interfaceAuth';
import { updateObject } from '../../utils/updateObject';

export const INIT_STATE: AuthUserState = {
    user: {},
    loading: false,
    errors: {},
    isAuthenticated: false,
    user_token: '',
    user_cleanearth: {},
};

const authStart = (state: AuthUserState) => updateObject(state, { loading: true });

const authSuccess = (state: AuthUserState, action: AuthActions) =>
    updateObject(state, {
        user: action.payload,
        errors: {},
        loading: false,
        isAuthenticated: true,
    });

const authGetToken = (state: AuthUserState, action: AuthActions) =>
    updateObject(state, {
        user_token: action.payload,
    });

const authLogout = (state: AuthUserState) =>
    updateObject(state, { user: {}, errors: {}, loading: false, isAuthenticated: false });

const authGetCleanEarthProfile = (state: AuthUserState, action: AuthActions) =>
    updateObject(state, {
        user_cleanearth: action.payload,
        loading: false,
    });

const authFail = (state: AuthUserState, action: AuthActions) =>
    updateObject(state, { errors: action.payload, loading: false });

export function authReducer(state = INIT_STATE, action: AuthActions): AuthUserState {
    switch (action.type) {
        case AuthTypes.AUTH_START:
            return authStart(state);
        case AuthTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case AuthTypes.AUTH_GET_TOKEN:
            return authGetToken(state, action);
        case AuthTypes.AUTH_LOGOUT:
            return authLogout(state);
        case AuthTypes.AUTH_GET_CLEAN_EARTH_PROFILE:
            return authGetCleanEarthProfile(state, action);
        case AuthTypes.AUTH_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
}

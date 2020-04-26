import { AuthTypes } from '../types/typesAuth';
import {
    AuthStartAction,
    AuthSuccessAction,
    AuthLogoutAction,
    AuthGetTokenAction,
    Auth0User,
    CleanEarthUser,
    AuthGetCleanEarthProfile,
    AuthFailAction,
} from '../interfaces/interfaceAuth';
import cleanearth from '../../apis/cleanearth';

export function authStart(): AuthStartAction {
    return { type: AuthTypes.AUTH_START };
}

export function authSuccess(data: Auth0User): AuthSuccessAction {
    return { type: AuthTypes.AUTH_SUCCESS, payload: data };
}

export function authLogout(): AuthLogoutAction {
    return { type: AuthTypes.AUTH_LOGOUT };
}

export function authGetToken(data: string): AuthGetTokenAction {
    return { type: AuthTypes.AUTH_GET_TOKEN, payload: data };
}

export function authCleanEarthProfile(data: CleanEarthUser): AuthGetCleanEarthProfile {
    return { type: AuthTypes.AUTH_GET_CLEAN_EARTH_PROFILE, payload: data };
}

export function authFail(data: object): AuthFailAction {
    return { type: AuthTypes.AUTH_FAIL, payload: data };
}

export const authGetCleanEarthProfile = (userToken: string) => (dispatch: any) => {
    dispatch(authStart());

    console.log(userToken);
    const CONFIG = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
        },
    };

    console.log(CONFIG.headers);

    cleanearth
        .post('/login', null, CONFIG)
        .then((res) => {
            console.log(res);
            dispatch(authCleanEarthProfile(res.data));
        })
        .catch((err) => {
            dispatch(authFail(err));
        });
};

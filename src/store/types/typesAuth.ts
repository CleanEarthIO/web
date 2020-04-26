import {
    AuthStartAction,
    AuthSuccessAction,
    AuthLogoutAction,
    AuthGetTokenAction,
    AuthGetCleanEarthProfile,
    AuthFailAction,
} from '../interfaces/interfaceAuth';

export enum AuthTypes {
    AUTH_START = 'AUTH_START',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_LOGOUT = 'AUTH_LOGOUT',
    AUTH_GET_TOKEN = 'AUTH_GET_TOKEN',
    AUTH_GET_CLEAN_EARTH_PROFILE = 'AUTH_GET_CLEAN_EARTH_PROFILE',
    AUTH_FAIL = 'AUTH_FAIL',
}

export type AuthActions =
    | AuthStartAction
    | AuthSuccessAction
    | AuthLogoutAction
    | AuthGetTokenAction
    | AuthGetCleanEarthProfile
    | AuthFailAction;

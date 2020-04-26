import { AuthTypes } from '../types/typesAuth';

export interface AuthUserState {
    readonly user: object;
    readonly user_cleanearth: object;
    readonly loading: boolean;
    readonly errors: object;
    readonly isAuthenticated: boolean;
    readonly user_token: string;
}

export interface Auth0User {
    readonly given_name: string;
    readonly family_name: string;
    readonly nickname: string;
    readonly name: string;
    readonly picture: string;
    readonly local: string;
    readonly update_at: string;
    readonly email: string;
    readonly email_verified: boolean;
    readonly sub: string;
}

export interface CleanEarthUser {
    readonly name: string;
    readonly email: string;
    readonly id: number;
    readonly points: number;
}

export interface AuthStartAction {
    type: AuthTypes.AUTH_START;
    payload?: null;
}

export interface AuthSuccessAction {
    type: AuthTypes.AUTH_SUCCESS;
    payload: Auth0User;
}

export interface AuthLogoutAction {
    type: AuthTypes.AUTH_LOGOUT;
    payload?: null;
}

export interface AuthGetTokenAction {
    type: AuthTypes.AUTH_GET_TOKEN;
    payload: string;
}

export interface AuthGetCleanEarthProfile {
    type: AuthTypes.AUTH_GET_CLEAN_EARTH_PROFILE;
    payload: CleanEarthUser;
}

export interface AuthFailAction {
    type: AuthTypes.AUTH_FAIL;
    payload: object;
}

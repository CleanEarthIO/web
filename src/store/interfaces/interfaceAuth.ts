import { AuthTypes } from '../types/typesAuth';

export interface AuthUserState {
    readonly user: object;
    readonly loading: boolean;
    readonly errors: object;
    readonly isAuthenticated: boolean;
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

export interface AuthSuccessAction {
    type: AuthTypes.AUTH_SUCCESS;
    payload: Auth0User;
}

export interface AuthLogoutAction {
    type: AuthTypes.AUTH_LOGOUT;
    payload?: null;
}

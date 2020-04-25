import { AuthTypes } from '../types/typesAuth';
import {
    AuthSuccessAction,
    AuthLogoutAction,
    Auth0User,
} from '../interfaces/interfaceAuth';

export function authSuccess(data: Auth0User): AuthSuccessAction {
    return { type: AuthTypes.AUTH_SUCCESS, payload: data };
}

export function authLogout(): AuthLogoutAction {
    return { type: AuthTypes.AUTH_LOGOUT };
}

import { AuthSuccessAction, AuthLogoutAction } from '../interfaces/interfaceAuth';

export enum AuthTypes {
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_LOGOUT = 'AUTH_LOGOUT',
}

export type AuthActions = AuthSuccessAction | AuthLogoutAction;

import { AuthTypes } from '../types/typesAuth';
import { AuthSuccessAction, Auth0User } from '../interfaces/interfaceAuth';

export function authSuccess(data: Auth0User): AuthSuccessAction {
    return { type: AuthTypes.AUTH_SUCCESS, payload: data };
}


import { AuthTypes } from '../types/typesAuth';

export interface AuthStartAction {
    type: AuthTypes.AUTH_START;
}

export interface AuthUserModel {
    readonly user: object;
    readonly loading: boolean;
    readonly errors: object;
}

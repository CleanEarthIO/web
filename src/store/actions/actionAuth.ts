import { AuthTypes } from '../types/typesAuth';
import { AuthStartAction } from '../interfaces/interfaceAuth';

export function authStart(): AuthStartAction {
    return { type: AuthTypes.AUTH_START };
}

import { AuthActions, AuthTypes } from '../types/typesAuth';
import { AuthUserModel } from '../interfaces/interfaceAuth';
import { updateObject } from '../../utils/updateObject';

export const INIT_STATE: AuthUserModel = {
    user: {},
    loading: false,
    errors: {},
};

const authSuccess = (state: AuthUserModel, action: AuthActions) =>
    updateObject(state, { user: action.payload, errors: {}, loading: false });

export function AuthReducer(state = INIT_STATE, action: AuthActions): AuthUserModel {
    switch (action.type) {
        case AuthTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        default:
            return state;
    }
}

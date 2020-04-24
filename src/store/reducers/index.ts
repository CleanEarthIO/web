import { combineReducers } from 'redux';
import { AuthReducer } from './reducerAuth';
import { AuthUserModel } from '../interfaces/interfaceAuth';

export interface StoreState {
    AuthReducer: AuthUserModel;
}

export const reducers = combineReducers<StoreState>({
    AuthReducer,
});

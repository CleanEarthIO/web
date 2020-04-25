import { combineReducers } from 'redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthReducer } from './reducerAuth';
import { AuthUserModel } from '../interfaces/interfaceAuth';

export interface StoreState {
    authReducer: AuthUserModel;
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer'],
};

const rootReducer = combineReducers<StoreState>({
    authReducer: AuthReducer,
});

type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default persistReducer(persistConfig, rootReducer);

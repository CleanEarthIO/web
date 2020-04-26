import { combineReducers } from 'redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// AUTH
import { authReducer } from './reducerAuth';
import { AuthUserState } from '../interfaces/interfaceAuth';

// EVENTS
import { eventReducer } from './reducerEvent';
import { EventsAllState } from '../interfaces/interfaceEvent';

// TRASH
import { trashReducer } from './reducerTrash';
import { TrashState } from '../interfaces/interfaceTrash';

export interface StoreState {
    authReducer: AuthUserState;
    eventReducer: EventsAllState;
    trashReducer: TrashState;
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer'],
};

const rootReducer = combineReducers<StoreState>({
    authReducer,
    eventReducer,
    trashReducer,
});

type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export default persistReducer(persistConfig, rootReducer);

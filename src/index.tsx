import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import { App } from './components/App';
import { reducers } from './store/reducers';

import { Auth0Provider } from './apis/react-auth0-spa';
import history from './utils/history';

const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

const onRedirectCallback = (appState: any) => {
    history.push(
        appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
    );
};

ReactDOM.render(
    <Provider store={store}>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN!}
            client_id={process.env.REACT_APP_AUTH0_CLIENT_ID!}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            <App />
        </Auth0Provider>
    </Provider>,
    document.querySelector('#root')
);

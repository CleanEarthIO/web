import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import history from '../utils/history';
import { BaseRouter } from '../utils/BaseRouter';
import { theme } from '../utils/theme';
import { GlobalStyle } from '../utils/global-styles';
import { Navigation } from './navigation/Navigation';

import { useAuth0 } from '../apis/react-auth0-spa';

export function App(): JSX.Element {
    const { loading } = useAuth0();

    if (loading) {
        return <p>Loading</p>;
    }

    return (
        <Router history={history}>
            <ThemeProvider theme={theme}>
                {/* GlobalStyle must be above other components
                to have the styles applied */}
                <GlobalStyle />
                <Navigation />
                <div style={{ paddingTop: '60px' }}>
                    <BaseRouter />
                </div>
            </ThemeProvider>
        </Router>
    );
}

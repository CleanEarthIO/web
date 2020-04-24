import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import history from '../utils/history';
import { BaseRouter } from '../utils/BaseRouter';
import { theme } from '../utils/theme';
import { GlobalStyle } from '../utils/global-styles';

export function App(): JSX.Element {
    return (
        <Router history={history}>
            <ThemeProvider theme={theme}>
                {/* GlobalStyle must be above other components
                to have the styles applied */}
                <GlobalStyle />
                <BaseRouter />
            </ThemeProvider>
        </Router>
    );
}

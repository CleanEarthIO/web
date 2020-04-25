import React from 'react';
import styled from 'styled-components';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import history from '../utils/history';
import { BaseRouter } from '../utils/BaseRouter';
import { theme } from '../utils/theme';
import { useAuth0 } from '../apis/react-auth0-spa';
import { GlobalStyle } from '../utils/global-styles';
import { Navigation } from './navigation/Navigation';
import { NotSupported } from '../components/globalUI/GlobalUI';
import { device } from '../utils/theme';

const ContentContainer = styled.div`
    padding-top: 60px;
    @media ${device.mobileL} {
        padding-top: 111px;
    }
`;

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
                <NotSupported />
                <ContentContainer>
                    <BaseRouter />
                </ContentContainer>
            </ThemeProvider>
        </Router>
    );
}

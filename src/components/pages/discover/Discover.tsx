import React from 'react';
import styled from 'styled-components';

import { Listings } from '../../listings/Listings';

const DiscoverLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const ReplaceMe = styled.div`
    background-color: gray;
    height: 100vh;
`;

export function Discover(): JSX.Element {
    return (
        <DiscoverLayout>
            <ReplaceMe />
            <Listings />
        </DiscoverLayout>
    );
}

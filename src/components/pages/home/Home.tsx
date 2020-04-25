import React from 'react';
import styled from 'styled-components';
import { Map } from '../../map/Map';

const Container = styled.div`
    position: relative;
    height: 100%;
    flex: 1;
`;

export function Home(): JSX.Element {
    return (
        <Container>
            <Map />
        </Container>
    );
}

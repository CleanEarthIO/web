import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
    accessToken: `${process.env.REACT_APP_MAPBOX_KEY}`,
});

const Container = styled.div`
    position: relative;
    height: 100%;
    flex: 1;
`;

const mapStyle = {
    width: '100%',
    height: '100%',
};

export function Home(): JSX.Element {
    return (
        <Container>
            <Map
                style='mapbox://styles/mapbox/light-v10'
                containerStyle={mapStyle}
                center={[-122.414, 37.776]}
            ></Map>
        </Container>
    );
}

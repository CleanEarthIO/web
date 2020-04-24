import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
    accessToken: `${process.env.REACT_APP_MAPBOX_KEY}`,
});

const Sample = styled.h1`
    color: ${({ theme }) => theme.primary};
`;

const MapCont = styled.div`
    position: absolute;
    top: 60px;
    right: 0;
    left: 0;
    bottom: 0;
`;

const MapMarker = styled(Marker)`
    background-image: url('https://i.imgur.com/3AHUUwx.png');
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
    position: absolute;
`;

const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-77.032, 38.913],
            },
            properties: {
                title: 'Test1',
                description: 'Washington, D.C.',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-122.414, 37.776],
            },
            properties: {
                title: 'Test2',
                description: 'Scan Franofio',
            },
        },
    ],
};

export function Home(): JSX.Element {
    return (
        <Map
            style='mapbox://styles/mapbox/light-v10'
            containerStyle={{
                height: '100vh',
                width: '100vw',
            }}
            center={[-122.414, 37.776]}
        >
            <MapMarker coordinates={[-122.414, 37.776]} anchor='center' />
        </Map>
    );
}

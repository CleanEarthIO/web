import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

import mapIcon from '../../assets/images/mapIcon.png';
import { device } from '../../utils/theme';

const MapContainer = styled.div`
    .mapboxgl-map {
        height: 100%;
        width: 100%;
    }

    height: 100vh;

    @media ${device.tabletM} {
        height: 300px;
    }
`;

const Mapbox = ReactMapboxGl({
    accessToken: `${process.env.REACT_APP_MAPBOX_KEY}`,
});

export function Map(): JSX.Element {
    const [displayPopup, setDisplay] = useState({
        display: false,
        coords: [0, 0],
    });

    const [mapSettings] = useState({
        points: [
            [-87.6309729, 41.76716449],
            [-87.63097366, 41.76668286],
            [-87.63095643, 41.76619789],
            [-87.63095245, 41.76578],
            [-87.63094033, 41.76561825],
        ],
        zoom: [15],
        center: [-87.63097788775872, 41.767174164037044],
    });

    const { points, zoom, center } = mapSettings;
    const image = new Image(20, 30);
    image.src = mapIcon;
    const images = ['myImage', image];

    return (
        <MapContainer>
            {/*
            // @ts-ignore */}
            <Mapbox style='mapbox://styles/mapbox/light-v10' zoom={zoom} center={center}>
                <Layer
                    type='symbol'
                    id='points'
                    layout={{ 'icon-image': 'myImage', 'icon-allow-overlap': true }}
                    images={images}
                >
                    {points.map((point, i) => (
                        <Feature
                            key={i}
                            coordinates={point}
                            onClick={() => setDisplay({ display: true, coords: point })}
                        />
                    ))}
                </Layer>
                {displayPopup.display ? (
                    <Popup coordinates={displayPopup.coords}>
                        <h1>Popup</h1>
                    </Popup>
                ) : null}
            </Mapbox>
        </MapContainer>
    );
}

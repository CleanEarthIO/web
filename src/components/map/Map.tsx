import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import { FaTimes } from 'react-icons/fa';

import mapIcon from '../../assets/images/mapIcon.png';
import { device } from '../../utils/theme';
import { SingleListing } from '../listings/Listings';
import { fetchAllEvents } from '../../store/actions/actionEvent';

const MapContainer = styled.div`
    .mapboxgl-map {
        height: 100%;
        width: 100%;
    }

    .mapboxgl-canvas {
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

const PopupCloseContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    width: 91%;
    z-index: 12;
    margin-top: 4px;
`;

const PopupClose = styled.button`
    color: ${({ theme }) => theme.error};
    font-size: 16px;
    padding: 0;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    &:focus {
        outline: none;
    }
`;

export function Map(): JSX.Element {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllEvents());
    }, []);

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
                    <Popup
                        coordinates={displayPopup.coords}
                        offset={{
                            // @ts-ignore
                            'bottom-left': [12, -38],
                            bottom: [0, -38],
                            'bottom-right': [-12, -38],
                        }}
                    >
                        <PopupCloseContainer>
                            <PopupClose
                                onClick={() =>
                                    setDisplay({
                                        display: false,
                                        coords: displayPopup.coords,
                                    })
                                }
                            >
                                <FaTimes />
                            </PopupClose>
                        </PopupCloseContainer>
                        <SingleListing />
                    </Popup>
                ) : null}
            </Mapbox>
        </MapContainer>
    );
}

import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import { FaTimes } from 'react-icons/fa';

import mapIcon from '../../assets/images/mapIcon.png';
import { device } from '../../utils/theme';
import { SingleListing } from '../listings/Listings';
import { fetchAllEvents } from '../../store/actions/actionEvent';
import { StoreState } from '../../store/reducers/reducers';

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

interface Member {
    email: String;
    id: number;
    name: string;
    points: number;
}

export interface Point {
    id: number;
    coords: number[];
    date: string;
    leader: Member;
    members: Member[];
}

export function Map(): JSX.Element {
    const dispatch = useDispatch();
    const events = useSelector((state: StoreState) => state.eventReducer.events);

    const fetchEvents = useCallback(() => {
        dispatch(fetchAllEvents());
    }, [dispatch]);

    useEffect(() => {
        if (_.isEmpty(events)) {
            fetchEvents();
        }
    }, []);

    useEffect(() => {
        let points: Point[] = [];
        events.map((ev, i) => {
            let p: Point = {
                id: ev.id,
                coords: [ev.latitude, ev.longitude],
                date: ev.date,
                leader: ev.leader,
                // @ts-ignore
                members: ev.members,
            };
            points.push(p);
        });
        setMapSettings({
            points: points,
            zoom: [15],
            center: [24.3, 42.3],
        });
    }, [events]);

    const [displayPopup, setDisplay] = useState({
        display: false,
        point: {} as Point,
    });

    // TODO: Ask for location and put the coords in
    const [mapSettings, setMapSettings] = useState({
        points: [] as Point[],
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
                            coordinates={point.coords}
                            onClick={() => setDisplay({ display: true, point: point })}
                        />
                    ))}
                </Layer>
                {displayPopup.display ? (
                    <Popup
                        coordinates={displayPopup.point.coords}
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
                                        point: displayPopup.point,
                                    })
                                }
                            >
                                <FaTimes />
                            </PopupClose>
                        </PopupCloseContainer>
                        <SingleListing point={displayPopup.point} />
                    </Popup>
                ) : null}
            </Mapbox>
        </MapContainer>
    );
}

import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import { FaTimes } from 'react-icons/fa';

import mapIcon from '../../assets/images/mapIcon.png';
import dumpsterIcon from '../../assets/images/dumpster-solid.png';
import pinIcon from '../../assets/images/map-pin-solid.png';
import { device } from '../../utils/theme';
import { SingleListing, TrashListing } from '../listings/Listings';
import { fetchAllEvents } from '../../store/actions/actionEvent';
import { fetchTrash } from '../../store/actions/actionTrash';
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
    margin-top: -9px;
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

export interface Event {
    id: number;
    coords: number[];
    date: string;
    leader: Member;
    members: Member[];
    city: string;
    state: string;
    road: string;
}

export interface Trash {
    id: number;
    image: string;
    latitude: number;
    longitude: number;
    trash_type: any;
    city: string;
    state: string;
    road: string;
}

export function Map(): JSX.Element {
    const dispatch = useDispatch();
    const [userLoc, setUserLoc] = useState({
        latitude: 0,
        longitude: 0,
        enabled: false,
    });

    const eventsState = useSelector((state: StoreState) => state.eventReducer.events);
    const trashState = useSelector((state: StoreState) => state.trashReducer.trash);

    const fetchEvents = useCallback(() => {
        dispatch(fetchAllEvents());
    }, []);

    // const fetchUserEvents = useCallback(() => {
    //     dispatch(fetchUserEvents());
    // }, []);

    const fetchAllTrash = useCallback(() => {
        dispatch(fetchTrash());
    }, [dispatch]);

    useEffect(() => {
        if (_.isEmpty(eventsState)) {
            fetchEvents();
        }
        if (_.isEmpty(trashState)) {
            fetchAllTrash();
        }

        dispatch(fetchUserEvents());

        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLoc({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                enabled: true,
            });
        });
    }, []);

    useEffect(() => {
        let events: Event[] = [];
        eventsState.map((ev) => {
            let p: Event = {
                id: ev.id,
                coords: [ev.longitude, ev.latitude],
                date: ev.date,
                leader: ev.leader,
                city: ev.city,
                // @ts-ignore
                members: ev.members,
                postcode: ev.postcode,
                state: ev.state,
                state_code: ev.state_code,
            };
            events.push(p);
        });
        let trash: Trash[] = [];
        console.log('ts', trashState);
        // @ts-ignore
        trashState.map((tr) => {
            console.log('tr', tr);
            let t: Trash = {
                id: tr.id,
                image: tr.image,
                latitude: tr.latitude,
                longitude: tr.longitude,
                trash_type: tr.trash_type,
                city: tr.city,
                state: tr.state,
                road: tr.road,
            };
            trash.push(t);
        });
        setMapSettings({
            events: events,
            trash: trash,
            zoom: [10],
            center: [-98.491142, 29.424349],
        });
    }, [eventsState, trashState, userLoc]);

    const [displayPopup, setDisplay] = useState({
        display: false,
        event: {} as Event,
        trash: {} as Trash,
        type: '',
    });

    // TODO: Ask for location and put the coords in
    const [mapSettings, setMapSettings] = useState({
        events: [] as Event[],
        trash: [] as Trash[],
        zoom: [0],
        center: [-98.491142, 29.424349],
    });

    const { events, trash, zoom, center } = mapSettings;
    const eventIcon = new Image(20, 30);
    eventIcon.src = mapIcon;
    const dumpster = new Image(20, 20);
    dumpster.src = dumpsterIcon;
    const pin = new Image(20, 35);
    pin.src = pinIcon;
    const images = [
        ['eventIcon', eventIcon],
        ['dumpster', dumpster],
        ['pin', pin],
    ];

    return (
        <MapContainer>
            {/*
            // @ts-ignore */}
            <Mapbox style='mapbox://styles/mapbox/light-v10' zoom={zoom} center={center}>
                <Layer
                    type='symbol'
                    id='events'
                    layout={{ 'icon-image': 'eventIcon', 'icon-allow-overlap': true }}
                    images={images}
                >
                    {events.map((event, i) => (
                        <Feature
                            key={i}
                            coordinates={event.coords}
                            onClick={() =>
                                setDisplay({
                                    display: true,
                                    event: event,
                                    trash: {} as Trash,
                                    type: 'event',
                                })
                            }
                        />
                    ))}
                </Layer>
                <Layer
                    type='symbol'
                    id='trash'
                    layout={{ 'icon-image': 'dumpster', 'icon-allow-overlap': true }}
                    images={images}
                >
                    {trash.map((trash, i) => (
                        <Feature
                            key={i}
                            coordinates={[trash.longitude, trash.latitude]}
                            onClick={() =>
                                setDisplay({
                                    display: true,
                                    event: {} as Event,
                                    trash: trash,
                                    type: 'trash',
                                })
                            }
                        />
                    ))}
                </Layer>
                {userLoc.enabled ? (
                    <Layer
                        type='symbol'
                        id='location'
                        layout={{ 'icon-image': 'pin', 'icon-allow-overlap': true }}
                        images={images}
                    >
                        <Feature
                            key={'loc'}
                            coordinates={[userLoc.longitude, userLoc.latitude]}
                            onClick={() => {}}
                        />
                    </Layer>
                ) : null}

                {displayPopup.display ? (
                    <Popup
                        coordinates={
                            displayPopup.type === 'event'
                                ? displayPopup.event.coords
                                : [
                                      displayPopup.trash.longitude,
                                      displayPopup.trash.latitude,
                                  ]
                        }
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
                                        event: displayPopup.event,
                                        trash: displayPopup.trash,
                                        type: displayPopup.type,
                                    })
                                }
                            >
                                <FaTimes />
                            </PopupClose>
                        </PopupCloseContainer>
                        {displayPopup.type === 'event' ? (
                            <SingleListing event={displayPopup.event} />
                        ) : (
                            <TrashListing trash={displayPopup.trash} />
                        )}
                    </Popup>
                ) : null}
            </Mapbox>
        </MapContainer>
    );
}

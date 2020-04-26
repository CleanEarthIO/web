import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Listings } from '../../listings/Listings';
import { device } from '../../../utils/theme';
import { Map } from '../../map/Map';
import { fetchUserEvents } from '../../../store/actions/actionEvent';
import { fetchTrash } from '../../../store/actions/actionTrash';

const MapLayout = styled.div`
    height: 100vh;
    position: fixed;
    width: 50%;
    z-index: 30;

    @media ${device.tabletM} {
        width: 100%;
    }
`;

const ListingsLayout = styled.div`
    width: 50%;
    float: right;

    @media ${device.tabletM} {
        width: 100%;
        margin-top: 300px;
    }
`;

export function Discover(): JSX.Element {
    const dispatch = useDispatch();

    const fetchEvents = useCallback(() => {
        dispatch(fetchUserEvents());
    }, [dispatch]);

    const fetchAllTrash = useCallback(() => {
        dispatch(fetchTrash());
    }, [dispatch]);

    useEffect(() => {
        fetchEvents();
        fetchAllTrash();
    }, []);

    return (
        <>
            <MapLayout>
                <Map />
            </MapLayout>
            <ListingsLayout>
                <Listings />
            </ListingsLayout>
        </>
    );
}

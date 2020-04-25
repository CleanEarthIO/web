import React from 'react';
import styled from 'styled-components';

import { Listings } from '../../listings/Listings';
import { device } from '../../../utils/theme';
import { Map } from '../../map/Map';

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

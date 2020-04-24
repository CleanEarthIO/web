import React from 'react';
import styled from 'styled-components';

import { Listings } from '../../listings/Listings';
import { device } from '../../../utils/theme';

const ReplaceMe = styled.div`
    background-color: gray;
    height: 100vh;
    position: fixed;
    width: 50%;
    z-index: 30;

    @media ${device.tabletS} {
        height: 300px;
        width: 100%;
    }
`;

const ListingsLayout = styled.div`
    width: 50%;
    float: right;

    @media ${device.tabletS} {
        width: 100%;
        margin-top: 300px;
    }
`;

export function Discover(): JSX.Element {
    return (
        <>
            <ReplaceMe />
            <ListingsLayout>
                <Listings />
            </ListingsLayout>
        </>
    );
}

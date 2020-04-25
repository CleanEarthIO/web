import React from 'react';
import styled from 'styled-components';
import { device } from '../../utils/theme';

export const ItemDivider = styled.div`
    margin: 2px 0px;
    border-bottom: 2px solid ${({ theme }) => theme.divider};
`;

export const NotSupContainer = styled.div`
    display: none;

    @media ${device.mobileL} {
        display: initial;
    }
`;

const NotSupBG = styled.div`
    display: flex;
    height: 52px;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.error};
    padding-top: 60px;
    margin-bottom: -60px;
    position: fixed;
`;

const NotSupText = styled.h1`
    font-size: 13px;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.white};
`;

export function NotSupported(): JSX.Element {
    return (
        <NotSupContainer>
            <NotSupBG>
                <NotSupText>We're currently working on improving mobile</NotSupText>
            </NotSupBG>
        </NotSupContainer>
    );
}

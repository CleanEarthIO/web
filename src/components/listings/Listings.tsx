import React from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaRegCalendarAlt, FaUsers } from 'react-icons/fa';

import testimg from '../../assets/images/testimg.jpg';
import { ItemDivider } from '../globalUI/GlobalUI';

const ListingContainer = styled.div`
    margin: 30px 15px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const ListingCard = styled.div`
    height: 450px;
`;

const ListingThumbnail = styled.img`
    height: 210px;
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
`;

const SmlHorDivider = styled.div`
    height: 20px;
    width: 1px;
    background-color: ${({ theme }) => theme.gray300};
    align-self: center;
    margin: 0px 10px;
`;

const ListingDetails = styled.div`
    min-height: 130px;
    position: relative;
    margin: -40px 15px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.white};
    padding: 11px;
    box-shadow: 0px 0px 38px 0px rgba(0, 0, 0, 0.1);

    h1 {
        font-size: 20px;
        margin-bottom: 5px;
        color: ${({ theme }) => theme.gray800};
    }

    p {
        display: flex;
        align-items: center;

        font-size: 14px;
        margin: 9px 0px 0px 0px;

        color: ${({ theme }) => theme.gray500};

        svg {
            margin-right: 6px;
        }

        span {
            font-size: 12px;
            color: ${({ theme }) => theme.gray450};
        }
    }

    div {
        display: flex;
        margin-bottom: 5px;
    }
`;

const ListingButton = styled.button`
    padding: 7px 15px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 8px;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.primary};

    &:hover {
        padding: 7px 22px;
        opacity: 0.8;
    }
`;

export function Listings(): JSX.Element {
    return (
        <ListingContainer>
            <ListingCard>
                <ListingThumbnail src={testimg} />
                <ListingDetails>
                    <h1>Sample text</h1>
                    <ItemDivider />
                    <p>
                        <FaMapMarkerAlt />
                        City, State
                    </p>
                    <div>
                        <p>
                            <FaRegCalendarAlt />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>Cleanup Date</span>
                                0/00/00
                            </div>
                        </p>
                        <SmlHorDivider />
                        <p>
                            <FaUsers style={{ fontSize: '19px' }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>Attendees</span>0
                            </div>
                        </p>
                    </div>
                    <ItemDivider />
                    <ListingButton>Attend</ListingButton>
                </ListingDetails>
            </ListingCard>
        </ListingContainer>
    );
}


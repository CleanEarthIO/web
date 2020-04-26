import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaRegCalendarAlt, FaUsers, FaUserAlt } from 'react-icons/fa';

import testimg from '../../assets/images/testimg.jpg';
import { ItemDivider } from '../globalUI/GlobalUI';
import { device } from '../../utils/theme';
import { Point } from '../map/Map';
import { StoreState } from '../../store/reducers/reducers';
import cleanearth from '../../apis/cleanearth';

interface StyleProps {
    tOff?: boolean;
}

const ListingContainer = styled.div`
    margin: 30px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    @media ${device.mobileXS} {
        margin: 10px;
    }
`;

const ListingCard = styled.div`
    height: 365px;

    @media ${device.laptopM} {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const ListingThumbnail = styled.img`
    height: 210px;
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
`;

const ListingDetails = styled.div`
    min-height: 130px;
    margin: ${({ tOff }: StyleProps) => (tOff ? '0px' : '-40px 15px')};
    position: relative;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.white};
    width: ${({ tOff }: StyleProps) => (tOff ? '330px' : null)};
    padding: ${({ tOff }: StyleProps) => (tOff ? '3px' : '11px')};
    box-shadow: ${({ tOff }: StyleProps) =>
        tOff ? '' : ' 0px 0px 38px 0px rgba(0, 0, 0, 0.1)'};

    h1 {
        font-size: ${({ tOff }: StyleProps) => (tOff ? '15px' : '18px')};
        margin-bottom: 5px;
        color: ${({ theme }) => theme.gray800};
    }

    p {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 14px;
        margin: 9px 0px 0px 0px;

        color: ${({ theme }) => theme.gray500};

        @media ${device.tabletL} {
            justify-content: initial;
        }

        svg {
            margin-right: 6px;
        }

        span {
            display: flex;
            flex-direction: column;
            font-size: 12px;
            margin-bottom: ${({ tOff }: StyleProps) => (tOff ? '-6px' : null)};
            color: ${({ theme }) => theme.gray500};
        }
    }

    div {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        margin-bottom: 9px;

        @media ${device.tabletL} {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
    }

    @media ${device.laptopM} {
        width: ${({ tOff }: StyleProps) => (tOff ? '255px' : '350px')};
    }

    @media ${device.tabletL} {
        width: ${({ tOff }: StyleProps) => (tOff ? '255px' : '300px')};
    }

    @media ${device.mobileXS} {
        width: ${({ tOff }: StyleProps) => (tOff ? '255px' : '280px')};
    }
`;

const ListingSubTitle = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.gray450} !important;
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

interface AppProps {
    point?: Point;
}

function handleClick(eventID: number) {
    console.log(eventID);
    cleanearth
        .post(`/event/${eventID}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
}

function ListingTest(): JSX.Element[] {
    const clean_events = useSelector((state: StoreState) => state.eventReducer.events);
    const user_profile = useSelector(
        // @ts-ignore
        (state: StoreState) => state.authReducer.user_cleanearth.id
    );
    console.log('userid', user_profile);

    const event_listings = clean_events.map((event, i) => {
        return (
            <ListingCard key={i}>
                <ListingThumbnail src={testimg} />
                <ListingDetails>
                    <h1>{event.road}</h1>
                    <ItemDivider />
                    <p style={{ justifyContent: 'initial ' }}>
                        <FaMapMarkerAlt />
                        {event.city}, {event.state}
                    </p>
                    <div>
                        <p>
                            <FaRegCalendarAlt />
                            <span>
                                <ListingSubTitle>Cleanup Date</ListingSubTitle>
                                {event.date}
                            </span>
                        </p>
                        <p>
                            <FaUsers style={{ fontSize: '19px' }} />
                            <span>
                                <ListingSubTitle>Attendees</ListingSubTitle>
                                {/*
                                // @ts-ignore */}
                                {event.members.length}
                            </span>
                        </p>
                        <p>
                            <FaUserAlt />
                            <span>
                                <ListingSubTitle>Organized by</ListingSubTitle>
                                {event.leader.name}
                            </span>
                        </p>
                    </div>
                    <ItemDivider />
                    {user_profile === event.leader.id ? (
                        <ListingButton style={{ backgroundColor: '#f2a839' }}>
                            Attending
                        </ListingButton>
                    ) : (
                        <ListingButton onClick={() => handleClick(event.id)}>
                            Attend
                        </ListingButton>
                    )}
                </ListingDetails>
            </ListingCard>
        );
    });
    return event_listings;
}

export function SingleListing({ point }: AppProps): JSX.Element {
    return (
        <ListingDetails tOff>
            <h1>
                {point!.road}
                {'    '}
            </h1>
            <ItemDivider />
            <p style={{ justifyContent: 'initial ' }}>
                <FaMapMarkerAlt />
                {point!.city}, {point!.state}
            </p>
            <div>
                <p style={{ justifyContent: 'initial ' }}>
                    <FaRegCalendarAlt />
                    <span>
                        <ListingSubTitle>Cleanup Date</ListingSubTitle>
                        {point!.date}
                    </span>
                </p>
                <p style={{ justifyContent: 'initial ' }}>
                    <FaUsers style={{ fontSize: '19px' }} />
                    <span>
                        <ListingSubTitle>Attendees</ListingSubTitle>
                        {point!.members.length}
                    </span>
                </p>
                <p style={{ justifyContent: 'initial ' }}>
                    <FaUserAlt />
                    <span>
                        <ListingSubTitle>Created by</ListingSubTitle>
                        {point!.leader.name}
                    </span>
                </p>
            </div>
            <ItemDivider />
            <ListingButton>Create Cleanup</ListingButton>
        </ListingDetails>
    );
}

export function Listings(): JSX.Element {
    return <ListingContainer>{ListingTest()}</ListingContainer>;
}

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserAlt, FaPowerOff, FaChevronDown } from 'react-icons/fa';

import { device } from '../../utils/theme';

interface StyleProps {
    arrowActive?: boolean;
}

const UserDropdown = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 25px;
    height: 100%;
`;

const UserProfileImg = styled.img`
    height: 35px;
    width: 35px;
    border-radius: 8px;
    margin-right: 8px;
    object-fit: cover;
    background-color: ${({ theme }) => theme.gray500};
`;

const UserProfileBtn = styled.button`
    display: flex;
    align-items: center;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.gray800};
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.5px;
    height: 100%;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.primary};
        opacity: 0.8;
        transition: all 0s ease 0s;
    }
`;

const UserProfileText = styled.p`
    font-size: 15px;
    letter-spacing: 0.5px;
`;

const DropdownIcon = styled(FaChevronDown)`
    font-size: 14px;
    margin-left: 8px;
    transform: rotate(${(props: StyleProps) => (props.arrowActive ? 180 : 0)}deg);
    display: flex !important;
    @media ${device.mobileXS} {
        margin-left: 5px;
    }
`;

// const AccountIcons = styled(Icon)`
//     display: flex;
//     margin-right: 8px;
// `;

const ProfileList = styled.ul`
    z-index: 10;
    top: 49px;
    right: 0px;
    width: 175px;
    margin-top: 10px;
    border-radius: 15px;
    position: absolute;
    padding: 6px;
    list-style-type: none;
    font-weight: bold;
    background-color: white;
    box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.2);
`;

const ItemDivider = styled.div`
    margin: 2px 0px;
    border-bottom: 2px solid ${({ theme }) => theme.divider};
`;

const ListItemLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 15px 7px;
    color: ${({ theme }) => theme.gray800};
    font-weight: 600;
    letter-spacing: 0.5px;
    text-decoration: none;
    border-radius: 11px;
    margin: 5px;
    &:hover {
        background-color: ${({ theme }) => theme.gray200};
        transition: all 0s ease 0s;
    }
`;

const ListItem = styled.li`
    padding: 0px 7px;
    border-radius: 15px;
    display: flex;
    align-items: center;
`;

const Test = styled.div`
    height: 100%;
`;

export function AccountDropdown() {
    // Reference to outer div
    const node = useRef<HTMLDivElement>(null);
    const [profileDropdown, setProfileDropdown] = useState(false);

    const handleClick = (e: Event) => {
        // Returns true if whatever you're clicking is inside the “node” ref.
        if (node.current!.contains(e.target as HTMLDivElement)) return;
        setProfileDropdown(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <Test ref={node}>
            <UserDropdown onClick={() => setProfileDropdown(!profileDropdown)}>
                <UserProfileBtn>
                    <UserProfileText>Name</UserProfileText>
                    <DropdownIcon arrowActive={profileDropdown} />
                </UserProfileBtn>
            </UserDropdown>

            {profileDropdown ? (
                <ProfileList onClick={() => setProfileDropdown(!profileDropdown)}>
                    <ListItemLink to='/'>
                        <FaUserAlt />
                        <ListItem>Profile</ListItem>
                    </ListItemLink>
                    <ItemDivider />
                    <ListItemLink to='/login'>
                        <FaPowerOff />
                        <ListItem>Log Out</ListItem>
                    </ListItemLink>
                </ProfileList>
            ) : undefined}
        </Test>
    );
}

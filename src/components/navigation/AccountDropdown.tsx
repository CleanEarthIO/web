import React, { useState, useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserAlt, FaPowerOff, FaChevronDown, FaCog } from 'react-icons/fa';

import { device } from '../../utils/theme';
import { ItemDivider } from '../globalUI/GlobalUI';
import { useAuth0 } from '../../apis/react-auth0-spa';
import { authLogout } from '../../store/actions/actionAuth';
import { AuthLogoutAction } from '../../store/interfaces/interfaceAuth';
import { NoAccess } from '../../utils/global-styles';

interface StyleProps {
    arrowactive?: boolean | number;
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
    transform: rotate(${(props: StyleProps) => (props.arrowactive ? 180 : 0)}deg);
    display: flex !important;
    @media ${device.mobileXS} {
        margin-left: 5px;
    }
`;

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

const ProfileContainer = styled.div`
    height: 100%;
`;

const handleLogout = (dispatch: Dispatch<AuthLogoutAction>, logout: () => void): void => {
    logout();
    dispatch(authLogout());
};

interface AppProps {
    user_profile: any;
}

export function AccountDropdown({ user_profile }: AppProps): JSX.Element {
    const { logout } = useAuth0();
    const dispatch = useDispatch();

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
        <ProfileContainer ref={node}>
            <UserDropdown onClick={() => setProfileDropdown(!profileDropdown)}>
                <UserProfileBtn>
                    {/*
                    <UserProfileText>{user_profile.given_name}</UserProfileText>
                     */}
                    <UserProfileText>Name</UserProfileText>
                    <DropdownIcon arrowactive={profileDropdown ? 1 : 0} />
                </UserProfileBtn>
            </UserDropdown>

            {profileDropdown ? (
                <ProfileList onClick={() => setProfileDropdown(!profileDropdown)}>
                    <NoAccess>
                        <ListItemLink to='/'>
                            <FaUserAlt />
                            <ListItem>Profile</ListItem>
                        </ListItemLink>
                    </NoAccess>
                    <ItemDivider />
                    <NoAccess>
                        <ListItemLink to='/'>
                            <FaCog />
                            <ListItem>Settings</ListItem>
                        </ListItemLink>
                    </NoAccess>
                    <ItemDivider />
                    <ListItemLink to='/' onClick={() => handleLogout(dispatch, logout)}>
                        <FaPowerOff />
                        <ListItem>Log Out</ListItem>
                    </ListItemLink>
                </ProfileList>
            ) : undefined}
        </ProfileContainer>
    );
}

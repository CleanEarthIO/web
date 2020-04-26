import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import cleanEarthSmall from '../../assets/images/cleanEarthSmall.png';
import { AccountDropdown } from './AccountDropdown';
import { useAuth0 } from '../../apis/react-auth0-spa';
import { StoreState, useSelector } from '../../store/reducers/reducers';

interface StyleProps {
    moveRight?: boolean;
    navLogo?: boolean;
}

const NavContainer = styled.nav`
    display: flex;
    height: 60px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
    background-color: ${({ theme }) => theme.white};
    width: 100%;
    z-index: 50;
    position: fixed;
`;

const NavContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
    width: 1310px;
    position: relative;
`;

const NavRoutes = styled.div`
    display: flex;
`;

const NavLogo = styled.h1`
    position: absolute;
    left: 10px;
`;

const NavList = styled.ul`
    display: flex;
    position: ${(props: StyleProps) => (props.moveRight ? 'absolute' : '')};
    right: ${(props: StyleProps) => (props.moveRight ? '10px' : '')};
`;

const NavItem = styled.li`
    font-size: 14px;
    list-style: none;
    display: flex;
    align-items: center;
`;

const NavImg = styled.img`
    padding: 15px;
    height: 42px;
    filter: none;
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    cursor: pointer;
    opacity: 0.8;

    &:hover {
        filter: none;
        -webkit-filter: grayscale(0%);
        -moz-filter: grayscale(0%);
        -ms-filter: grayscale(0%);
        -o-filter: grayscale(0%);
        opacity: 1;
    }
`;

const activeClassName = 'active';
const StyledPoperties = `
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 21px 15px;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    margin-right: 8px;
    font-size: 14px;

`;

const StyledNavLink = styled(NavLink).attrs({
    activeClassName,
})`
    ${StyledPoperties}
    color: ${(props: any) => props.theme.gray800};
    &:hover {
        color: ${(props: any) => props.theme.primary};
        border-bottom: 2px solid ${(props: any) => props.theme.primary};
    }
    &.${activeClassName} {
        color: ${(props: any) => props.theme.gray600};
        border-bottom: 2px solid ${(props: any) => props.theme.primary};
    }
`;
const StyledButton = styled.button`
    ${StyledPoperties}
    color: ${(props) => props.theme.gray800};
    cursor: pointer;
    background-color: transparent;
    &:hover {
        color: ${(props: any) => props.theme.primary};
    }
`;

export function Navigation(): JSX.Element {
    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated, user } = useSelector((state: StoreState) => ({
        isAuthenticated: state.authReducer.isAuthenticated,
        user: state.authReducer.user,
    }));

    return (
        <NavContainer>
            <NavContent>
                <NavLogo>
                    <NavImg src={cleanEarthSmall} />
                </NavLogo>
                <NavRoutes>
                    <NavList>
                        <NavItem>
                            <StyledNavLink to='/discover' activeClassName='active'>
                                Discover
                            </StyledNavLink>
                        </NavItem>
                    </NavList>
                </NavRoutes>
                <NavList moveRight style={{ height: '100%' }}>
                    <NavItem>
                        {isAuthenticated ? (
                            <AccountDropdown user_profile={user} />
                        ) : (
                            <StyledButton onClick={() => loginWithRedirect({})}>
                                Login
                            </StyledButton>
                        )}
                    </NavItem>
                </NavList>
            </NavContent>
        </NavContainer>
    );
}

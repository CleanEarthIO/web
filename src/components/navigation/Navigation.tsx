import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import cleanseSmall from '../../assets/images/cleanseSmall.png';
import { AccountDropdown } from './AccountDropdown';

interface StyleProps {
    moveRight?: boolean;
    navLogo?: boolean;
}

const NavContainer = styled.nav`
    display: flex;
    height: 60px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
`;

const NavContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 25px;
    margin: 0px auto;
    width: 1375px;
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
const StyledNavLink = styled(NavLink).attrs({
    activeClassName,
})`
    color: ${(props) => props.theme.gray800};
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 21px 15px;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    margin-right: 8px;
    &:hover {
        color: ${(props) => props.theme.primary};
        border-bottom: 2px solid ${(props) => props.theme.primary};
    }
    &.${activeClassName} {
        color: ${(props) => props.theme.gray600};
        border-bottom: 2px solid ${(props) => props.theme.primary};
    }
`;

export function Navigation(): JSX.Element {
    return (
        <NavContainer>
            <NavContent>
                <NavLogo>
                    <NavImg src={cleanseSmall} />
                </NavLogo>
                <NavRoutes>
                    <NavList>
                        <NavItem>
                            <StyledNavLink exact to='/' activeClassName='active'>
                                Home
                            </StyledNavLink>
                        </NavItem>
                        <NavItem>
                            <StyledNavLink to='/discover' activeClassName='active'>
                                Discover
                            </StyledNavLink>
                        </NavItem>
                    </NavList>
                </NavRoutes>
                <NavList moveRight style={{ height: '100%' }}>
                    <NavItem>
                        {/* <AccountDropdown /> */}
                        <StyledNavLink to='/login'>Login</StyledNavLink>
                        <StyledNavLink to='/register'>Sign Up</StyledNavLink>
                    </NavItem>
                </NavList>
            </NavContent>
        </NavContainer>
    );
}

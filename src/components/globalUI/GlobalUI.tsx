import styled from 'styled-components';

export const ItemDivider = styled.div`
    margin: 2px 0px;
    border-bottom: 2px solid ${({ theme }) => theme.divider};
`;

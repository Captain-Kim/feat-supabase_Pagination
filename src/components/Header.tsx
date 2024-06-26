import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #333;
  padding: 10px;
  color: #fff;
`;

const Menu = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const MenuItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  `;

const Header: React.FC = () => (
  <HeaderContainer>
    <Menu>
      <MenuItem to="/">Infinite Scroll</MenuItem>
      <MenuItem to="/pagination">Pagination</MenuItem>
    </Menu>
  </HeaderContainer>
);

export default Header;
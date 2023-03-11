/* eslint-disable no-unused-vars */
import React from 'react';
import { Fa, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, IconButton, Nav, Navbar } from 'rsuite';

import * as actions from '../../store/modules/auth/actions';

export default function IHeader() {
  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(actions.adminLoginFailure());
  };

  return (
    <Container>
      <Header>
        <Navbar>
          <Nav>
            <Navbar.Brand href="/">IRONWARE</Navbar.Brand>
          </Nav>
          <Nav pullRight>
            <Nav.Item onClick={changeTheme} as="div">
              <IconButton
                appearance="subtle"
                size="sm"
                icon={<FaSignOutAlt style={{ fontSize: 28 }} />}
              />
            </Nav.Item>
          </Nav>
        </Navbar>
      </Header>
    </Container>
  );
}

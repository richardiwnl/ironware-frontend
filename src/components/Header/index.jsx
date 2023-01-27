import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, IconButton, Nav, Navbar } from 'rsuite';

import * as actions from '../../store/modules/theme/actions';

export default function IHeader() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme.theme);

  const changeTheme = () => {
    dispatch(actions.switchTheme());
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
                icon={
                  currentTheme === 'dark' ? (
                    <FaMoon style={{ fontSize: 28 }} />
                  ) : (
                    <FaSun style={{ fontSize: 28 }} />
                  )
                }
              />
            </Nav.Item>
          </Nav>
        </Navbar>
      </Header>
    </Container>
  );
}

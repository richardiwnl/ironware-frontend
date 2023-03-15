/* eslint-disable no-unused-vars */
import React from 'react';
import { Fa, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { Container, Header, IconButton, Nav, Navbar } from 'rsuite';

import * as actions from '../../store/modules/auth/actions';

export default function IHeader({ dashboard }) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isAdminLoggedIn);

  const logout = () => {
    dispatch(actions.adminLoginFailure());
  };

  return (
    <Container>
      <Header>
        <Navbar>
          <Nav>
            <Navbar.Brand href="/">IRONWARE</Navbar.Brand>
          </Nav>
          {isLoggedIn && dashboard ? (
            <Nav pullRight>
              <Nav.Item title="Sair" onClick={logout} as="div">
                <IconButton
                  appearance="subtle"
                  size="sm"
                  icon={<FaSignOutAlt style={{ fontSize: 28 }} />}
                />
              </Nav.Item>
            </Nav>
          ) : null}
        </Navbar>
      </Header>
    </Container>
  );
}

IHeader.defaultProps = {
  dashboard: false,
};

IHeader.propTypes = {
  dashboard: propTypes.bool,
};

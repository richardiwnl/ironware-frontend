/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';

import { FaSignOutAlt } from 'react-icons/fa';

import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import CartIcon from '@rsuite/icons/legacy/CartPlus';
import HeartIcon from '@rsuite/icons/legacy/Heart';
import MenuIcon from '@rsuite/icons/Menu';
import SearchIcon from '@rsuite/icons/Search';

import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Drawer,
  Header,
  IconButton,
  Input,
  InputGroup,
  Nav,
  Navbar,
} from 'rsuite';

import * as actions from '../../store/modules/auth/actions';

export default function HomeHeader() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isUserLoggedIn);
  let currentUser = useSelector(state => state.auth.user.nome);

  const [open, setOpen] = useState(false);

  if (currentUser) currentUser = currentUser.split(' ').at(0);

  const logout = () => {
    dispatch(actions.userLogout());
  };

  return (
    <Container>
      <Drawer
        size="xs"
        open={open}
        placement="left"
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>
            {currentUser ? `Olá, ${currentUser}` : `Olá. Faça seu login.`}
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>.</Drawer.Body>
      </Drawer>
      <Header>
        <Navbar>
          <Nav onClick={() => setOpen(true)}>
            <Nav.Item icon={<MenuIcon />} />
          </Nav>
          <Nav>
            <Navbar.Brand href="/">IRONWARE</Navbar.Brand>
          </Nav>
          {isLoggedIn ? (
            <Nav pullRight>
              <Nav.Item onClick={logout} as="div">
                <IconButton
                  appearance="subtle"
                  size="sm"
                  icon={<FaSignOutAlt style={{ fontSize: 28 }} />}
                />
              </Nav.Item>
            </Nav>
          ) : null}
          <Nav pullRight>
            {currentUser ? (
              <Nav.Item
                icon={<AvatarIcon style={{ fontSize: '25px' }} />}
              >{`Olá, ${currentUser}`}</Nav.Item>
            ) : (
              <Nav.Item
                icon={<AvatarIcon style={{ fontSize: '25px' }} />}
                href="/login"
              >
                Fazer Login
              </Nav.Item>
            )}
          </Nav>
          <Nav pullRight>
            <Nav.Item icon={<HeartIcon style={{ fontSize: 28 }} />}>
              Favoritos
            </Nav.Item>
          </Nav>
          <Nav pullRight>
            <Nav.Item icon={<CartIcon style={{ fontSize: 28 }} />}>
              Carrinho
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <InputGroup size="lg" inside>
                <Input className="search-bar" />
                <InputGroup.Button>
                  <SearchIcon style={{ fontSize: 20 }} />
                </InputGroup.Button>
              </InputGroup>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Header>
    </Container>
  );
}

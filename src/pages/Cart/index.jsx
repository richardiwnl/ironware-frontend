import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AvatarIcon from '@rsuite/icons/legacy/Avatar';

import { Header, Nav, Navbar } from 'rsuite';

import Cart from '../../components/Cart';

function Carrinho() {
  let currentUser = useSelector(state => state.auth.user.nome);

  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);

  if (currentUser) currentUser = currentUser.split(' ').at(0);

  return (
    <>
      <Header>
        <Navbar>
          <Nav>
            <Navbar.Brand href="/">IRONWARE</Navbar.Brand>
          </Nav>
          <Nav pullRight>
            {currentUser ? (
              <Nav.Item
                href="minha-conta/"
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
        </Navbar>
      </Header>
      <Cart />
    </>
  );
}

export default Carrinho;

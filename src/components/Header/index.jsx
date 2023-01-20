import React from 'react';
import { Container, Header, Nav, Navbar } from 'rsuite';
import { FaUserCircle } from 'react-icons/fa';

export default function IHeader() {
  return (
    <Container>
      <Header>
        <Navbar>
          <Nav>
            <Navbar.Brand href="#">IRONWARE</Navbar.Brand>
          </Nav>
          <Nav pullRight>
            <Nav.Item>
              <FaUserCircle size={28} />
            </Nav.Item>
          </Nav>
        </Navbar>
      </Header>
    </Container>
  );
}

import styled from 'styled-components';
import { primaryDarkColor } from '../../config/colors';

export const Nav = styled.nav`
  font-family: 'Alike';
  font-size: 2rem;
  background-color: ${primaryDarkColor};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .account-circle {
    transition: transform 150ms linear;

    &:hover {
      transform: scale(1.15);
    }
  }

  a {
    color: white;
    margin: 0 10px 0;
    font-weight: bold;
    text-decoration: none;
  }
`;

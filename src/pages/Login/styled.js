import styled from 'styled-components';

export const Title = styled.h1`
  color: ${props => (props.isRed ? 'red' : 'blue')};
  small {
    font-size: 14px;
  }
`;

export const Paragrafo = styled.p`
  color: green;
`;

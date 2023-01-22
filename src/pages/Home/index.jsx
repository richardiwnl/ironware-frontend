import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FlexboxGrid } from 'rsuite';

export default function Home() {
  useEffect(() => {
    document.title = 'Ironware | Home';
  }, []);

  let nome = useSelector(state => state.auth.user.nome);
  nome = nome ? nome.split(' ').at(0) : nome;

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item>
        <h1>{nome ? `Bem-vindo de volta, ${nome}!` : 'Home'}</h1>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}

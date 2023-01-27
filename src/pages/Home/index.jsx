/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'rsuite';

import HomeHeader from '../../components/HomeHeader';

export default function Home() {
  useEffect(() => {
    document.title = 'Ironware | Home';
  }, []);

  let nome = useSelector(state => state.auth.user.nome);
  // eslint-disable-next-line no-unused-vars
  nome = nome ? nome.split(' ').at(0) : nome;

  return (
    <>
      <HomeHeader />
      <Carousel
        key="1"
        autoplay
        placement="bottom"
        shape="bar"
        style={{ height: 300 }}
        className="custom-slider"
      >
        <img
          src="https://static.cdnlive.com.br/uploads/602/etc/16715697853984.png"
          height="300"
        />
        <img
          src="https://static.cdnlive.com.br/uploads/602/banner/16696759577074.jpeg"
          height="300"
        />
        <img
          src="https://static.cdnlive.com.br/uploads/602/etc/16697211735069.png"
          height="300"
        />
        <img
          src="https://static.cdnlive.com.br/uploads/602/etc/16745904501961.png"
          height="300"
        />
      </Carousel>
    </>
  );
}

/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Carousel, Content, Panel } from 'rsuite';

import HomeHeader from '../../components/HomeHeader';
import CardContainer from './styled';

export default function Home() {
  useEffect(() => {
    document.title = 'Ironware | Home';
  }, []);

  let nome = useSelector(state => state.auth.user.nome);
  // eslint-disable-next-line no-unused-vars
  nome = nome ? nome.split(' ').at(0) : nome;

  return (
    <Content>
      <HomeHeader />
      <Carousel
        key="1"
        autoplay
        placement="bottom"
        shape="bar"
        style={{ height: 400, marginBottom: '50px' }}
        className="custom-slider"
      >
        <img
          src="https://static.cdnlive.com.br/uploads/602/etc/16715697853984.png"
          height="400"
        />
        <img
          src="https://static.cdnlive.com.br/uploads/602/banner/16696759577074.jpeg"
          height="400"
        />
        <img
          src="https://static.cdnlive.com.br/uploads/602/etc/16697211735069.png"
          height="400"
        />
        <img
          src="https://static.cdnlive.com.br/uploads/602/etc/16745904501961.png"
          height="400"
        />
      </Carousel>

      <CardContainer>
        <Panel
          shaded
          bordered
          bodyFill
          style={{ display: 'inline-block', width: 340 }}
          className="product-card"
        >
          <img
            src="https://images.kabum.com.br/produtos/fotos/164854/placa-de-video-asus-nvidia-dual-rtx-3060-o12g-v2-15-gbps-12gb-gddr6-ray-tracing-dlss-90yv0gb2-m0na10_1623244899_g.jpg"
            width="340"
          />
          <Panel header="Placa de Vídeo RTX 3060 Asus Dual O12G V2 NVIDIA GeForce">
            <div>
              <h5 style={{ marginBottom: '10px' }}>R$ 3400,00</h5>

              <Button appearance="primary" block>
                Comprar
              </Button>
            </div>
          </Panel>
        </Panel>
        <Panel
          shaded
          bordered
          bodyFill
          style={{ display: 'inline-block', width: 340 }}
          className="product-card"
        >
          <img
            src="https://images.kabum.com.br/produtos/fotos/164854/placa-de-video-asus-nvidia-dual-rtx-3060-o12g-v2-15-gbps-12gb-gddr6-ray-tracing-dlss-90yv0gb2-m0na10_1623244899_g.jpg"
            width="340"
          />
          <Panel header="Placa de Vídeo RTX 3060 Asus Dual O12G V2 NVIDIA GeForce">
            <div>
              <h5 style={{ marginBottom: '10px' }}>R$ 3400,00</h5>

              <Button appearance="primary" block>
                Comprar
              </Button>
            </div>
          </Panel>
        </Panel>
        <Panel
          shaded
          bordered
          bodyFill
          style={{ display: 'inline-block', width: 340 }}
          className="product-card"
        >
          <img
            src="https://images.kabum.com.br/produtos/fotos/164854/placa-de-video-asus-nvidia-dual-rtx-3060-o12g-v2-15-gbps-12gb-gddr6-ray-tracing-dlss-90yv0gb2-m0na10_1623244899_g.jpg"
            width="340"
          />
          <Panel header="Placa de Vídeo RTX 3060 Asus Dual O12G V2 NVIDIA GeForce">
            <div>
              <h5 style={{ marginBottom: '10px' }}>R$ 3400,00</h5>

              <Button appearance="primary" block>
                Comprar
              </Button>
            </div>
          </Panel>
        </Panel>
      </CardContainer>
    </Content>
  );
}

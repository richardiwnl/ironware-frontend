/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Nav } from 'rsuite';
import styled from 'styled-components';

const CardBox = styled.div`
  padding: 5% 5%;
  background: white;
  bottom: 0;
  width: 100%;
  margin-top: 0;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 ato;
`;

const CardNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CardRow = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 0.5fr));
  grid-gap: 1%;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 0.5fr));
  }
`;

const CardModel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  margin-left: 60px;
  width: 100%;

  padding: 0.5rem;
  border: 0.1px solid #ebebeb;
  border-radius: 3px;

  transition: box-shadow 200ms ease 0s;
  box-shadow: rgba(40, 41, 61, 0.08) 0px 0px 1px,
    rgba(96, 97, 112, 0.16) 0px 0.5px 2px;

  &:hover {
    box-shadow: rgba(40, 41, 61, 0.08) 0px 4px 8px,
      rgba(96, 97, 112, 0.16) 0px 8px 160px;
  }
`;

const CardInfo = styled.a`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  text-align: left;

  &:hover {
    text-decoration: none;
  }
`;
const CardImage = styled.img`
  width: auto;
  max-width: 70%;
  margin: auto;
  border-radius: 10px;
`;
const CardText = styled.p`
  font-size: 125%;
  color: rgb(66 70 77);
  margin-top: 20px;
  margin-bottom: 10%;
  font-weight: regular;
  line-height: 1.125rem;

  &:hover {
    color: rgb(164 167 173);
    transition: 200ms ease-in;
  }
`;
const CardPrice = styled.p`
  font-size: 200%;
  color: rgb(255 101 0);
  font-weight: 700;
  margin-bottom: 10%;
  font-weight: bold;

  &:hover {
    color: rgb(255 138 60);
    transition: 200ms ease-in;
  }
`;

function Card({
  productName,
  productPrice,
  productImage,
  productLink,
  productId,
}) {
  const productObject = {
    productId,
    productCount: 1,
    productName,
    productPrice,
    productImage,
    productLink,
  };

  let productCart = [];
  const updateProductCart = object => {
    productCart.push(object);
    localStorage.setItem('Cart', `${JSON.stringify(productCart)}`);
  };
  let getItem = localStorage.getItem('Cart');
  if (getItem.length !== 0) {
    productCart = JSON.parse(getItem);
  } else {
    updateProductCart(productObject);
    getItem = localStorage.getItem('Cart');
    productCart = JSON.parse(getItem);
  }

  const addToCart = () => {
    let Found = false;

    // eslint-disable-next-line no-use-before-define
    productCart.forEach(looping);

    function looping(value, index) {
      if (value.productId === productId) {
        const getItem2 = JSON.parse(localStorage.getItem('Cart'));
        getItem2[index][value] += 1;
        localStorage.setItem('Cart', `${JSON.stringify(getItem2)}`);
        console.log(getItem2[index][value]);
        Found = true;
      }
      if (!Found) {
        updateProductCart(productObject);
      }
    }
  };

  return (
    <CardModel>
      <CardInfo href={productLink}>
        <CardImage src={productImage} alt="" />
        <CardText>{productName}</CardText>
        <CardPrice>R${productPrice}</CardPrice>
      </CardInfo>
      <Button onClick={addToCart} appearance="primary" block>
        COMPRAR
      </Button>
    </CardModel>
  );
}

function CardsList({
  products,
  productName,
  productPrice,
  productImage,
  productLink,
  productId,
  productCart,
}) {
  return (
    <>
      {products.map(() => (
        <Card
          productName={productName}
          productImage={productImage}
          productPrice={productPrice}
          productLink={productLink}
          productId={productId}
          productCart={productCart}
        />
      ))}
    </>
  );
}

function Cards() {
  if (!localStorage.hasOwnProperty('Cart')) {
    localStorage.setItem('Cart', `${[]}`);
  }

  return (
    <CardBox>
      <CardContainer>
        <CardNavContainer>
          <Nav appearance="subtle">
            <Nav.Item active>Processadores</Nav.Item>
          </Nav>
        </CardNavContainer>
        <CardRow>
          <CardsList
            products={[1, 2]}
            productName="Ryzen"
            productImage="https://images8.kabum.com.br/produtos/fotos/181088/processador-amd-ryzen-5-5600g-3-9ghz-4-4ghz-max-turbo-am4-video-integrado-6-nucleos-100-100000252box_1627588230_m.jpg"
            productPrice={5}
            productLink="https://images8.kabum.com.br/produtos/fotos/181088/processador-amd-ryzen-5-5600g-3-9ghz-4-4ghz-max-turbo-am4-video-integrado-6-nucleos-100-100000252box_1627588230_m.jpg"
            productId={1}
          />
        </CardRow>

        <CardNavContainer>
          <Nav appearance="subtle">
            <Nav.Item active>Placas de Vídeo</Nav.Item>
          </Nav>
        </CardNavContainer>

        <CardRow>
          <CardsList
            products={[1, 2]}
            productName="Ryzen"
            productImage="https://images8.kabum.com.br/produtos/fotos/181088/processador-amd-ryzen-5-5600g-3-9ghz-4-4ghz-max-turbo-am4-video-integrado-6-nucleos-100-100000252box_1627588230_m.jpg"
            productPrice={5}
            productLink="https://images8.kabum.com.br/produtos/fotos/181088/processador-amd-ryzen-5-5600g-3-9ghz-4-4ghz-max-turbo-am4-video-integrado-6-nucleos-100-100000252box_1627588230_m.jpg"
            productId={2}
          />
        </CardRow>
        <CardNavContainer>
          <Nav appearance="subtle">
            <Nav.Item active>Memória RAM</Nav.Item>
          </Nav>
        </CardNavContainer>
        <CardRow>
          <CardsList
            id="tt"
            products={[1, 2]}
            productName="Ryzen"
            productImage="https://images8.kabum.com.br/produtos/fotos/181088/processador-amd-ryzen-5-5600g-3-9ghz-4-4ghz-max-turbo-am4-video-integrado-6-nucleos-100-100000252box_1627588230_m.jpg"
            productPrice={5}
            productLink="https://images8.kabum.com.br/produtos/fotos/181088/processador-amd-ryzen-5-5600g-3-9ghz-4-4ghz-max-turbo-am4-video-integrado-6-nucleos-100-100000252box_1627588230_m.jpg"
            productId={3}
          />
        </CardRow>
      </CardContainer>
    </CardBox>
  );
}

export default Cards;

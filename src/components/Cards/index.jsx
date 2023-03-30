/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable dot-notation */
/* eslint-disable no-inner-declarations */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { IconButton, Nav } from 'rsuite';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import { Link } from 'react-router-dom';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import { isEmpty } from 'lodash';

import {
  CategoriaItem,
  CategoriaNavContainer,
  CardPrice,
  CardText,
  CardImage,
  CardInfo,
  CardModel,
  CardRow,
  CardContainer,
  CardBox,
} from './styled';

import axios from '../../services/axios';

const Produtos = [];

// array de categorias (retorne para ele)
const CategoriaArray = [];

const getData = async () => {
  const response = await axios.get('produtos/');
  const { produtos } = response.data;

  produtos.forEach(obj => {
    if (
      CategoriaArray.map(cat => cat.NmCategoria).indexOf(
        obj.Categorium.nome
      ) === -1
    ) {
      CategoriaArray.push({ NmCategoria: obj.Categorium.nome });
    }
  });

  produtos.forEach(obj =>
    Produtos.push({
      cd_produto: obj.id,
      cd_categoria: obj.Categorium.nome,
      nm_nome: obj.nome,
      qt_quantidade: obj.quantidade,
      vl_valor: obj.valor,
      productImage: isEmpty(obj.Fotos)
        ? 'http://localhost:3000/images/no-photo.jpg'
        : obj.Fotos[0].url,
    })
  );
};

getData();

function Cards() {
  const [categoria, setCategoria] = useState('all');
  const updateCategoria = categoria => {
    setCategoria(categoria);
  };

  let status = false;

  if (categoria === 'all') {
    status = true;
  }

  function allCategoria() {
    updateCategoria('all');
  }

  if (!localStorage.hasOwnProperty('Cart')) {
    localStorage.setItem('Cart', `${[]}`);
  }

  return (
    <CardBox>
      <CardContainer>
        <CategoriaNavContainer>
          <CategoriaItem>
            <Nav appearance="subtle" onClick={allCategoria}>
              <Nav.Item active={status}>Todos os Produtos</Nav.Item>
            </Nav>
          </CategoriaItem>
          {CategoriaArray.map((value, index) => (
            <CategoriaNavItem
              key={index}
              updateCategoria={updateCategoria}
              NmCategoria={value['NmCategoria']}
              categoria={categoria}
            />
          ))}
        </CategoriaNavContainer>
        <CardRow>
          {status &&
            Produtos.map((value, index) => (
              <Card
                key={index}
                nm_nome={value['nm_nome']}
                productImage={value['productImage']}
                vl_valor={value['vl_valor']}
                productCount={value['productCount']}
                productLink={value['productLink']}
                cd_produto={value['cd_produto']}
                cd_categoria={value['cd_categoria']}
                qt_quantidade={value['qt_quantidade']}
              />
            ))}
          {Produtos.filter(obj => obj.cd_categoria === categoria).map(
            (value, index) => (
              <Card
                key={index}
                nm_nome={value['nm_nome']}
                productImage={value['productImage']}
                vl_valor={value['vl_valor']}
                productCount={value['productCount']}
                productLink={value['productLink']}
                cd_produto={value['cd_produto']}
                cd_categoria={value['cd_categoria']}
                qt_quantidade={value['qt_quantidade']}
              />
            )
          )}
        </CardRow>
      </CardContainer>
    </CardBox>
  );
}

function Card({
  nm_nome,
  vl_valor,
  productImage,
  productLink,
  cd_produto,
  cd_categoria,
  qt_quantidade,
}) {
  const productObject = {
    cd_produto,
    cd_categoria,
    nm_nome,
    qt_quantidade,
    vl_valor,
    productCount: 1,
    productImage,
    productLink,
  };
  let productCart = [];

  const updateProductCart = object => {
    productCart.push(object);
    localStorage.setItem('Cart', `${JSON.stringify(productCart)}`);
  };

  const addToCart = () => {
    let Found = false;
    const getItem = localStorage.getItem('Cart');

    if (getItem === null) {
      updateProductCart(productObject);
    } else if (getItem.length === 0) {
      updateProductCart(productObject);
    } else if (getItem.length !== 0) {
      productCart = JSON.parse(getItem);

      productCart.forEach(looping);
      function looping(value, index) {
        if (value.cd_produto === cd_produto) {
          productCart[index].productCount += 1;
          localStorage.setItem('Cart', `${JSON.stringify(productCart)}`);
          Found = true;
        }
      }
      if (!Found) {
        updateProductCart(productObject);
      }
    }
  };

  return (
    <CardModel>
      <Link className="Link" to="/" style={{ textDecoration: 'none' }}>
        <CardInfo>
          <CardImage src={productImage} alt="" />
          <CardText>{nm_nome}</CardText>
          <CardPrice style={{ color: '#7c7c7c' }}>R$ {vl_valor}</CardPrice>
        </CardInfo>
      </Link>

      {qt_quantidade > 0 && (
        <IconButton
          onClick={addToCart}
          size="lg"
          icon={<PlusRoundIcon />}
          placement="right"
          appearance="primary"
          color="blue"
          block
          style={{ marginTop: 'auto' }}
        >
          COMPRAR
        </IconButton>
      )}
      {qt_quantidade <= 0 && (
        <IconButton
          size="lg"
          icon={<WarningRoundIcon />}
          placement="left"
          appearance="primary"
          color="red"
          block
          style={{ marginTop: 'auto' }}
        >
          INDISPONÍVEL
        </IconButton>
      )}
    </CardModel>
  );
}

function CategoriaNavItem({ updateCategoria, NmCategoria, categoria }) {
  let status = false;

  if (categoria === NmCategoria) {
    status = true;
  }

  function changeCategoria() {
    updateCategoria(NmCategoria);
  }

  return (
    <CategoriaItem>
      <Nav appearance="subtle" onClick={changeCategoria}>
        <Nav.Item active={status}>{NmCategoria}</Nav.Item>
      </Nav>
    </CategoriaItem>
  );
}

export default Cards;

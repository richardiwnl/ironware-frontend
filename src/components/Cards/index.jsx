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

    if (getItem == null) {
      updateProductCart(productObject);
    } else if (getItem.length === 0) {
      updateProductCart(productObject);
    } else if (getItem.length !== 0) {
      productCart = JSON.parse(getItem);

      productCart.forEach(looping);
      function looping(value, index) {
        if (value['cd_produto'] === cd_produto) {
          productCart[index]['productCount'] += 1;
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
      <Link style={{ textDecoration: 'none' }} className="Link" to="/">
        <CardInfo>
          <CardImage src={productImage} alt="" />
          <CardText>{nm_nome}</CardText>
          <CardPrice style={{ color: '#55555578' }}>R$ {vl_valor}</CardPrice>
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

function CardsList({ categoria }) {
  return (
    <>
      {Produtos.map(value => {
        if (value['cd_categoria'] === categoria) {
          return (
            <Card
              key={value.cd_produto}
              nm_nome={value['nm_nome']}
              productImage={value['productImage']}
              vl_valor={value['vl_valor']}
              productCount={value['productCount']}
              productLink={value['productLink']}
              cd_produto={value['cd_produto']}
              cd_categoria={value['cd_categoria']}
              qt_quantidade={value['qt_quantidade']}
            />
          );
          // eslint-disable-next-line no-else-return
        } else if (categoria === 'all') {
          return (
            <Card
              key={value.cd_produto}
              nm_nome={value['nm_nome']}
              productImage={value['productImage']}
              vl_valor={value['vl_valor']}
              productCount={value['productCount']}
              productLink={value['productLink']}
              cd_produto={value['cd_produto']}
              cd_categoria={value['cd_categoria']}
              qt_quantidade={value['qt_quantidade']}
            />
          );
        }
      })}
    </>
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

function CategoriaNavbar({ updateCategoria, categoria }) {
  let status = false;

  if (categoria === 'all') {
    status = true;
  }

  function allCategoria() {
    updateCategoria('all');
  }

  return (
    <CategoriaNavContainer>
      <CategoriaItem>
        <Nav appearance="subtle" onClick={allCategoria}>
          <Nav.Item active={status}>Todos os Produtos</Nav.Item>
        </Nav>
      </CategoriaItem>

      {CategoriaArray.map((value, index) => (
        <CategoriaNavItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          updateCategoria={updateCategoria}
          NmCategoria={value['NmCategoria']}
          categoria={categoria}
        />
      ))}
    </CategoriaNavContainer>
  );
}

function Cards() {
  const [categoria, setCategoria] = useState('all');
  const updateCategoria = categoria => {
    setCategoria(categoria);
  };

  if (!localStorage.hasOwnProperty('Cart')) {
    localStorage.setItem('Cart', `${[]}`);
  }

  let productCart = [];
  const getItem = localStorage.getItem('Cart');
  if (getItem != null && getItem.length !== 0) {
    productCart = JSON.parse(getItem);
    function looping(value, index) {
      if (value === 'null') {
        productCart.splice(index, 1);
        localStorage.setItem('Cart', `${JSON.stringify(productCart)}`);
      }
    }
    productCart.forEach(looping);
    if (productCart.length === 0) {
      localStorage.setItem('Cart', `${[]}`);
    }
  }

  return (
    <CardBox>
      <CardContainer>
        <div>
          <CategoriaNavbar
            updateCategoria={updateCategoria}
            categoria={categoria}
          />
        </div>
        <CardRow>
          <CardsList categoria={categoria} />
        </CardRow>
      </CardContainer>
    </CardBox>
  );
}

export default Cards;

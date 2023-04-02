/* eslint-disable no-prototype-builtins */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import 'rsuite/dist/rsuite.min.css';
import TrashIcon from '@rsuite/icons/Trash';
import { IconButton, Loader } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { Link } from 'react-router-dom';
import {
  CartPricesTotal,
  CartPricesFrete,
  CartPricesSubtotal,
  CartPrices,
  CartProductPrice,
  CartProductCount,
  CartProductName,
  CartImage,
  CartProductModel,
  CartContainer,
  CartSection,
  CartList,
  EmptyCartContainer,
  TbCartPrices,
  TbCartResult,
  CartTitle,
} from './styled';
import emptyimage from './empty_cart.png';

// funcao para completar a compra
function insertCompra(compra) {
  // func para inserir a compra no DB: (falta fazer)

  // Pega a nova quantidade:
  const produtosToReduce = [];
  function reduce(value) {
    produtosToReduce.push({
      cd_produto: value.cd_produto,
      qt_quantidade: value.qt_quantidade - value.productCount,
    });
  }
  compra.forEach(reduce);
}

function CartProduct({
  productImage,
  nm_nome,
  vl_valor,
  productCount,
  productLink,
  updateSubtotal,
  cd_produto,
  cd_categoria,
}) {
  const [count, setCount] = useState(productCount);
  const [productValue, setValue] = useState(vl_valor * count);
  const [isVisible, setIsVisible] = useState(true);

  let productCart = [];

  const adicionar = () => {
    setCount(count + 1);
    setValue(productValue + vl_valor);
    updateSubtotal(vl_valor);

    productCart = JSON.parse(localStorage.getItem('Cart'));

    function looping(value, index) {
      if (value.cd_produto === cd_produto) {
        productCart[index].productCount += 1;
        localStorage.setItem('Cart', `${JSON.stringify(productCart)}`);
      }
    }
    productCart.forEach(looping);
  };
  function looping(value, index) {
    if (value.cd_produto === cd_produto) {
      productCart[index].productCount -= 1;
      localStorage.setItem('Cart', `${JSON.stringify(productCart)}`);
    }
  }
  const remover = () => {
    if (productValue > vl_valor && count > 0) {
      setCount(count - 1);
      setValue(productValue - vl_valor);
      updateSubtotal(-vl_valor);

      productCart = JSON.parse(localStorage.getItem('Cart'));

      productCart.forEach(looping);
    }
  };
  const deleteProduct = () => {
    const productCart = JSON.parse(localStorage.getItem('Cart'));

    function looping(value, index, array) {
      if (value.cd_produto === cd_produto) {
        if (index === 0 && array.length === 1) {
          updateSubtotal(-productValue);
          localStorage.setItem('Cart', []);
        } else {
          productCart.splice(index, 1);
          localStorage.setItem('Cart', `${JSON.stringify(productCart)}`);
          updateSubtotal(-productValue);
        }
      }
    }
    productCart.forEach(looping);

    setIsVisible(false);
  };
  if (isVisible) {
    return (
      <CartProductModel>
        <td style={{ width: '250px' }}>
          <CartImage src={productImage} alt={nm_nome} />
        </td>
        <td>
          <CartProductName href={productLink}>{nm_nome}</CartProductName>
          <p>Categoria: {cd_categoria}</p>
        </td>
        <td style={{ width: '10px' }}>
          <IconButton
            style={{ width: '35px', margin: 0, padding: 0 }}
            size="xs"
            onClick={adicionar}
            icon={<PlusIcon color="black" />}
            appearance="link"
          />
        </td>
        <td style={{ width: '30px' }}>
          <CartProductCount>{count}</CartProductCount>
        </td>
        <td style={{ width: '10px' }}>
          <IconButton
            style={{ width: '35px', margin: 0, padding: 0 }}
            size="xs"
            onClick={remover}
            icon={<MinusIcon color="black" />}
            appearance="link"
          />
        </td>
        <td style={{ width: '10px' }}>
          <IconButton
            style={{ width: '35px', margin: 0, padding: 0 }}
            size="xs"
            onClick={deleteProduct}
            icon={<TrashIcon color="#F44336" />}
            appearance="link"
          />
        </td>
        <td>
          <CartProductPrice>R${vl_valor}</CartProductPrice>
        </td>
        <td>
          <CartProductPrice>R${productValue}</CartProductPrice>
        </td>
      </CartProductModel>
    );
  }
}

function EmptyCart() {
  return (
    <EmptyCartContainer>
      <p>Carrinho Vazio</p>
      <img
        src={emptyimage}
        alt="carrinho vazio"
        style={{ width: 'auto', height: 'auto' }}
      />
    </EmptyCartContainer>
  );
}

function Cart() {
  if (!localStorage.hasOwnProperty('Cart')) {
    localStorage.setItem('Cart', `${[]}`);
  }
  const getItem = localStorage.getItem('Cart');

  let vazio = false;
  if (getItem == null) {
    vazio = true;
  } else if (getItem.length === 0) {
    vazio = true;
  }

  const getFrete = () => {
    if (!vazio) {
      return 'calcular';
    }
    return null;
  };
  const getSubtotal = () => {
    let result = 0;
    let times = 0;

    if (!vazio) {
      const productCart = JSON.parse(getItem);

      const looping = value => {
        times = value.productCount * value.vl_valor;
        result += times;
      };
      productCart.forEach(looping);
    }

    return result;
  };
  const [subtotal, setSubtotal] = useState(getSubtotal);
  const updateSubtotal = modifySubtotal => {
    if (modifySubtotal === 'empty') {
      setSubtotal(0);
    } else if (subtotal < modifySubtotal) {
      setSubtotal(0);
    } else {
      setSubtotal(prevsubtotal => prevsubtotal + modifySubtotal);
    }
  };
  const getCart = () => {
    if (!vazio) {
      const productCart = JSON.parse(getItem);
      return productCart.map(value => (
        <CartProduct
          key={value.cd_produto}
          nm_nome={value.nm_nome}
          productImage={value.productImage}
          vl_valor={value.vl_valor}
          productCount={value.productCount}
          productLink={value.productLink}
          cd_produto={value.cd_produto}
          cd_categoria={value.cd_categoria}
          updateSubtotal={updateSubtotal}
        />
      ));
    }
    return null;
  };

  // eslint-disable-next-line no-unused-vars
  const [frete, setFrete] = useState(getFrete);
  const [Redirect, setRedirect] = useState(false);

  function updateRedirect() {
    setRedirect(true);
  }

  const EmptyCartFunc = () => {
    localStorage.setItem('Cart', []);
    updateSubtotal('empty');
  };

  const RedirectContent = (
    <>
      <p style={{ zIndex: 6 }}>Redirecionando para o pagamento...</p>
      <Link to="/" className="Link">
        <IconButton
          size="sm"
          icon={<ArrowLeftLineIcon />}
          style={{ zIndex: 8 }}
          onClick={EmptyCartFunc}
          appearance="primary"
        >
          Voltar ao site
        </IconButton>
      </Link>
    </>
  );

  // eslint-disable-next-line no-unused-vars
  const [productCart, setProductCart] = useState(getCart);

  const checkout = () => {
    const compra = JSON.parse(localStorage.getItem('Cart'));
    updateRedirect();
    insertCompra(compra);
  };

  return (
    <>
      {Redirect && (
        <Loader
          style={{ zIndex: 6, width: '100%', height: '100%' }}
          size="lg"
          content={RedirectContent}
          inverse
          backdrop
          center
        />
      )}

      <CartSection>
        {!vazio && (
          <CartContainer>
            <CartList>
              <CartTitle>Carrinho</CartTitle>
              <TbCartPrices>
                <tr>
                  <th>Imagem</th>
                  <th>Descrição</th>
                  <th colSpan={4}>Quantidade</th>
                  <th>Preço</th>
                  <th>Subtotal</th>
                </tr>
                {productCart}
              </TbCartPrices>
            </CartList>
            <CartPrices>
              <TbCartResult>
                <CartPricesSubtotal>
                  <td>Subtotal:</td>
                  <td>
                    <p style={{ fontWeight: 700 }}>R${subtotal}</p>
                  </td>
                </CartPricesSubtotal>
                <CartPricesFrete>
                  <td>Frete:</td>
                  <td>
                    <p style={{ fontWeight: 700 }}>{frete}</p>
                  </td>
                </CartPricesFrete>
              </TbCartResult>

              <CartPricesTotal>
                <td>TOTAL:</td>
                <td>
                  <p>R${subtotal}</p>
                </td>
              </CartPricesTotal>
              <IconButton
                onClick={checkout}
                size="lg"
                icon={<ArrowRightLineIcon />}
                placement="right"
                appearance="primary"
                color="blue"
                block
              >
                FECHAR PEDIDO
              </IconButton>
              <IconButton
                size="sm"
                color="red"
                icon={<TrashIcon color="white" />}
                onClick={EmptyCartFunc}
                appearance="primary"
                block
                placement="right"
              >
                LIMPAR CARRINHO
              </IconButton>
            </CartPrices>
          </CartContainer>
        )}
        {vazio && <EmptyCart />}
      </CartSection>
    </>
  );
}

export default Cart;

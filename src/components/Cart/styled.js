import styled from 'styled-components';

const EmptyCartContainer = styled.div`
  font-size: 2em;
  text-align: center;
  max-width: 70%;
  max-height: 70%;
`;

const CartSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CartContainer = styled.div`
  width: auto;
  height: auto;
  margin: 2.5% 5% 0 5%;
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0;
`;

const CartProductModel = styled.tr`
  border-bottom: 1px solid #ddd;
  padding: 0;
`;
const CartImage = styled.img`
  height: auto;
  max-width: 25%;
  min-width: 100px;
`;
const CartProductName = styled.a`
  font-size: 1em;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: none;
    color: #939393;
    cursor: pointer;
    transition: 200ms ease-in;
  }
`;
const CartProductCount = styled.p`
  font-size: 1em;
  font-weight: 700;
  background: #f3f3f3;
  border-radius: 4px;
`;
const CartProductPrice = styled.div`
  font-size: 1.5em;
  font-weight: 700;

  &:hover {
    color: #939393;
    transition: 200ms ease-in;
  }
`;

const CartPrices = styled.div`
  border: none;
  background-color: white;
  border-radius: 6px;
  padding: 10px;
  margin-top: 20px;
  width: 45%;
  float: right;
`;
const CartPricesSubtotal = styled.tr`
  font-size: 1.3em;
`;
const CartPricesFrete = styled.tr`
  font-size: 1.3em;
`;
const CartPricesTotal = styled.div`
  font-size: 1.7em;
  margin: 20px 10px 10px 0px;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: #e5f5e5;
  font-weight: 700;
  border-radius: 4px;
`;

const TbCartPrices = styled.table`
  border-top: 1px solid;
  border-bottom: 1px solid;
  text-align: center;
  border-collapse: separate;
  border-spacing: 5px 20px;
  margin-top: 15px;
  padding: 0 5% 0 5%;
  vertical-align: top;
`;
const TbCartResult = styled.table`
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
  border-collapse: separate;
  border-spacing: 10px;
`;
const CartTitle = styled.p`
  font-size: 3em;
`;
export {
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
};

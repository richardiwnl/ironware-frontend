import styled from 'styled-components';

const CategoriaNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #f7f7fa;
`;

const CategoriaItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #f7f7fa;
`;

const CardBox = styled.div`
  padding: 0% 5%;
  background: white;
  bottom: 0;
  width: 100%;
  margin-top: 0;

  @media (max-width: 1000px) {
    padding: 0px 30px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const CardRow = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 0.5fr));
  grid-gap: 1%;
  align-items: center;
  justify-content: center;
  margin: 5%;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 0.5fr));
  }
`;

const CardModel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
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
    transition: 200ms ease-in;
    border: 0.1px solid rgb(209 209 209);
  }
`;

const CardInfo = styled.div`
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

export {
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
};

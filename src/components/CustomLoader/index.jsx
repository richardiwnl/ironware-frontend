/* eslint-disable react/prop-types */
import React from 'react';
import { Loader } from 'rsuite';
import propTypes from 'prop-types';

import { LoaderContainer } from './styled';

export default function CustomLoader({ isLoading }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isLoading) return <></>;
  return (
    <LoaderContainer>
      <div />
      <Loader
        backdrop
        content="Carregando..."
        size="lg"
        unselectable="off"
        vertical
      />
    </LoaderContainer>
  );
}

CustomLoader.defaultProps = {
  isLoading: false,
};

CustomLoader.propTypes = {
  isLoading: propTypes.bool,
};

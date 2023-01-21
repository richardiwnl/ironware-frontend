import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { CustomProvider } from 'rsuite';

export default function ThemeProvider({ children }) {
  const theme = useSelector(state => state.theme.theme);

  return <CustomProvider theme={theme}>{children}</CustomProvider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.object,
};

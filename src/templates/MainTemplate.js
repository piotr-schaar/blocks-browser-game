import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Container } from 'components/Layout';
import theme from 'utils/theme';
import GlobalStyles from 'utils/global';

import PropTypes from 'prop-types';

const MainTemplate = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Container>{children}</Container>
  </ThemeProvider>
);

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;

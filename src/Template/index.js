import { ThemeProvider } from 'styled-components';
import { Container } from '../components/Layout';
import theme from '../utils/theme';
import GlobalStyles from '../utils/global';

const Template = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Container>{children}</Container>
  </ThemeProvider>
);

export default Template;
